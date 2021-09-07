import mongoose from 'mongoose'
import config from './config'

(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .catch(err => console.log(err));
        console.log('Database is connected');    
    } catch (error) {
        console.error(error);
    }
})();