var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import generateDummyProducts from "./Controller/createProducts";
// import synchronizeData from "./SyncController/productService";
const generateDummyProducts = require("./Controller/createProducts");
const synchronizeData = require("./SyncController/productService");
const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./databaseConfig/database.config.ts");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductRoute = require("./Routes/routes");
const userRoute = require("./Routes/userRoutes");
const env = require("dotenv");
const responseTime = require("response-time");
const Product = require("./Model/productModel");
const port = 3000;
const cron = require("node-cron");
const app = express().use(cors());
env.config();
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
    cron.schedule("15 15 * * *", () => __awaiter(this, void 0, void 0, function* () {
        console.log("Running generateDummyProducts...");
        yield generateDummyProducts(1); // Adjust the number of dummy products as needed
        console.log("generateDummyProducts executed!");
    }), {
        timezone: "Asia/Kolkata", // Indian timezone (IST - Indian Standard Time)
    });
}
function sync() {
    // Schedule the function to run at every 15 minutes in Indian timezone
    cron.schedule("*/15 * * * *", () => __awaiter(this, void 0, void 0, function* () {
        console.log("Sync Initiated");
        yield synchronizeData(); // Adjust the number of dummy products as needed
        console.log("Product Sync Completed");
    }), {
        timezone: "Asia/Kolkata", // Indian timezone (IST - Indian Standard Time)
    });
}
// Endpoint to fetch paginated data
app.use(ProductRoute);
app.use("/v2", ProductRoute);
app.use(userRoute);
app.listen(3000, () => {
    console.log(`server is working fine on http://localhost:${port}`);
});
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
runDailyGeneration();
sync();
mongoose
    .connect(dbConfig.url, {
    useNewUrlParser: true,
})
    .then(() => {
    console.log("Databse Connected Successfully!!");
})
    .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
});
