import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
configDotenv();
const app = express();
const port = 3000;
import shortRoutes from "./routes/route.js";
import { configDotenv } from "dotenv";

// Load environment variables based on NODE_ENV
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  configDotenv({ path: ".env.production" });
} else if (process.env.NODE_ENV === "development") {
  configDotenv({ path: ".env.development" });
} else {
  throw new Error("Invalid NODE_ENV");
}

// Now you can access your environment variables anywhere in your app




app.use(bodyParser.json()); //for content type application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // set which origins are allowed
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST , PUT, PATCH, DELETE"
  ); //to set which methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

app.use(shortRoutes);
/**
 * Connect to MongoDB
 * @param {string} url - The URL of the database.
 * @returns - Returns a promise.
 * 
 */
// 
connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err));