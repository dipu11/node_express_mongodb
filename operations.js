const assert= require('assert');

exports.insertDocument=(db, document, collection, callback)=>
{
	const coll=db.collection(collection);
	coll.insertOne(document, (err,result)=>{
		assert.equal(err, null);
		console.log("insertion successfull:"+ result.result.n+" documents int collection"); 
		callback(result);
	}); 


};

exports.findDocuments=(db, collection, callback)=>
{
	const coll=db.collection(collection);

	coll.find({}).toArray((err, doc)=>{
		assert.equal(err, null);
		console.log("found data:");
		callback(doc);

	});
};


exports.removeDocument=(db, document, collection, callback)=>
{
	const coll=db.collection(collection);

	coll.deleteOne(document, (err, result)=>{
		assert.equal(err, null);
		console.log("document delete:"+ document);
		callback(result);

	});
};

exports.updateDocument=(db, document, update, collection, callback)=>
{
	const coll=db.collection(collection);

	coll.updateOne(document, {$set: update}, null, (err, result)=>{
		assert.equal(err, null);
		console.log("update the document with:"+ update);
		callback(result);
	});
};
