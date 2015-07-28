var express = require('express');
var router = express.Router();

var quizcontroller = require('../controllers/quiz_controller');
var commentcontroller = require('../controllers/comment_controller');
var sessioncontroller = require('../controllers/session_controller');

// Pagina de entrada (home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Pagina de creditos
router.get('/author', function(req, res) {
  res.render('author',{errors: []});
});

// Autoload de comandos
router.param('quizId', quizcontroller.load); // Autoload :quizId
router.param('commentId', commentcontroller.load); // Autoload :commentId

// Definicion de rutas de sesion
router.get('/login', sessioncontroller.new); // formulario login
router.post('/login', sessioncontroller.create); // crear sesion
router.get('/logout', sessioncontroller.destroy); // destruir sesion

// Definicion de rutas de /quizes
router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizId(\\d+)', quizcontroller.show);
router.get('/quizes/:quizId(\\d+)/answer', quizcontroller.answer);
router.get('/quizes/new', sessioncontroller.loginRequired, quizcontroller.new);
router.post('/quizes/create', sessioncontroller.loginRequired, quizcontroller.create);
router.get('/quizes/:quizId(\\d+)/edit', sessioncontroller.loginRequired, quizcontroller.edit);
router.put('/quizes/:quizId(\\d+)', sessioncontroller.loginRequired, quizcontroller.update);
router.delete('/quizes/:quizId(\\d+)', sessioncontroller.loginRequired, quizcontroller.destroy);

// Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentcontroller.new);
router.post('/quizes/:quizId(\\d+)/comments', commentcontroller.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessioncontroller.loginRequired, commentcontroller.publish);

module.exports = router;
