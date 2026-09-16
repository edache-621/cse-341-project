const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// ==================== USER FUNCTIONS ====================

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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
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

// ==================== CONTACT FUNCTIONS ====================

const getAllContacts = async (req, res) => {
    //#swagger.tags=['Contact']

    try {
        const result = await mongodb
            .getDatabase()
            .collection('contacts')
            .find()
            .toArray();

        res.status(200).json(result);
    } catch (err) {
        console.error('Error getting all contacts:', err);

        res.status(500).json({
            error: 'Failed to get contacts'
        });
    }
};

const getSingleContact = async (req, res) => {
    //#swagger.tags=['Contact']

    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid contact ID'
            });
        }

        const contactId = new ObjectId(req.params.id);

        const contact = await mongodb
            .getDatabase()
            .collection('contacts')
            .findOne({ _id: contactId });

        if (!contact) {
            return res.status(404).json({
                error: 'Contact not found'
            });
        }

        res.status(200).json(contact);
    } catch (err) {
        console.error('Error getting contact:', err);

        res.status(500).json({
            error: 'Failed to get contact'
        });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contact']

    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                error:
                    'firstName, lastName, email, favoriteColor, and birthday are required'
            });
        }

        const contact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const response = await mongodb
            .getDatabase()
            .collection('contacts')
            .insertOne(contact);

        if (response.acknowledged) {
            return res.status(201).json({
                message: 'Contact created successfully',
                contactId: response.insertedId
            });
        }

        return res.status(500).json({
            error: 'Some error occurred while creating contact'
        });
    } catch (err) {
        console.error('Error creating contact:', err);

        res.status(500).json({
            error: 'Failed to create contact'
        });
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contact']

    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid contact ID'
            });
        }

        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                error:
                    'firstName, lastName, email, favoriteColor, and birthday are required'
            });
        }

        const contactId = new ObjectId(req.params.id);

        const contact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const response = await mongodb
            .getDatabase()
            .collection('contacts')
            .replaceOne(
                { _id: contactId },
                contact
            );

        if (response.matchedCount === 0) {
            return res.status(404).json({
                error: 'Contact not found'
            });
        }

        return res.status(204).send();
    } catch (err) {
        console.error('Error updating contact:', err);

        res.status(500).json({
            error: 'Failed to update contact'
        });
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contact']

    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid contact ID'
            });
        }

        const contactId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .collection('contacts')
            .deleteOne({
                _id: contactId
            });

        if (response.deletedCount === 0) {
            return res.status(404).json({
                error: 'Contact not found'
            });
        }

        return res.status(204).send();
    } catch (err) {
        console.error('Error deleting contact:', err);

        res.status(500).json({
            error: 'Failed to delete contact'
        });
    }
};

module.exports = {
    // Week 1 User functions
    getAll,
    getsingle,
    createuser,
    updateuser,
    deleteuser,

    // Week 2 Contact functions
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};