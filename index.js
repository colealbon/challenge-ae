'use strict';
/*eslint-env node, mocha, es6 */

const koa = require('koa'),
router = require('koa-route'),
views = require('co-views'),
serve = require('koa-static'),
parse = require('co-body'),
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

// BAD HABITS
var PRICE // current price of 1 sprocket
PRICE = (PRICE || 10) + ((Math.random() - .5) / 100) // random walk

var USER_CURRENCY;
USER_CURRENCY = (USER_CURRENCY || 100);
var USER_SPROCKETS;
USER_SPROCKETS = (USER_SPROCKETS || 0);

var TRADEHISTORY = [];

function* index() {
    this.body = yield render('index.swig', {
        'timestamp': new Date().getTime(),
        'app_name': config.app_name,
        'app_host': config.app_host,
        'http_port': config.http_port,
        'price': PRICE.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
        'tradehistoryjson': JSON.stringify(TRADEHISTORY),
        'amount_currency': USER_CURRENCY,
        'amount_asset': USER_SPROCKETS
    })
}
function* trade() {
    var postedcontent = yield parse.form(this);
    console.log(postedcontent);
    // see if they have enough money to do tx
    // flow control here is bad
    if (postedcontent.action === 'buy') {
        if ((postedcontent.amount) * PRICE > USER_CURRENCY) {
            postedcontent.amount = 0;
            postedcontent.action = 'insufficient funds';
        }
        if (postedcontent.unitprice < PRICE) {
            postedcontent.amount = 0;
            postedcontent.action = 'price changed in flight';
        }
    } else {
        if (postedcontent.amount > USER_SPROCKETS) {
            postedcontent.amount = 0;
            postedcontent.action = 'not enough sprocket';
        }
    }

    // update user account
    (postedcontent.action === 'buy') ?
        USER_SPROCKETS = (USER_SPROCKETS || 0) + parseInt(postedcontent.amount) :
        USER_SPROCKETS = (USER_SPROCKETS || 0) - parseInt(postedcontent.amount) ;
    (postedcontent.action === 'buy') ?
        USER_CURRENCY = (USER_CURRENCY || 100) - (postedcontent.amount * PRICE) :
        USER_CURRENCY = (USER_CURRENCY || 100) + (postedcontent.amount * PRICE) ;
    // add trade to history
    TRADEHISTORY.push({
            'time': new Date().getTime(),
            'action': postedcontent.action,
            'unitcnt': postedcontent.amount,
            'unitprice': PRICE
        })
    this.body = yield render('index.swig', {
        'timestamp': new Date().getTime(),
        'app_name': config.app_name,
        'app_host': config.app_host,
        'http_port': config.http_port,
        'price': PRICE.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
        'tradehistoryjson': JSON.stringify(TRADEHISTORY),
        'amount_currency': USER_CURRENCY.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
        'amount_asset': USER_SPROCKETS
    })
}

// ROUTES
app.use(serve(path.join(__dirname, 'public')));
app.use(router.get('/', index));
app.use(router.post('/', trade));

// WEB SERVER
const server = http.createServer(app.callback()).listen(
    config.http_port);

//SOCKET.IO SERVER
const io = require('socket.io')(server);
let PULSE = new Date().getTime(); // server side timestamp
io.on('connection', function(socket) {
    // lots of code that only runs when user is connected
    //send fake prices every 5 seconds
    setInterval( function fakeprice() {
        PRICE = (PRICE || 10) + ((Math.random() - .5) / 100)
        //console.log(PRICE);
         io.emit('price', {
                label: 'sprocket',
                price: PRICE,
                key: 'sprocket',
                source: 'fake',
                time: parseInt(new Date().getTime() / 1000, 10)
            });
    }, 5000);
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
            //console.log(PULSE);
            io.volatile.emit('pulsetime', PULSE);
        }
    }, config.heartbeat_seconds * 1000);
    socket.on('disconnect', function() {
        clearInterval(pulse);
    });
});

module.exports.server = server;
