'use strict';

var mongoose = require('mongoose');

require('../models/prodProfileModel'); // registers prodProfile Model

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/bplat');

var ProductProfile = mongoose.model('prodProfile');

// --- result handler for result obtained from db.
function handleResult(err, res, productProfile){
	if (err) {
		// console.log(err);
			return res.status(500).json({'message': 'error occured', 'details': err.message});
		}

	return res.json(productProfile);
}

//-- CRUD operations---------

//-- CREATE PRODUCT CATEGORY
exports.addProduct = (req, res) => {

	var addProductProfile = new ProductProfile(req.body);

	return addProductProfile.save((err, prodProfile) => handleResult(err, res, prodProfile));
}

//-- READ ALL CATEGORIES
exports.listAllProducts = (req, res) => {
			ProductProfile.find({}, (err, prodProfiles)=> handleResult(err, res, prodProfiles));
};

//-- UPDATE A CATEGORY

//-- DELETE A CATEGORY