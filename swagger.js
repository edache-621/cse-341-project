const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 User and Contacts API',
        description:
            'A RESTful API for managing users and contacts. The API supports creating, retrieving, updating, and deleting users and contacts.',
        version: '1.0.0'
    },

    host: 'localhost:5000',

    schemes: ['http'],

    tags: [
        {
            name: 'User',
            description: 'Operations for managing users'
        },
        {
            name: 'Contact',
            description: 'Operations for managing contacts'
        }
    ],

    definitions: {
        User: {
            type: 'object',
            properties: {
                firstName: {
                    type: 'string',
                    example: 'John'
                },
                lastName: {
                    type: 'string',
                    example: 'Doe'
                },
                email: {
                    type: 'string',
                    example: 'john.doe@example.com'
                },
                favoriteColor: {
                    type: 'string',
                    example: 'Blue'
                },
                birthday: {
                    type: 'string',
                    example: '1995-01-15'
                }
            }
        },

        Contact: {
            type: 'object',
            required: [
                'firstName',
                'lastName',
                'email',
                'favoriteColor',
                'birthday'
            ],
            properties: {
                firstName: {
                    type: 'string',
                    example: 'John'
                },
                lastName: {
                    type: 'string',
                    example: 'Doe'
                },
                email: {
                    type: 'string',
                    example: 'john.doe@example.com'
                },
                favoriteColor: {
                    type: 'string',
                    example: 'Blue'
                },
                birthday: {
                    type: 'string',
                    example: '1995-01-15'
                }
            }
        }
    }
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);