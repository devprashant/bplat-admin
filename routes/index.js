'use strict';

var express = require('express');
var router = express.Router();

var bizProfile = require('../controller/bizProfileListController');
var prodProfile = require('../controller/prodProfileController');


module.exports = (app) => {

	router.route('/')
			.get(bizProfile.listBizs)
			.post(bizProfile.addBiz);

	// router.route('/bycategory')
	// 		.get(bizProfile.listBizsByCategory);

	router.route('/search')
			.post(bizProfile.listByQuery);

	router.route('/admin/add')
			

	router.route('/product')
			.get(prodProfile.listAllProducts)
			.post(prodProfile.addProduct);

	app.use('/api/', router);
}