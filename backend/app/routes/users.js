var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const {user} = require('../models/users');
const passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());

router.route('/').get(async function (req, res, next) {
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
router.route('/:id')
  .delete((req, res, next) => {
    user.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Usuário Deletado', response });
      })
      .catch((err) => next(err));
});

router.route('/:id')
  .put((req, res, next) => {
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



router.post('/signup', (req, res, next) => {
  user.findOne({ username: req.body.username })
    .then(existingUser => {
      if (existingUser) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: 'Usuário já existe' });
      } else {
        user.register(
          new user({ username: req.body.username, nome: req.body.nome, admin: req.body.admin }),
          req.body.password,
          (err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({ err: err });
            } else {
              passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: 'Sucesso no Registro' });
              });
            }
          }
        );
      }
    })
    .catch(err => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err.message });
    });
});


router.post('/login', passport.authenticate('local', {session : false}), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});


router.get('/logout',(req,res) => {
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    var err = new Error('Voce nao esta logado');
    err.status = 403;
    next(err);
  }
})


module.exports = router;
