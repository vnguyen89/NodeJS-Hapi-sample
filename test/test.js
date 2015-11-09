var chai = require('chai');
var assert = require('assert');
var server = require('../build/server');
var expect = chai.expect;
describe('Server route test', function () {
    it('should success', function (done) {
        var testServer = server;
        testServer.register(require('inject-then'), function (err) {
            if (err)
                throw err;
        });
        return testServer.injectThen({ method: 'GET', url: '/' })
            .then(function (res) {
            expect(res.result).to.be.equal('Hello, world!');
            done();
        });
    });
    it('should success with name', function (done) {
        var testServer = server;
        testServer.register(require('inject-then'), function (err) {
            if (err)
                throw err;
        });
        return testServer.injectThen({ method: 'GET', url: '/test' })
            .then(function (res) {
            expect(res.result).to.be.equal('Hello, test');
            done();
        });
    });
});
