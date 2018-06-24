var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getRate', function (request, response) {
  calc(request, response);
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

function calc(request, response) {
  var requestUrl = url.parse(request.url, true);

  console.log("Query parameters: " + JSON.stringify(requestUrl.query));

  // TODO: Here we should check to make sure we have all the correct parameters

  var option = requestUrl.query.option;
  var weight = Number(requestUrl.query.weight);

  computeTotal(response, option, weight);
}

function computeTotal(response, option, weight) {

  var cost = 0;

  if (option == "Letters (Stamped)") {
    if (weight <= 1) {
      cost = '0.50';
    } else if (weight <= 2) {
      cost = '0.71';
    } else if (weight <= 3) {
      cost = '0.92';
    } else if (weight <= 3.5) {
      cost = '1.13';
    } else {
      cost = '?';
    }
  } else if (option == "Letters (Metered)") {
    if (weight <= 1) {
      cost = '0.47';
    } else if (weight <= 2) {
      cost = '0.68';
    } else if (weight <= 3) {
      cost = '0.89';
    } else if (weight <= 3.5) {
      cost = '1.10';
    } else {
      cost = '?';
    }
  } else if (option == "Large Envelopes (Flats)") {
    if (weight <= 1) {
      cost = '1.0';
    } else if (weight <= 2) {
      cost = '1.21';
    } else if (weight <= 3) {
      cost = '1.42';
    } else if (weight <= 4) {
      cost = '1.63';
    } else if (weight <= 5) {
      cost = '1.84';
    } else if (weight <= 6) {
      cost = '2.05';
    } else if (weight <= 7) {
      cost = '2.26';
    } else if (weight <= 8) {
      cost = '2.47';
    } else if (weight <= 9) {
      cost = '2.68';
    } else if (weight <= 10) {
      cost = '2.89';
    } else if (weight <= 11) {
      cost = '3.10';
    } else if (weight <= 12) {
      cost = '3.31';
    } else if (weight <= 13) {
      cost = '3.52';
    } else {
      cost = '?';
    }
  } else if (option == "First-Class Package Service-Retail") {
    if (weight <= 1) {
      cost = '3.50';
    } else if (weight <= 2) {
      cost = '3.50';
    } else if (weight <= 3) {
      cost = '3.50';
    } else if (weight <= 4) {
      cost = '3.50';
    } else if (weight <= 5) {
      cost = '3.75';
    } else if (weight <= 6) {
      cost = '3.75';
    } else if (weight <= 7) {
      cost = '3.75';
    } else if (weight <= 8) {
      cost = '3.75';
    } else if (weight <= 9) {
      cost = '4.10';
    } else if (weight <= 10) {
      cost = '4.45';
    } else if (weight <= 11) {
      cost = '4.80';
    } else if (weight <= 12) {
      cost = '5.15';
    } else if (weight <= 13) {
      cost = '5.50';
    } else {
      cost = '?';
    }
  } else {
    // It would be best here to redirect to an "unknown operation"
    // error page or something similar.
    cost = '?';
  }

  cost = '$' + cost;

  // Set up a JSON object of the values we want to pass along to the EJS result page
  var params = {
    option: option,
    weight: weight,
    cost: cost
  };

  // Render the response, using the EJS page "result.ejs" in the pages directory
  // Makes sure to pass it the parameters we need.
  response.render('pages/result', params);

}