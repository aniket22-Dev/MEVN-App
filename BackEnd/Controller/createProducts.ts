import dummyMongoose from "mongoose";
import generateData from "data-generator-retail";

const DummyProducts = require("../Model/dummyProductModel"); // Correcting the import path to your schema file

async function generateDummyProducts(num: number): Promise<void> {
  try {
    dummyMongoose.Promise = global.Promise;
    dummyMongoose.set("strictQuery", false);

    dummyMongoose
      .connect(
        "mongodb+srv://dbVue:9810189819Ab!@cluster0.idev8jp.mongodb.net/test",
        {
          // useNewUrlParser: true,
        }
      )
      .then(() => {
        // console.log("Database Admin Portal Connected");
      })
      .catch((err: any) => {
        console.log("Could not connect to the database", err);
        process.exit();
      });

    for (let i = 0; i < num; i++) {
      const existingProduct = await DummyProducts.findOne({
        $or: [
          { productId: `Product-${i + 1}` },
          { productName: `Dummy Product ${i + 1}` },
        ],
      });

      if (existingProduct) {
        console.log(`Product with name/ID already exists. No need to create.`);
      } else {
        const data = generateData();

        for (const product of data.products) {
          const dummyProduct = new DummyProducts({
            productId: product.id,
            productName: product.reference,
            productPrice: `$ ${product.price}`,
            productImage: product.image,
          });
          await dummyProduct.save();
        }

        console.log(`Product Created`);
      }
    }
    // dummyMongoose.disconnect();
  } catch (error) {
    console.error("Error generating dummy products:", error);
  }
}

module.exports = generateDummyProducts;
