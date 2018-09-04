var repository = require('./repository/person-repository');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to Get All Person from Mongo Database' + req);

    var response = {
        data:null,
        message:null
    }

    repository.queryAll(context, function(data){
        context.log('Getting All Persons in MongoDB');
        response.data = data;
        response.message = "Here are all the Persons in Mongo DB";
        context.res = { status: 200, body: JSON.stringify(response) };
        context.done();
    });   
};