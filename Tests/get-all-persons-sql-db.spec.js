const GetAllPersonsSQL = require('../GetAllPersonsSQL/index')
const expect = require('chai').expect
const sinon = require('sinon');
const utils = require('./utils');
const repository = require('../GetAllPersonsSQL/repository/person-repository');

describe('GetAllPersonsSQL function', () => {
    var repositoryStub = {};
    var sandbox = {};
    var response = {};
    var expected = {};

    beforeEach(function() {

        sandbox = sinon.createSandbox();
        
        response = [{"personId":1,"lastName":"Hurtado","firstName":"Hector","id":"5cf9a568-abc6-8ab4-f773-760182fe5564"}];

        expected = {
            data: response,
            message: "Here are all the Persons in SQL DB"
        }

        repositoryStub = sandbox.stub(repository, 'queryAll').callsFake( (ctx,cb) => {
            ctx.log("Calling Fake Repository"); // eslint-disable-line no-console
            cb(response);
          });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should return all persons in DB properly', (done) => {
        sandbox.spy(utils.context, "done");

        GetAllPersonsSQL(utils.context, utils.req);        

        expect(utils.context.res.body).to.equal(JSON.stringify(expected), "Result is wrong!!");
        expect(utils.context.done.called).to.be.true;
        sinon.assert.calledOnce(repositoryStub);
        
        done();
    });
})