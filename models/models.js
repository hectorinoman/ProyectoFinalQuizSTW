var path = require('path');

var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=(url[6]||null);
var user=(url[2]||null);
var pwd=(url[3]||null);
var protocol=(url[1]||null);
var dialect=(url[1]||null);
var port=(url[5]||null);
var host=(url[4]||null);
var storage =process.env.DATABASE_STORAGE;


//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
		{dialect: protocol,
		protocol: protocol,
		port : port,
		host: host,
		storage: storage,
		omitNull:true
		}
	);

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));


var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

var user_path = path.join(__dirname,'user');
var User = sequelize.import(user_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

Quiz.belongsTo(User);
User.hasMany(Quiz);

// exportar tablas
exports.Quiz = Quiz; 
exports.Comment = Comment; 
exports.User = User;

//sequelize.sync() crea e inicia tabla de preguntas en la base de datos
sequelize.sync().then(function() {
	User.count().then(function (count) {
		if(count === 0) {
				User.bulkCreate([ {username: 'admin',   password: '1234', isAdmin: true},
           		{username: 'pepe',   password: '5678'} // el valor por defecto de isAdmin es 'false'
          		]).then(function(){
         			console.log('Base de datos (tabla user) inicializada');
         			Quiz.count().then(function (count){
           				if(count === 0) {   // la tabla se inicializa solo si está vacía
             				Quiz.bulkCreate( 
               					[ {pregunta: 'Capital de Italia',   respuesta: 'Roma', UserId: 2}, // estos quizes pertenecen al usuario pepe (2)
                 				  {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', UserId: 2}
               					]
           					).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
           				};
         			});
       			});
		};
	});
});