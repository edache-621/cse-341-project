 const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags=['User']
    try {
        const result = await mongodb
            .getDatabase()
            .collection('users')
            .find()
            .toArray();

        res.status(200).json(result);
    } catch (err) {
        console.error('Error getting all users:', err);

        res.status(500).json({
            error: 'Failed to get users'
        });
    }
};

const getsingle = async (req, res) => {
    //#swagger.tags=['User']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user ID'
            });
        }

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
        console.error('Error getting user:', err);

        res.status(500).json({
            error: 'Failed to get user'
        });
    }
};

const createuser = async (req, res) => {
    //#swagger.tags=['User']    
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name
        };

        const response = await mongodb
            .getDatabase()
            .collection('users')
            .insertOne(user);

        if (response.acknowledged) {
            return res.status(201).json({
                message: 'User created successfully',
                userId: response.insertedId
            });
        }

        return res.status(500).json({
            error: 'Some error occurred while creating user'
        });
    } catch (err) {
        console.error('Error creating user:', err);

        res.status(500).json({
            error: 'Failed to create user'
        });
    }
};

const updateuser = async (req, res) => {
    //#swagger.tags=['User']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user ID'
            });
        }

        const userId = new ObjectId(req.params.id);

        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name
        };

        const response = await mongodb
            .getDatabase()
            .collection('users')
            .replaceOne(
                { _id: userId },
                user
            );

        if (response.matchedCount === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        return res.status(204).send();
    } catch (err) {
        console.error('Error updating user:', err);

        res.status(500).json({
            error: 'Failed to update user'
        });
    }
};

const deleteuser = async (req, res) => {
    //#swagger.tags=['User']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user ID'
            });
        }

        const userId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .collection('users')
            .deleteOne({
                _id: userId
            });

        if (response.deletedCount === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        return res.status(204).send();
    } catch (err) {
        console.error('Error deleting user:', err);

        res.status(500).json({
            error: 'Failed to delete user'
        });
    }
};

module.exports = {
    getAll,
    getsingle,
    createuser,
    updateuser,
    deleteuser
};