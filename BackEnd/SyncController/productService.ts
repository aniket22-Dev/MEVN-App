const Product = require("../Model/productModel");
const DummyProducts = require("../Model/dummyProductModel");

// Function to compare data in DummyProduct and Product schemas and synchronize if different
async function synchronizeData() {
  try {
    // Fetch data from DummyProducts schema
    const dummyProducts = await DummyProducts.find().lean().exec(); // Fetching as plain JavaScript objects

    // Fetch data from Product schema
    const products = await Product.find().lean().exec(); // Fetching as plain JavaScript objects

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

    // Update Product schema with new or changed items from DummyProduct in batches of 10
    const batchSize = 3;
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
