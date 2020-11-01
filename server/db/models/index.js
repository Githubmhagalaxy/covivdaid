const Users = require('./Users');
const Statistics = require('./Statistics');
const FoodCamps = require('./FoodCamps');
const FoodCampWebsites = require('./FoodCampWebsites');
const Hospitals = require('./Hospitals');

Users.hasMany(Statistics, {
    as: 'statistics',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});
Statistics.belongsTo(Users);

Users.hasMany(FoodCamps, {
    as: 'food_camps',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});
FoodCamps.belongsTo(Users);

Users.hasMany(Hospitals, {
    as: 'hospitals',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});
Hospitals.belongsTo(Users);

FoodCamps.hasMany(FoodCampWebsites, {
    as: 'websites',
    foreignKey: {
        name: 'food_camp_id',
        allowNull: false
    }
});
FoodCampWebsites.belongsTo(FoodCamps);


module.exports = {
    Users,
    Statistics,
    FoodCamps,
    FoodCampWebsites,
    Hospitals
}