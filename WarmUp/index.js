module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request for WarmUp');

    context.res = {
        body: "Service is UP"
    };

    context.done();
};