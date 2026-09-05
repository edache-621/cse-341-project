const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .collection('users')
            .find()
            .toArray();

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to get users'
        });
    }
};

const getsingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const user = await mongodb
            .getDatabase()
            .collection('users')
            .findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to get user'
        });
    }
};

module.exports = {
    getAll,
    getsingle
};