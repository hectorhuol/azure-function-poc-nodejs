var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://nosql-model.documents.azure.com:10255/?ssl=true';

module.exports = function (context, req) {
    MongoClient.connect(url, { 
        auth: {
            user: 'nosql-model',
            password: '26Ou8SExdyvu0Rv0rKwL6Jqpf6UQy3Lb0aISklNE4Jl2aIFTPgrpnfNNuPFAGv2C0AIo9lhxiWLZgHgfyw2LWw=='
        }
        },  function(err, client) {

        context.log('Connected successfully to server');
        var db = client.db('personsdb');
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