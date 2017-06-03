'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bizProfileSchema = new Schema ({
	'name': { type: String, required: true },
	'coordinates': { 
		lat: { type: Number, required: true	},
		lng: { type: Number, required: true }
	},
	'area': { type: String, required: true },
	// 'products': { type: [] },
	'city': { type: String, required: true },
	'category': { type: [], required: true },
	'products': { type: [], required: true },
	'createdOn': { type: Date, default: Date.now(), required: true }
	// 'timings': { type: String },
	// 'famous_for': { type: String },
	// 'views': { type: String },
	// 'average_rating' : { type: String },
	// 'category': { type: String },
	// 'updated': { type: Date, default: Date.now }
});

module.exports = mongoose.model('bizProfile', bizProfileSchema);