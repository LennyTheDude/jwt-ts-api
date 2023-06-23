import { Dialect, Options, Sequelize } from 'sequelize';
import config from './SequelizeConfig';
const vars = config.development;

class SequelizeConnection {
    private static instance: Sequelize;

    static getInstance(): Sequelize {
        if (!SequelizeConnection.instance) {
            const dbConfig = {} as Options;
            dbConfig.host = vars.host;
            dbConfig.database = vars.database;
            dbConfig.username = vars.username;
            dbConfig.password = vars.password;
            dbConfig.dialect = vars.dialect as Dialect;
            SequelizeConnection.instance = new Sequelize(dbConfig);
        }

        return SequelizeConnection.instance;
    }

    static async connect(): Promise<Sequelize> {
        const sequelize = SequelizeConnection.getInstance();
        try {
            await sequelize.authenticate();
            console.log('Database connection authenticated successfully');
            return sequelize;
        } catch (e: unknown) {
            console.log('Error while creation connection to database : ' + e);
            return sequelize;
        }
    }

    static async close(): Promise<Sequelize> {
        const sequelize = SequelizeConnection.getInstance();
        try {
            await sequelize.close();
            console.log('Database connection closed successfully');
            return sequelize;
        } catch (e: unknown) {
            console.log('Error while closing database connection : ' + e);
            return sequelize;
        }
    }
}

export default SequelizeConnection;
