var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Product = require("../Model/productModel");
const DummyProducts = require("../Model/dummyProductModel");
// Function to compare data in DummyProduct and Product schemas and synchronize if different
function synchronizeData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch data from DummyProducts schema
            const dummyProducts = yield DummyProducts.find().lean().exec(); // Fetching as plain JavaScript objects
            // Fetch data from Product schema
            const products = yield Product.find().lean().exec(); // Fetching as plain JavaScript objects
            // Identify new or changed items in DummyProduct
            const productsToUpdate = dummyProducts.filter((dummyProduct) => {
                const existingProduct = products.find((product) => product._id === dummyProduct._id); // Assuming there's an _id field for comparison
                return (!existingProduct ||
                    JSON.stringify(existingProduct) !== JSON.stringify(dummyProduct));
            });
            // Update Product schema with new or changed items from DummyProduct in batches of 10
            const batchSize = 3;
            for (let i = 0; i < productsToUpdate.length; i += batchSize) {
                const batch = productsToUpdate.slice(i, i + batchSize);
                console.log(`Syncing products batch ${i / batchSize + 1}`);
                const updatePromises = batch.map((product) => __awaiter(this, void 0, void 0, function* () {
                    console.log(`Syncing product: ${JSON.stringify(product)}`);
                    yield Product.findByIdAndUpdate(product._id, product, { upsert: true });
                }));
                yield Promise.all(updatePromises);
            }
            console.log("Data synchronized from DummyProduct to Product schema");
        }
        catch (error) {
            console.error("Error synchronizing data:", error);
        }
    });
}
module.exports = synchronizeData;
