'use strict';
/*eslint-env node, mocha, es6 */
process.env.NODE_ENV = 'test';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const fs = require('fs');
const http = require('http');
const cheerio = require('cheerio');

suite('index:', function() {
    let server = require('../index.js');
    const config = require(__dirname + '/../config/options.js');
    if (!server) server = http.createServer();
    const assert = require('chai').assert;
    test('this always passes', function() {
        assert.equal(1, 1);
    });

    test('check pulse https should return statusCode 200', function(
        done) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const req = http.request({
            host: config.app_host,
            path: '/',
            port: config.http_port,
            rejectUnauthorized: false,
            requestCert: false,
            agent: false
        }, function(res) {
            const body = [];
            res.on('data', function(data) {
                body.push(data);
            });
            res.on('end', function() {
                assert.equal(res.statusCode,
                    200);
                done();
            });
        });
        req.end();
    });
    test('status section', function(done) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const req = http.request({
            host: config.app_host,
            path: '/',
            port: config.http_port,
            rejectUnauthorized: false,
            requestCert: false,
            agent: false
        }, function(res) {
            res.setEncoding('utf8');
            let spool = '';
            res.on('data', function(data) {
                spool = spool + data;
            });
            res.on('end', function() {
                if (res.statusCode == 200) {
                    const cheers = cheerio.load(
                        spool);
                    assert.ok(cheers(
                            '.app_name',
                            '#status')
                        .text());
                    assert.ok(cheers(
                            '.pulsetime',
                            '#status')
                        .text());
                    assert.isBelow(
                        1456714932435,
                        cheers('#pulsetime')
                        .text());
                }
                done();
            });
        });
        req.end();
    });

});
