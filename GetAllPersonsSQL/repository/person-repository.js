var msSqlConnecter = require("../../Shared/sqldb"); 
var env = require("../../Shared/environment"); 
 
var config = {
    userName: env.getEnvironmentVariable("SQLUser"),
    password: env.getEnvironmentVariable("SQLPassword"),
    server: env.getEnvironmentVariable("SQLServer"),
    options:
    {
        database: env.getEnvironmentVariable("SQLDataBase"),
        encrypt: true
    }
};

function handleError(context, err, message){
    context.log(err);
    context.res = {
        status: 500,
        body: message
    };
    context.done();
}
 
function queryAll(context, callback) { 
    var con = new msSqlConnecter.msSqlConnecter(config); 
    con.connect().then(function () { 
        new con.Request("select * from person") 
            .onComplate(function (count, result) { 
                if (callback) 
                    context.log("In total you get "+ count +" records"); 
                    callback(result); 
            }) 
            .onError(function (err) { 
                handleError(context, err, "Unable to get all the persons");
            }).Run(); 
    }).catch(function (ex) { 
        handleError(context, ex, "Unable to connect to database");
    }); 
} 

module.exports = {queryAll};