const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/connection');

// const Band = require('./Band');

class Statistics extends Model {}

Statistics.init({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CountryCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Slug: {
        type: DataTypes.STRING,
        allowNull: true
    },
    NewConfirmed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TotalConfirmed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    NewDeaths: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TotalDeaths: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    NewRecovered: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TotalRecovered: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.NOW
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'statistics'
});

module.exports = Statistics;