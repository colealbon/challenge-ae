'use strict';
/*eslint-env node, mocha, es6 */

const koa = require('koa'),
router = require('koa-route'),
views = require('co-views'),
serve = require('koa-static'),
path = require('path'),
http = require('http'),
logger = require('koa-logger'),
config = require(__dirname + "/config/options.js");

const app = module.exports = new koa();

const render = views(__dirname + '/views', {
    map: {
        html: 'swig'
    }
});

app.use(logger());

function* index() {
    this.body = yield render('index.swig', {
        'timestamp': new Date().getTime(),
        'app_name': config.app_name,
        'app_host': config.app_host,
        'http_port': config.http_port
    })
}

// ROUTES
app.use(serve(path.join(__dirname, 'public')));
app.use(router.get('/', index));

// WEB SERVER
const server = http.createServer(app.callback()).listen(
    config.http_port);

//SOCKET.IO SERVER
const io = require('socket.io')(server);
let PULSE = new Date().getTime();
io.on('connection', function(socket) {
    //send fake prices every 5 seconds
    setInterval( function fakeprice() {
         io.emit('price', {
                label: 'sprocket',
                raw_value: 100 + Math.random(),
                calc_value: 100 + Math.random().toFixed(7),
                key: 'sprocket',
                source: 'fake',
                time: parseInt(new Date().getTime() / 1000, 10)
            });
    }, config.heartbeat_seconds * 1000);
    // node server time
    const pulse = setInterval(function emitpulse() {
        const newpulse = parseInt(new Date().getTime() /
            1000, 10);
        if (PULSE !== newpulse) {
            // without this "if" statement theres mysteriously 2 beats per sec
            // it might be called twice because of connection event, but keeping
            // this poller inside connection means that no polling happens when
            // nobody is connected. additional complexity hit but less noise
            PULSE = newpulse;
            console.log(PULSE);
            io.volatile.emit('pulsetime', new Date().getTime());
        }
    }, config.heartbeat_seconds * 1000);
    socket.on('disconnect', function() {
        clearInterval(pulse);
    });
});

module.exports.server = server;