var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

function findCollection(callback) {

	MongoClient.connect(url, function (err, client) {
		console.log("Connected successfully to server");
		const db = client.db(dbName);
		const collection = db.collection('documents');
		// Find some documents
		collection.find({}).toArray(function (err, docs) {
			client.close();
			callback(docs);
		});
	});
}

function insertCollection(callback) {
	MongoClient.connect(url, function (err, client) {
		console.log("Connected successfully to server");
		const db = client.db(dbName);
		const collection = db.collection('documents');
		var docs = [
			{title : 'doc1'},
			{title : 'doc2'},
			{title : 'doc3'}
		];
		collection.insertMany(docs, function(err, result) {
			console.log("Inserted 3 documents into the collection");
			callback(docs);
		});
	});
}

function findOrInsertDocs(callback){
	findCollection(function(docs){
		if(docs.length) {
			callback(docs);
		}
		else {
			insertCollection(function (docs) {
				callback(docs);
			})
		}
	});
}

/* GET home page. */
router.get('/', function (req, res, next) {
	findOrInsertDocs(function (docs) {
		res.render('index', {title: 'Express', docs: docs});
	})
});

module.exports = router;
