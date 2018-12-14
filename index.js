const MongoClient= require('mongodb').MongoClient;
const assert= require('assert');
const dbop= require('./operations');
const url='mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';


MongoClient.connect(url, (err, client)=>{

	assert.equal(err, null);

	
  	const db = client.db(dbname);
  	console.log("Connected correctly to server");
  	/*
  	*call back hell as well--
  	*/
 	
 	dbop.insertDocument(db, {"name":"alien", "description":"new alien"},"dishes", (result)=>{
 		 console.log("insert document:", result.ops);
 		 console.log("lets find the inserted one");

 		 dbop.findDocuments(db, "dishes", (docs)=>{
 		 	console.log("Found document:", docs);

 		 	dbop.updateDocument(db, {"name":"alien"}, {"description":"alient updated by newer version OS"}, "dishes", (result)=>{
 		 		console.log("updated doc: new alien:", result.result); 

 		 		 dbop.findDocuments(db, "dishes", (docs)=>{
 		 			console.log("Found updated document:", docs);

 		 			db.dropCollection("dishes", (result)=>{
 		 				console.log("collection dropped!:", result);

 		 				//db.close();
 		 				client.close();
 		 			});

 		 		});
 		 	})
 		 });
 	});


});
