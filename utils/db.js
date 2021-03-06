const mongoose = require('mongoose');
const database = process.env.MONGO_URI;
// const port = process.env.db_port || 27018;
// const databaseLocal = `mongodb://${process.env.db_service_name}:${port}/${process.env.db_name}`;

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
});

mongoose.connection.on('connected', () => {
    console.log(`${database}: Connected...`);
});
