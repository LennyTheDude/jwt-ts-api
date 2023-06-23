import { HasManyGetAssociationsMixin, Model, Sequelize, Association, DataTypes } from 'sequelize';
import { IUser as UserAttributes } from '../interfaces/sequelize';

class UserModel extends Model implements UserAttributes {
    public id!: string;
    public isActivated!: boolean;
    public email!: string;
    public password!: string;
    public activationLink!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: {};

    static initModel(sequelize: Sequelize): void {
        UserModel.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    autoIncrement: true
                },
                isActivated: {
                    type: DataTypes.BOOLEAN
                },
                email: {
                    type: DataTypes.STRING
                },
                password: {
                    type: DataTypes.STRING
                },
                activationLink: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize, // pass the database instance here
                underscored: false, // this flag will make table name casing to underscored (eg. user_details)
                tableName: 'Users' // here names can be pass in camel case for consistency
            }
        );
    }

    public static associateModel(): void {}
}

export default UserModel;
