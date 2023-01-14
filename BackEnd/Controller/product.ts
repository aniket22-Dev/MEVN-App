const UserModel = require('../model/productModel')

// Create and Save a new user
exports.create = async (req: { body: { email: any; firstName: any; lastName: any; phone: any; productName: any; productPrice: any; ProductImage: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: { message: string; user: any; }) => void; }) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const user = new UserModel({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        ProductImage: req.body.ProductImage
    });
    
    await user.save().then((data: any) => {
        res.send({
            message:"User created successfully!!",
            user:data
        });
    }).catch((err: { message: any; }) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: async () => {
	error
}});
    }
};

// Find a single User with an id
exports.findOne = async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404);
    }
};

// Update a user by the id in the request
exports.update = async (req: { body: any; params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; }) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then((data: any) => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch((err: { message: any; }) => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; }) => {
    await UserModel.findByIdAndRemove(req.params.id).then((data: any) => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch((err: { message: any; }) => {
        res.status(500).send({
          message: err.message
        });
    });
};