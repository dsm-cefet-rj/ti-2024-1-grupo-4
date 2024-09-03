var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const {user} = require('../models/users');
const passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());

/**
 * @function
 * @description Função que retorna todos os usuários do banco de dados
 */
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

/**
 * @function
 * @description Função de delete de um usuário por id
 */
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

/**
 * @function
 * @description Função de atualização das informações de um usuário por id
 */

router.route('/:id')
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: false })
      .then((updatedUser) => {
        console.log(updatedUser)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(updatedUser);
      })
      .catch((err) => next(err));
});


/**
 * @function
 * @description Função de cadastro de um usuário
 */
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

/**
 * @function
 * @description Função de login de um usuário
 */
router.route('/login').options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.post('/login',cors.corsWithOptions,  passport.authenticate('local', {session : false}), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({_id: req.user._id, email: req.user.username, nome: req.user.nome, token: token, admin: req.user.admin, success: true, status: 'You are successfully logged in!'});
});

/**
 * @function
 * @description Função de atualização da senha de um usuário
 */
router.post('/change-password', cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
  const { SenhaAtual, SenhaNova } = req.body;

  try {
    const user1 = await user.findById(req.user._id);

    if (!user1) {
      return res.status(500).send('User not found');
    }
    user1.changePassword(SenhaAtual, SenhaNova, (err) => {
      if (err) {
        return res.status(400).json({msg:'A senha atual está incorreta, tente novamente!'});
      }

      res.send('Senha modificada com sucesso');
    });
  } catch (err) {
    res.status(500).json({msg:'Um erro ocorreu ao tentar modificar a senha'});
  }
});


module.exports = router;
