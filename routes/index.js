var express = require('express');
var router = express.Router();

var quizcontroller = require('../controllers/quiz_controller');

// Pagina de entrada (home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Pagina de creditos
router.get('/author', function(req, res) {
  res.render('author');
});

// Autoload de comandos con :quizId
router.param('quizId', quizcontroller.load);

// Definicion de rutas de /quizes
router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizId(\\d+)', quizcontroller.show);
router.get('/quizes/:quizId(\\d+)/answer', quizcontroller.answer);
router.get('/quizes/new', quizcontroller.new);
router.post('/quizes/create', quizcontroller.create);

module.exports = router;
