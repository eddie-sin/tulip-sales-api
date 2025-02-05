const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connection successful"));

const app = require("./app");
console.log("Current Environment (mode): ", app.get("env"));

const port = process.env.PORT;
const server = app.listen(port, "0.0.0.0", () =>
  console.log("Server running on port 5000")
);
