const GetAllPersonsMongoDB = require('../GetAllPersonsMongoDB/index.js')
const expect = require('chai').expect
const sinon = require('sinon');
const MongoClient = require('mongodb').MongoClient;

describe('GetAllPersonsMongoDB function', () => {
    var req = {};
    var context = {};
    var mongoClientStub = {};
    var mockDbCollection = {};
    var sandbox = {};
    var response = {};
    var expected = {};

    beforeEach(function() {
        sandbox = sinon.createSandbox();
        
        req = {  };
        context = {
            res: {
                status: 200
            },
            log: function (str) {
                console.log(str); // eslint-disable-line no-console
            },
            done: function () {

            }
        };

        response = [{"_id":"5b77377807bf861994788ae9","personId":1,"lastName":"Hurtado","firstName":"Hector","id":"5cf9a568-abc6-8ab4-f773-760182fe5564"}];

        expected = {
            data:JSON.stringify(response),
            message: "Here are all the Persons in Mongo DB"
        }

        mockDbCollection = {
            db: function(name) {
                console.log("Calling function DB with: " + name); // eslint-disable-line no-console
                return {
                    collection: function(name) {
                        console.log("Calling function Collection with: " + name); // eslint-disable-line no-console
                        return {
                            find: function() {
                                return {
                                   toArray: function(cb) {
                                     cb(null, response);
                                    }
                                };
                            }
                        } 
                    }
                }
            }            
          };

          mongoClientStub = sandbox.stub(MongoClient, 'connect').callsFake( (url, options, cb) => {
            cb(null,mockDbCollection);
          });
    });

    afterEach(function () {
        sandbox.restore();
      });

    it('should return all persons in DB properly', (done) => {
        sandbox.spy(context, "done");
        sandbox.spy(mockDbCollection, "db");

        GetAllPersonsMongoDB(context, req);
        
        expect(context.res.body).to.equal(JSON.stringify(expected), "Result is wrong!!");
        expect(context.done.called).to.be.true;
        expect(mockDbCollection.db.called).to.be.true;
        sinon.assert.calledOnce(mongoClientStub);
        done();
    });
})