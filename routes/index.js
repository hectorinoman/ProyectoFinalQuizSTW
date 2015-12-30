var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' }); 
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/quizes/questions', quizController.questions);
router.get('/quizes/questions/:id', quizController.specificQuestion);

//Nuevas Rutas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizID(\\d+)', quizController.show);
router.get('/quizes/:quizID(\\d+)/answer', quizController.answer);

module.exports = router;