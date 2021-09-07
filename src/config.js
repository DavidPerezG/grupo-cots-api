import { config } from 'dotenv';
config();

export default {
    mongodbURL: process.env.MONGODB_URL || 'mongodb://localhost/tasksdb',
    SECRET: "user-account"
}


   
