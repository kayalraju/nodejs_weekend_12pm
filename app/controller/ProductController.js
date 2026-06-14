const Product = require("../models/Product");
const productSchemaValidation = require("../utils/productvalidate");

class ProductController {
  async createProduct(req, res) {
    //console.log(req.body);
    //console.log(req.file);

    try {
      //const {name,price,category}=req.body

      const formValue = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
      };

      //joi validation use
      const result = productSchemaValidation.validate(formValue);
      if (result.error) {
        return res.status(400).json({
          status: false,
          message: result.error.details[0].message,
        });
      }

      const prod = new Product(formValue);
      // if(req.file){
      //     prod.image=req.file.path
      // }
      const data = await prod.save();
      return res.status(200).json({
        status: true,
        message: "Product Created Successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getProduct(req, res) {
    try {
      const data = await Product.find();
      return res.status(200).json({
        status: true,
        message: "Product Fetched Successfully",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const datasingle = await Product.findById(id);
      return res.status(200).json({
        status: true,
        message: "get single product",
        data: datasingle,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const data = await Product.findByIdAndUpdate(id, req.body);
      return res.status(200).json({
        status: true,
        message: "Product Updated Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const data = await Product.findByIdAndDelete(id);
      //unlink image

      return res.status(200).json({
        status: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async aggregateProduct(req, res) {
    try {
      const data = await Product.aggregate([
        // {
        //     $match:{
        //         price:{$gt:2000},
        //         category:'mobile'
        //     }
        // },
        // {
        //   $project: {
        //     name: 0,
        //     price: 0,
        //     __v: 0,
        //   },
        // },
        // {
        //     $sort:{
        //         price:-1
        //     }
        // },

        // {
        //     $limit: 2
        // }

        // {
        //     $addFields: {
        //         priceWithTax: {
        //             $multiply: ["$price", 1.18]
        //         },
        //         tax: {
        //             $multiply: ["$price", 0.18]
        //         },
        //         total: {
        //             $add: ["$price", "$tax"]
        //         }
        //     }
        // }
        // {
        //     $unwind: "$category"
        // }

        // {
        //     $skip: 3
        // }

        // {
        //   $group: {
        //     _id: "$category",
        //     totalProducts: { $sum: 1 },
        //     avgPrice: { $avg: "$price" },
        //   },
        // },

        // {
        //     $group:{
        //         _id:"$category",
        //         ptoductByCategory:{$push:"$$ROOT"},
        //         totalProducts:{$sum:1},
        //         avgPrice:{$avg:"$price"}
        //     }
        // }

        // {
        //     $sample: { size: 2 }
        // }

        // {
        //     $set: {
        //         priceWithTax: {
        //             $multiply: ["$price", 1.18]
        //         },
        //         tax: {
        //             $multiply: ["$price", 0.18]
        //         },
               
        //     }
        // }
      ]);

      return res.status(200).json({
        status: true,
        message: "Product Aggregated Successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
