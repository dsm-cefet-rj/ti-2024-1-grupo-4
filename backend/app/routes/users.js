var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const {user} = require('../models/users');
const passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());

router.route('/').options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, async function (req, res, next) {
      user.find({})
            .then(
              (usersBanco) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(usersBanco);
              },(err) => next(err))
              .catch(
                (err) => next(err)
              );
});
router.route('/:id').options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    user.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Usuário Deletado', response });
      })
      .catch((err) => next(err));
});

router.route('/:id')
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
      .then((updatedUser) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(updatedUser);
      })
      .catch((err) => next(err));
});



router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  user.register(new user({username: req.body.username, nome: req.body.nome}), req.body.password, 
  (err, user) => {
      if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
      } else {
          passport.authenticate('local')(req, res, () => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({success: true, status: 'Registration Successful!'});
          });
      }
  });
});

router.route('/login').options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.post('/login',cors.corsWithOptions,  passport.authenticate('local', {session : false}), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({_id: req.user._id, token: token, admin: req.user.admin, success: true, status: 'You are successfully logged in!'});
});



module.exports = router;
