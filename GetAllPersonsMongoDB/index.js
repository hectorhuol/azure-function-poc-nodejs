var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://nosql-model.documents.azure.com:10255/?ssl=true';

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to Get All Person from SQL Database');

    MongoClient.connect(url, 
        {
            auth: {
                user: getEnvironmentVariable("MongoUser"),
                password: getEnvironmentVariable("MongoPassword")
            }   
        },  function(err, client) {

        context.log('Connected successfully to server');

        context.log('Getting DB...');
        var db = client.db(getEnvironmentVariable("MongoDB"));
        
        findPersons(context, db); 
    });

    var findPersons = function(context, db) {
        db.collection('persons').find().toArray(function(err, result) {
            if (err) {
                context.log(err);        
                context.res = {status: 500, body: "Unable to establish a connection."};
                context.done();   
            } else {
                context.log('Getting All Persons');
                var response = { status: 200, body: JSON.stringify(result) };
                context.res = response;
                context.done();
            } 
        });                                
    }
};