"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const data_generator_retail_1 = __importDefault(require("data-generator-retail"));
const DummyProducts = require("../Model/dummyProductModel"); // Correcting the import path to your schema file
function generateDummyProducts(num) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.Promise = global.Promise;
            mongoose_1.default.set("strictQuery", false);
            mongoose_1.default
                .connect("mongodb+srv://dbVue:9810189819Ab!@cluster0.idev8jp.mongodb.net/test", {
            // useNewUrlParser: true,
            })
                .then(() => {
                // console.log("Database Admin Portal Connected");
            })
                .catch((err) => {
                console.log("Could not connect to the database", err);
                process.exit();
            });
            for (let i = 0; i < num; i++) {
                const existingProduct = yield DummyProducts.findOne({
                    $or: [
                        { productId: `Product-${i + 1}` },
                        { productName: `Dummy Product ${i + 1}` },
                    ],
                });
                if (existingProduct) {
                    console.log(`Product with name/ID already exists. No need to create.`);
                }
                else {
                    const data = (0, data_generator_retail_1.default)();
                    for (const product of data.products) {
                        const dummyProduct = new DummyProducts({
                            productId: product.id,
                            productName: product.reference,
                            productPrice: `$ ${product.price}`,
                            productImage: product.image,
                        });
                        yield dummyProduct.save();
                    }
                    console.log(`Product Created`);
                }
            }
            // dummyMongoose.disconnect();
        }
        catch (error) {
            console.error("Error generating dummy products:", error);
        }
    });
}
exports.default = generateDummyProducts;
