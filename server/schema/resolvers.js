const {AuthenticationError} = require('apollo-server-express')
const {Users, Statistics, Hospitals, FoodCamps, FoodCampWebsites} = require('../db/models');
const {signToken} = require('../utils/auth');

module.exports = {
    Query: {
        me: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findAll({
                        where: {
                            _id: context.user._id
                        },
                        include: [
                            {model: Statistics, as: 'statistics', raw: true, nest: true},
                            {model: FoodCamps, as: 'food_camps', raw: true, nest: true},
                            {model: Hospitals, as: 'hospitals', raw: true, nest: true}
                        ]
                    });
                    if(user) {
                        console.log(user.map(u => u.toJSON())[0])
                        return user.map(u => u.toJSON())[0]
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        savedStatistics: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findAll({
                        where: {
                            _id: context.user._id
                        },
                        include: [
                            {model: Statistics, as: 'statistics', raw: true, nest: true}
                        ]
                    });
                    if(user) {
                        const tmp = user.map(u => u.toJSON());
                        return tmp[0].statistics
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        savedFoodCamps: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findAll({
                        where: {
                            _id: context.user._id
                        },
                        include: [
                            {
                                model: FoodCamps,
                                as: 'food_camps',
                                include: [
                                    {model: FoodCampWebsites, as: 'website', raw: true, nest: true}
                                ],
                                raw: true,
                                nest: true
                            }
                        ]
                    });
                    if(user) {
                        console.log(user.food_camps);
                        const tmp = user.map(u => u.toJSON());
                        return tmp[0].food_camps
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        savedHospitals: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findAll({
                        where: {
                            _id: context.user._id
                        },
                        include: [
                            {model: Hospitals, as: 'hospitals', raw: true, nest: true}
                        ]
                    });
                    if(user) {
                        const tmp = user.map(u => u.toJSON());
                        return tmp[0].hospitals
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        }
    },
    Mutation: {
        signup: async (parent, args, context, info) => {
            try {
                const {email, password, name} = args;
                if(context.user) {
                    throw new Error(`you are already logged in`);
                } else {
                    const user = await Users.create({
                        email,
                        password,
                        name
                    });
                    if(user) {
                        const tmpUsr = user.toJSON();
                        return {
                            tmpUsr,
                            token: signToken({
                                _id: tmpUsr._id,
                                email: tmpUsr.email
                            })
                        }
                    }
                }
            } catch (e) {
                throw new AuthenticationError(`Could not add the user, Error with message: ${e.message}`);
            }
        },
        login: async (parent, args, context, info) => {
            try {
                const {email, password} = args;
                if(context.user) {
                    throw new Error(`you are already logged in`);
                } else {
                    const user = await Users.findOne({
                        where: { email }
                    });
                    if(!user) {
                        throw new Error('could not find any user with that email')
                    }
                    if(!(await user.isCorrectPassword(password))) {
                        throw new Error('Oops! wrong password');
                    }
                    const tmpUsr = user.toJSON();
                    return {
                        tmpUsr,
                        token: signToken({
                            _id: tmpUsr._id,
                            email: tmpUsr.email
                        })
                    }
                }
            } catch (e) {
                throw new AuthenticationError(`Could not log in, Error with message: ${e.message}`);
            }
        },
        saveStatistic: async (parent, args, context, info) => {
            try {
                const {statistic} = args;
                if(context.user) {
                    // const user = await Users.findOne(
                    //     {_id: context.user._id},
                    // );
                    // user.statistics.push(statistic);
                    // return await user.save()
                    const stat = await Statistics.create({
                        ...statistic,
                        user_id: context.user._id
                    });
                    if(stat) {
                        const user = await Users.findAll({
                            where: {
                                _id: context.user._id
                            },
                            include: [
                                {model: Statistics, as: 'statistics', raw: true, nest: true}
                            ]
                        });
                        if(user) {
                            return user
                        }
                    }
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveFoodCamp: async (parent, args, context, info) => {
            try {
                const {foodCamp} = args;
                const {website} = foodCamp;
                if(context.user) {
                    // const user =  await Users.findOne(
                    //     {_id: context.user._id},
                    // );
                    // user.food_camps.push(foodCamp);
                    // return await user.save()
                    // console.log('foodcamp', foodCamp);
                    // console.log(context.user);
                    const foodcamp = await FoodCamps.create({
                        ...foodCamp,
                        user_id: context.user._id.toString()
                    });
                    const {_id} = foodcamp.toJSON();
                    const webs = await FoodCampWebsites.create({
                        ...website,
                        food_camp_id: _id
                    })
                    const user = await Users.findAll({
                        where: {
                            _id: context.user._id
                        },
                        include: [
                            {model: FoodCamps, as: 'food_camps', include: [{model: FoodCampWebsites, as: "websites"}], raw: true, nest: true}
                        ]
                    });
                    if(user) {
                        return user
                    }
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveHospital: async (parent, args, context, info) => {
            try {
                const {hospital} = args;
                if(context.user) {
                    // const user =  await Users.findOne(
                    //     {_id: context.user._id}
                    // );
                    // user.hospitals.push(hospital);
                    // return await user.save()
                    const dbHospital = await Hospitals.create({
                        ...hospital,
                        user_id: context.user._id
                    });
                    const user = await Users.findAll({
                        where: {
                            _id: context.user._id
                        },
                        include: [
                            {model: Hospitals, as: 'hospitals', raw: true, nest: true}
                        ]
                    });
                    if(user) {
                        return user
                    }
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
    }
}