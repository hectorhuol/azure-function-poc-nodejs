const WarmUp = require('../WarmUp/index')
const expect = require('chai').expect
const sinon = require('sinon');
const utils = require('./utils');

describe('WarmUp function', () => {
    var sandbox = {};

    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should return Service is UP message', (done) => {
        sandbox.spy(utils.context, "done");

        WarmUp(utils.context, utils.req);        

        expect(utils.context.res.body).to.equal("Service is UP", "Result is wrong!!");
        expect(utils.context.done.called).to.be.true;
        
        done();
    });
})