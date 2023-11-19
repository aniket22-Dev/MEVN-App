import dummyMongoose, { Schema, Document, Model } from "mongoose";
import generateData from "data-generator-retail";

interface Product extends Document {
  productId: string;
  productName: string;
  productPrice: string;
  productImage: string;
}

const productSchema: Schema<Product> = new Schema({
  productId: {
    type: String,
  },
  productName: {
    type: String,
    required: false,
    unique: false,
  },
  productPrice: {
    type: String,
    default: "",
  },
  productImage: {
    type: String,
  },
});

const DummyProducts: Model<Product> = dummyMongoose.model(
  "DummyProduct",
  productSchema
);

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
        console.log(
          `Product with name/ID ${existingProduct.productName}/${existingProduct.productId} already exists. No need to create.`
        );
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

export default generateDummyProducts;
