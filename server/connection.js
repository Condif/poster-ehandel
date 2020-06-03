const mongoose = require("mongoose");
const { imageStorage } = require("./imageStorage")

mongoose.set("useCreateIndex", true);

mongoose.connect(
  "mongodb+srv://anonymous_chinchilla:anonymous_chinchilla@poster-ehandel-savbu.mongodb.net/poster-ehandel",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", function () {
  console.log("Connected to mongodb");
  imageStorage(db, mongoose.mongo);
});