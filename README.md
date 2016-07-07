# Code Challenge (AE)
skills test from the Scottsdale area

### installation
* ```git clone https://github.com/colealbon/challenge-ae.git;```  
* ```cd challenge-ae;```  
* ```npm install;```  
* ```cp config/options.js.example config/options.js;```  
* ```npm test;``` or ```mocha --ui=tdd --harmony test``` (optional)
* ```node index;```

### issues
* flow control for account checks are risky,  need to use koa2/await instead of koa generators
* we are accepting decimals for sprockets, user can pay for less than 1 sprocket and still get the full sprocket.
* react.js is not set up properly like this http://www.phpied.com/reactive-table/
