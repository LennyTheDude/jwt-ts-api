import SequelizeConnection from '../config/SequelizeConnection';
import TokenModel from './token';
import UserModel from './user';

const sequelize = SequelizeConnection.getInstance();

// init models
TokenModel.initModel(sequelize);
UserModel.initModel(sequelize);

// associate models
TokenModel.associateModel();
UserModel.associateModel();

export default {
    sequelize,
    TokenModel,
    UserModel
};
