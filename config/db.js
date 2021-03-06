const mongoose = require('mongoose');

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = connect;
