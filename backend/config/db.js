const mongoose = require("mongoose");

exports.connectionToDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`Connected to : ${conn.connection.host} `);
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
};

// module.exports = connectionToDB;
