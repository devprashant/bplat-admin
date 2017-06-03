'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var prodProfileSchema = new Schema({
	'name': { type: String, required: true, unique: true },
	'category': { type: String, required: true }
});

module.exports = mongoose.model('prodProfile', prodProfileSchema);