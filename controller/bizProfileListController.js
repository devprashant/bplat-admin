'use strict';

var mongoose = require('mongoose');

require('../models/bizProfileModel');
require('../models/prodProfileModel');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/bplat');

var BizProfile = mongoose.model('bizProfile');
var ProductProfile = mongoose.model('prodProfile');

// --- result handler for result obtained from db.
function handleResult(err, res, bizs){
	if (err) {
		console.log(err);
			return res.status(500).json({'message': 'error occured'});
		}

	return res.json(bizs);
}

// function findProductCategory(productName, callback){

// 	// find searched product category	
// 	// returns a Promise.
// 	// return 				

// 	// findOne query is asyc.
// 	// so below console statement will execute before findOne return an Object
// 	// before getting object category is in circular structure 
// 	// which cannot be converted to string via JSON.stringify. OOPS!
// 	// --- console.log("category " + JSON.stringify(category));

// 	// return category;
// }

//-- list all bizs
//-- list bizs by catergory
//-- lsit bizs by city
//-- list bizs by location(lat, lng)
// ------ 


exports.listBizs = (req, res) => {

	return BizProfile.find({}, (err, bizs) => { return handleResult(err, res, bizs); });
};

// exports.listBizsByCategory = (req, res) => {

// 	return BizProfile.find({}, (err, bizs) => { return handleResult(err, res, bizs); });
// }

// exports.listBizsByCity = (req, res) => {

// 	return BizProfile.find({}, (err, bizs) => { return handleResult(err, res, bizs); });
// };

// exports.listBizsByLocation = (req, res) => {

// 	var searchObj = {

// 	}

// 	return BizProfile.find({}, (err, bizs) => { return handleResult(err, res, bizs); });
// };

exports.listByQuery = (req, res) => {

	var searchObj = {
			'city': req.body.city,
			'area': req.body.area,
			// 'category': category,
			'products': req.body.product
		}

	if (!searchObj.products) return res.status(422).json({'message': 'unprocessable entity'});
	ProductProfile.findOne({name: searchObj.products}).select('category').exec()
		.then(category => {
			// searchObj.category = category;
			BizProfile.find(
				searchObj,
				/*{_id:0,__v:0},*/
				(err, bizs) => { return handleResult(err, res, bizs); }
			); 
		});
}

// admin access only
exports.addBiz = (req, res) => {

	// array data received from input field is in text. conveting to array again before storing
		// req.body["category.product"] = JSON.parse(req.body["category.product"]);
		// var allproducts = req.body["category.product"];
		// console.log(typeof req.body.products);
		console.log(req.body);
	var allproducts = JSON.parse(req.body.products);
	var allCategories = [];

	// console.log('all cat before' + JSON.stringify(allCategories));

	var index = 0;
	allproducts
		.map((name) => { 

				// findProductCategory(productname, callback)
				ProductProfile.findOne({name}).exec()
					// then add category to product category array allCategories[]
					.then(prodProfile => {
						
						// if category for a product not found
						// return with server error.

						if(!prodProfile) return handleResult("no category found", res,null);
						
						var prodCategory = prodProfile.category;
		 				
		 				// console.log("category " + JSON.stringify(prodCategory));

		 				// make sure allCategories array have unique values
		 				if(!allCategories.includes(prodCategory)){
		 					allCategories.push(prodCategory)
		 				}

		 				// run when categories of all products are classified.
						if(index === allproducts.length-1){
							// console.log('all cat after' + JSON.stringify(allCategories));
							// console.log(' allproducts ' + allproducts);
							// req.body.coordinates = JSON.parse(req.body.coordinates);
							// console.log(req.body);
							var bizObj = {
								name: req.body.name,
								coordinates: JSON.parse(req.body.coordinates),
								city: req.body.city,
								area: req.body.area,
								category: allCategories,
								products: allproducts
							}

							var addBizProfile = new BizProfile(bizObj);
							addBizProfile.save((err, biz) => handleResult(err, res, biz));
						}

						index++;
		 			})	 		 		
					.catch(err => {
						console.log(err);
						console.log(err.message);
					});
		});	
}