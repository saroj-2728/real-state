
require('dotenv').config();
const { Sequelize } = require("sequelize");

// Get environment variables from .env file
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

const sequelize = new Sequelize(DATABASE_URL, {logging: false});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful............................')

        // Sync the models with the database
        await sequelize.sync({ alter: true }); 
        console.log('✅ Database synced');
    }
    catch (error) {
        console.error('Unable to connect to the database...............', error)

    }
}
testConnection()

module.exports = sequelize;