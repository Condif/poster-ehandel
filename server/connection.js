const mongoose = require("mongoose");

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
db.once("open", () => console.log("Connected to Database"));
