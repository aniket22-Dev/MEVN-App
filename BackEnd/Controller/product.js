var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ProductModel = require("../Model/productModel");
exports.paginated = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1; // Current page, defaults to 1
        const limit = parseInt(req.query.limit) || 10; // Items per page, defaults to 10
        const startIndex = (page - 1) * limit; // Start index of items on the current page
        const totalItems = yield ProductModel.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        const results = yield ProductModel.find()
            .skip(startIndex)
            .limit(limit)
            .exec();
        res.json({
            results,
            totalPages,
            currentPage: page,
            totalItems,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});
// Create and Save a new user
exports.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    // }
    const user = new ProductModel({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage,
        productId: req.body.productId,
    });
    yield user
        .save()
        .then((data) => {
        res.send({
            message: "Product created successfully!!",
            user: data,
        });
        console.log("Product created", data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user",
        });
    });
});
exports.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = new ProductModel({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage,
        productId: req.body.productId,
    });
    try {
        yield ProductModel.insertMany(user);
        res.status(200).json({ message: "Products created successfully" });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Error Importing Products in bulk",
        });
    }
});
// Retrieve all users from the database.
exports.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield ProductModel.find();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({
            message: () => __awaiter(this, void 0, void 0, function* () {
                error;
            }),
        });
    }
});
// Find a single Product with an id
exports.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield ProductModel.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404);
    }
});
// Update a user by the id in the request
exports.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }
    const id = req.params.id;
    yield ProductModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`,
            });
        }
        else {
            res.send({ message: "Product updated successfully." });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message,
        });
    });
});
// Delete a user with the specified id in the request
exports.destroy = (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield ProductModel.findByIdAndRemove(req.params.id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`,
            });
        }
        else {
            res.send({
                message: "Product deleted successfully!",
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message,
        });
    });
});
