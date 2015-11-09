/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/server.d.ts" />
import mocha = require('mocha');
import chai = require('chai');
var assert = require('assert');

import Hapi = require('hapi');
import server = require('../source/server');

let expect = chai.expect;

describe('Server route test', () => {
    it('should success', (done: MochaDone) => {
        var testServer: any = <Hapi.Server>server;
        
        testServer.register(require('inject-then'), function(err) {
            if (err) throw err;
        });
        
        return testServer.injectThen({method: 'GET', url:'/'})
        .then(function(res){
            expect(res.result).to.be.equal('Hello, world!');
            done();
        });
    });
    
    it('should success with name', (done: MochaDone) => {
        var testServer: any = <Hapi.Server>server;
        
        testServer.register(require('inject-then'), function(err) {
            if (err) throw err;
        });
        
        return testServer.injectThen({method: 'GET', url:'/test'})
        .then(function(res){
            expect(res.result).to.be.equal('Hello, test');
            done();
        });
    })
});

