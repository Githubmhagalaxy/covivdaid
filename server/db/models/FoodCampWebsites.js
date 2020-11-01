const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/connection');

// const Band = require('./Band');

class FoodCampWebsites extends Model {}

FoodCampWebsites.init({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'food_camp_websites'
});

module.exports = FoodCampWebsites;