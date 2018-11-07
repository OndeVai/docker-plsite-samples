var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var host = process.env.MONGODB_HOST || 'localhost:27017';
const url = `mongodb://${host}`;
const dbName = 'myproject';

function findCollection(callback) {

	console.log(`trying to connect to mongo at '${url}'`);

	MongoClient.connect(url, function (err, client) {

		if(err) { //this is just crappy demo code
			console.error('error connecting to mongo');
			console.error(err);
			throw err;
		}

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
