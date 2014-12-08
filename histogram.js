// var plotly = require('plotly')('username','apiKey');

// var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
// var graphOptions = {fileopt : "extend", filename : "nodenodenode"};

// plotly.plot(data, graphOptions, function (err, msg) {
//     console.log(msg);
// });

var plotly = require('plotly')('imshivs','xno4z8y59z');

var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
// var graphOptions = {fileopt : "extend", filename : "nodenodenode"};

plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});