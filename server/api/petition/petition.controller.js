/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /petitions              ->  index
 * POST    /petitions              ->  create
 * GET     /petitions/:id          ->  show
 * PUT     /petitions/:id          ->  update
 * DELETE  /petitions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');
var apiUrlBase = 'https://api.mongolab.com/api/1/databases/civicstarter/collections/Petition';
var key = '?apiKey=9rLkL7jBXiss089QQhpDsvrsKZjegWW1';

// Get list of things
exports.index = function(req, res) {

  request(apiUrlBase + key, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var petitions = JSON.parse(body);
      res.json(200, petitions);
    }
  });
};

// Get a single thing
exports.show = function(req, res) {

  request(apiUrlBase + '/' + req.params.id + key, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var petition = JSON.parse(body);
      res.json(200, petition);
    }
  });

  // Thing.findById(req.params.id, function(err, thing) {
  //   if (err) {
  //     return handleError(res, err);
  //   }
  //   if (!thing) {
  //     return res.send(404);
  //   }
  //   return res.json(thing);
  // });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Thing.create(req.body, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, thing);
  });
};

// // Updates an existing thing in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Thing.findById(req.params.id, function (err, thing) {
//     if (err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     var updated = _.merge(thing, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, thing);
//     });
//   });
// };

// // Deletes a thing from the DB.
// exports.destroy = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     thing.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}