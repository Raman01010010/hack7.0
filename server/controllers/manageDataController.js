const Accidents = require('../model/Accidents.js');

const addData = async(req,res) => {
      const d = req.body;
      console.log(d);
      console.log("kfde");
}

const getData = async(req,res) => {

}

module.exports = {addData,getData};