const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/connection');

// const FoodCampWebsites = require('./FoodCampWebsites');

class Hospitals extends Model {}

Hospitals.init({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    Zip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    City: {
        type: DataTypes.STRING,
        allowNull: true
    },
    State: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    naics_desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    helipad: {
        type: DataTypes.STRING,
        allowNull: true
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    county: {
        type: DataTypes.STRING,
        allowNull: true
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'hospitals'
});

module.exports = Hospitals;