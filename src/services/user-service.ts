// const UserModel = require('../models/user-model');
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { mailService, tokenService } from './index';
import UserDto from '../dtos/user-dto';
import AuthError from '../errors/auth-error';
import Models from '../models/index';
const User = Models.UserModel;

class UserService {
    async signup(email: string, password: string) {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            throw AuthError.BadRequest('User with this email address already exists.');
        }
        const hashPwd = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({ email, password: hashPwd, activationLink });
        mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ where: { activationLink } });
        if (!user) {
            throw AuthError.BadRequest('Incorrect activation link');
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string) {
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser) {
            throw AuthError.BadRequest('User not found');
        }

        const correctPwd = await bcrypt.compare(password, existingUser.password);

        if (!correctPwd) {
            throw AuthError.BadRequest('Incorrect password');
        }

        const userDto = new UserDto(existingUser);

        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(existingUser.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw AuthError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const existingToken = await tokenService.findToken(refreshToken);

        if (!userData || !existingToken) {
            throw AuthError.UnauthorizedError();
        }

        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

export default UserService;
