var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var userController = require('../controllers/user_controller');

var sessionController = require('../controllers/session_controller');

var commentController=require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []}); 
});

router.param('quizId', quizController.load); 
router.param('commentId', commentController.load);
router.param('userId', userController.load);  // autoload :userId

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión


router.get('/user',  userController.new);     // formulario sign un
router.post('/user',  userController.create);     // registrar usuario
router.get('/user/:userId(\\d+)/edit',  sessionController.loginRequired, userController.edit);     // editar información de cuenta
router.put('/user/:userId(\\d+)',  sessionController.loginRequired, userController.update);     // actualizar información de cuenta
router.delete('/user/:userId(\\d+)',  sessionController.loginRequired, userController.destroy);     // borrar cuenta


//Nuevas Rutas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:new', sessionController.loginRequired, quizController.new);
router.post('/quizes/:create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',  //USO INCORRECTO DE GET, DEBERÍA SER UN PUT porque se modifica la BBDD
	           sessionController.loginRequired, commentController.publish);



module.exports = router;
