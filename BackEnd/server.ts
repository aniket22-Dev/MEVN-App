const generateDummyProduct = require("./Controller/createProducts");
const synchronizeProduct = require("./SyncController/productService");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductRoute = require("./Routes/routes");
const env = require("dotenv");
const responseTime = require("response-time");
const port = 3000;
const cron = require("node-cron");
const app = express().use(cors());

env.config();
// Flag to track if synchronization is in progress
let isSyncInProgress = false;
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
    "57 19 * * *",
    async () => {
      console.log("Running generateDummyProducts...");
      await generateDummyProduct(1); // Adjust the number of dummy products as needed
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
      // Check if sync is already in progress, if so, terminate the new sync initiation
      if (isSyncInProgress) {
        console.log(
          "Sync is already in progress. Terminating new sync initiation."
        );
        return;
      }

      // Set flag to indicate sync is in progress
      isSyncInProgress = true;

      console.log("Sync Initiated");
      await synchronizeProduct(); // Adjust the number of dummy products as needed
      console.log("Product Sync Completed");

      // Reset flag to indicate sync has completed
      isSyncInProgress = false;
    },
    {
      timezone: "Asia/Kolkata", // Indian timezone (IST - Indian Standard Time)
    }
  );
}

// Endpoint to fetch paginated data
app.use(ProductRoute);

app.listen(3000, () => {
  console.log(`server is working fine on http://localhost:${port}`);
});

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://dbVue:9810189819Ab!@cluster0.idev8jp.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Databse Connected Successfully!!");
  })
  .catch((err: any) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

runDailyGeneration();
sync();
