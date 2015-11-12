var Quiz = require('../models/quiz_model');

var quiz = new Quiz();
var current = quiz.randomQuestion();

exports.question = function(req,res) {
  current = quiz.randomQuestion();
  res.render('quizes/question', {pregunta: current.pregunta});
};

exports.answer = function(req, res) {
  var c = 'Incorrecto';
  if (current.respuesta(req.query.respuesta)) { c = 'Correcto'; }
  res.render('quizes/answer', {respuesta: c})
};

exports.questions = function(req,res) {
  var nPreg = quiz.numQuestions();
  var array = new Array(nPreg);

  for(var i=0; i<nPreg; i++) {
    array[i] = (quiz.getQ(i));
  }

  res.render('quizes/questions', {prg: array})
};

exports.specificQuestion = function(req, res) {
  var id = req.params.id;
  var nPreg = quiz.numQuestions();

  if(id < 1 || id > nPreg){
    res.render('quizes/SpecificQuestion', {prg: "No existe esa pregunta."})
  }
  else if(isNaN(id) === true) {
    res.render('quizes/SpecificQuestion', {prg: "Error en la URL."})
  }
  else {
    current = quiz.q[id-1];
    res.render('quizes/question', {pregunta: current.pregunta});
  }
};