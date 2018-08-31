var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to Get All Person from SQL Database' + req);

    var config = {
        userName: getEnvironmentVariable("SQLUser"),
        password: getEnvironmentVariable("SQLPassword"),
        server: getEnvironmentVariable("SQLServer"),
        options:
        {
            database: getEnvironmentVariable("SQLDataBase"),
            encrypt: true
        }
    };    

    var connection = new Connection(config);

    connection.on('connect', function(err) {
        context.log('Connected successfully to server');
        if (err) {
            handleError(err);
        } else {
            executeStatement();
        }
    });

    function handleError(err)
    {
        context.log(err);
        context.res = {
            status: 500,
            body: "Unable to establish a connection."
        };
        context.done();
    }

    function executeStatement() {
        var result = []; 
        var response = {
            data:null,
            message:""
        };
        var request;
        
        request = new Request("SELECT * FROM Person", function(err, rowCount) {
            if (err) {
                handleError(err);
            } else {
                context.log('Getting All Persons in SQL');
                context.log(rowCount + ' rows');
                response.data = JSON.stringify(result);
                response.message = "Here are all the Persons in SQL DB";
                context.res = { status: 200, body: JSON.stringify(response)};
                context.done();                
            }
        });

        request.on('row', function(columns) {
            var row = {}; 
            columns.forEach(function(column) {
                if (column.isNull) { 
                    row[column.metadata.colName] = null; 
                  } else { 
                    row[column.metadata.colName] = column.value; 
                  }
            });
            result.push(row);            
        });

        connection.execSql(request);
    }
};

function getEnvironmentVariable(name)
{
    return process.env[name];
}