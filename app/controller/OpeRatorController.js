const Invant = require("../models/inventroy");

class OpeRatorController {
  async createOperator(req, res) {
    try {
      const data = await Invant.create(req.body);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }


  async eq(req, res) {
    try {
      const data = await Invant.find({"_id": { $eq: "6a112016bf49ef34fa599c4b"}});
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new OpeRatorController();
