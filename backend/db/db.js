const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGOBASE_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('DB connected successfully');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
    }
}

module.exports = { db };
