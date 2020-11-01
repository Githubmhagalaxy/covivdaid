const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/connection');

const FoodCampWebsites = require('./FoodCampWebsites');

class FoodCamps extends Model {}

FoodCamps.init({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    food_resource_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    agency: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    operational_status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    operational_notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    current_process_for: {
        type: DataTypes.STRING,
        allowNull: true
    },
    who_they_serve: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
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
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // food_camp_websites_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: FoodCampWebsites,
    //         key: 'id'
    //     }
    // },
    days_hours: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date_updated: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.NOW
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'food_camps'
});

module.exports = FoodCamps;