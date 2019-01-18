const MongoClient= require('mongodb').MongoClient;
const assert= require('assert');
const dbop= require('./operations');
const url='mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';


MongoClient.connect(url).then((client)=>{

	
  	const db = client.db(dbname);
  	console.log("Connected correctly to server");
  	/*
  	*call back hell as well--
  	*/
 	
 	dbop.insertDocument(db, {"name":"alien", "description":"new alien"},"dishes").then((result)=>{ 		
 		 console.log("lets find the inserted one");

 		 return dbop.findDocuments(db, "dishes");
 		}).then((docs)=>{
 			console.log("Found updated document:", docs);

 		 	return dbop.updateDocument(db, {"name":"alien"}, {"description":"alient updated by newer version OS"}, "dishes"); 		 		
 		 		}).then((result)=>{ 
 		 			console.log("found updated doc: new alien:", result.result); 
 		 			return dbop.findDocuments(db, "dishes")
 		 			
 		 			}).then((doc)=>{
 		 				 console.log("found to drop Document again:\n",doc);
 		 				return db.dropCollection("dishes");
 		 			}).then((result)=>{

 		 				console.log("collection dropped!:", result);

 		 				//db.close();
 		 				client.close();
 		 			}).catch((err)=>
 		 			{
 		 				console.log("err:"+err);
 		 			});
}).catch((err)=>
{
	console.log("con-err:"+err);
});
