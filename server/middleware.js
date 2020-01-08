const Promise = require('bluebird')

exports.api = function (fn) {
  return async function (req, res, next) {
    Promise
      .resolve(fn(req.method == 'GET' ? req.query : req.body, req.session, req.files))
      .then((data) => res.send(data))
      .catch(next);
  }
}
