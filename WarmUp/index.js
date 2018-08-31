module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request for WarmUp' + req);

    context.res = {
        body: "Service is UP"
    };

    context.done();
};