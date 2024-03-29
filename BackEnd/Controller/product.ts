const ProductModel = require("../Model/productModel");

exports.paginated = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, defaults to 1
    const limit = parseInt(req.query.limit) || 10; // Items per page, defaults to 10

    const startIndex = (page - 1) * limit; // Start index of items on the current page

    const totalItems = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const results = await ProductModel.find()
      .skip(startIndex)
      .limit(limit)
      .exec();

    res.json({
      results,
      totalPages,
      currentPage: page,
      totalItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
// Create and Save a new user
exports.create = async (
  req: {
    body: {
      email: any;
      firstName: any;
      lastName: any;
      phone: any;
      productName: any;
      productPrice: any;
      productImage: any;
      productId: any;
    };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: any }): void; new (): any };
    };
    send: (arg0: { message: string; user: any }) => void;
  }
) => {
  // if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
  //     res.status(400).send({ message: "Content can not be empty!" });
  // }

  const user = new ProductModel({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImage: req.body.productImage,
    productId: req.body.productId,
  });

  await user
    .save()
    .then((data: any) => {
      res.send({
        message: "Product created successfully!!",
        user: data,
      });
      console.log("Product created", data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

exports.post = async (req: any, res: any) => {
  const user = new ProductModel({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImage: req.body.productImage,
    productId: req.body.productId,
  });

  try {
    await ProductModel.insertMany(user);
    res.status(200).json({ message: "Products created successfully" });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error Importing Products in bulk",
    });
  }
};

// Retrieve all users from the database.
exports.findAll = async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: any }): void; new (): any };
    };
  }
) => {
  try {
    const user = await ProductModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: async () => {
        error;
      },
    });
  }
};

// Find a single Product with an id
exports.findOne = async (
  req: { params: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: any }): void; new (): any };
    };
  }
): Promise<void> => {
  try {
    const user = await ProductModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404);
  }
};

// Update a user by the id in the request
exports.update = async (
  req: { body: any; params: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: any }): void; new (): any };
    };
    send: (arg0: { message: string }) => void;
  }
) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await ProductModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Product not found.`,
        });
      } else {
        res.send({ message: "Product updated successfully." });
      }
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (
  req: { params: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: any }): void; new (): any };
    };
    send: (arg0: { message: string }) => void;
  }
) => {
  await ProductModel.findByIdAndRemove(req.params.id)
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Product not found.`,
        });
      } else {
        res.send({
          message: "Product deleted successfully!",
        });
      }
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
