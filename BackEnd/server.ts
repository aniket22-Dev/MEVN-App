const generateDummyProducts = require("./Controller/createProducts");
const synchronizeData = require("./SyncController/productService");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductRoute = require("./Routes/routes");
const env = require("dotenv");
const responseTime = require("response-time");
const cron = require("node-cron");

const app = express().use(cors());
env.config();

const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000
const dbURL = process.env.url; // Use environment variable for MongoDB connection string

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

// parse request of content-type - application/json

//reset cache for servers
app.use(express.static(__dirname + "/public", { maxAge: 31557600 }));

app.use(bodyParser.json());

app.use(responseTime());
//help in cache control express server and loads it fast
// app.get("/", async (res) => {
//   // res.setHeader("Cache-Control", "public, max-age=86400");
//   res.send("Hey Server is UP 🥳");
// });

//if want to run on every second use * * * * * otherwise to run on everty 5pm use 15 15 * * *
function runDailyGeneration() {
  // Schedule the function to run at 3:15 PM daily in Indian timezone
  cron.schedule(
    "15 15 * * *",
    async () => {
      console.log("Running generateDummyProducts...");
      await generateDummyProducts(1); // Adjust the number of dummy products as needed
      console.log("generateDummyProducts executed!");
    },
    {
      timezone: "Asia/Kolkata", // Indian timezone (IST - Indian Standard Time)
    }
  );
}

function sync() {
  // Schedule the function to run at every 15 minutes in Indian timezone
  cron.schedule(
    "*/15 * * * *",
    async () => {
      console.log("Sync Initiated");
      await synchronizeData(); // Adjust the number of dummy products as needed
      console.log("Product Sync Completed");
    },
    {
      timezone: "Asia/Kolkata", // Indian timezone (IST - Indian Standard Time)
    }
  );
}

// Endpoint to fetch paginated data
app.use(ProductRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

runDailyGeneration();
sync();

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });
