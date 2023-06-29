import { Model, Sequelize, DataTypes } from 'sequelize';
import { IToken as TokenAttributes } from '../interfaces/sequelize';

class TokenModel extends Model implements TokenAttributes {
    public userId!: number;
    public refreshToken!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public static associations: {};

    static initModel(sequelize: Sequelize): void {
        TokenModel.init(
            {
                userId: {
                    type: DataTypes.STRING
                },
                refreshToken: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize, // pass the database instance here
                underscored: false, // this flag will make table name casing to underscored (eg. user_details)
                tableName: 'Tokens' // here names can be pass in camel case for consistency
            }
        );
    }

    // public static associateModel(): void {}
}

export default TokenModel;
