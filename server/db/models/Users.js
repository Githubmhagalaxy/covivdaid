const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');

const Statistics = require('./Statistics');
const FoodCamps = require('./FoodCamps');
const Hospitals = require('./Hospitals');

class Users extends Model {
    async isCorrectPassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

Users.init({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
    }
});

module.exports = Users;