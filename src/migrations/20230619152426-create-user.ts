'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes, QueryTypes } from 'sequelize';

module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
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
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable('Users');
    }
};
