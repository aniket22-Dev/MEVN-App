const Product = require("../Model/productModel");
const DummyProducts = require("../Model/dummyProductModel");

let batchSize = 3; // Initial batch size
let syncPaused = false; // Flag to control sync pace based on memory usage

// Function to compare data in DummyProduct and Product schemas and synchronize if different
async function synchronizeData() {
  try {
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // Memory usage in MB

    // Adjust batch size based on memory usage
    if (memoryUsage > 400) {
      // If memory usage exceeds 400MB, reduce the batch size to slow down sync
      batchSize = 1;
      syncPaused = true;
    } else {
      // Otherwise, reset to the initial batch size and resume sync
      batchSize = 3;
      syncPaused = false;
    }

    if (syncPaused) {
      console.log("Sync paused due to high memory usage");
      return;
    }

    // Fetch data from DummyProducts schema
    const dummyProducts = await DummyProducts.find().lean().exec();

    // Fetch data from Product schema
    const products = await Product.find().lean().exec();

    // Identify new or changed items in DummyProduct
    const productsToUpdate = dummyProducts.filter((dummyProduct) => {
      const existingProduct = products.find(
        (product) => product._id === dummyProduct._id
      ); // Assuming there's an _id field for comparison
      return (
        !existingProduct ||
        JSON.stringify(existingProduct) !== JSON.stringify(dummyProduct)
      );
    });

    // Update Product schema with new or changed items from DummyProduct in batches
    for (let i = 0; i < productsToUpdate.length; i += batchSize) {
      const batch = productsToUpdate.slice(i, i + batchSize);
      console.log(`Syncing products batch ${i / batchSize + 1}`);

      const updatePromises = batch.map(async (product) => {
        console.log(`Syncing product: ${JSON.stringify(product)}`);
        await Product.findByIdAndUpdate(product._id, product, { upsert: true });
      });

      await Promise.all(updatePromises);
    }

    console.log("Data synchronized from DummyProduct to Product schema");
  } catch (error) {
    console.error("Error synchronizing data:", error);
  }
}

module.exports = synchronizeData;
