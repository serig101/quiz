var models = require('../models/models.js');

// GET /quizes/statistics
exports.show = function(req, res) {
  var estadistica = {
    quizzesTot : ['Número de preguntas', 0],
    commentsTot: ['Número de comentarios totales', 0],
    commentsAverage: ['Número medio de comentarios por pregunta', 0],
    quizzesNoComment: ['Número de preguntas sin comentarios', 0],
    quizzesComment: ['Número de preguntas con comentarios', 0]
  }

  models.Quiz.count()
  .on ('success', function(quizzesCount){
    estadistica.quizzesTot[1]= quizzesCount;})
  .then( function(c){
    models.Comment.count()
    .on('success',function(commentsCount){
        estadistica.commentsTot[1] = commentsCount;})
      .then( function(c) {
        console.log("cuento quizzes with include " + new Date().toString());
        models.Quiz.count({where: '"Comments"."QuizId" IS NULL', include: [{ model: models.Comment}]})
        .on ('success', function(cuenta){
            estadistica.quizzesNoComment[1] = cuenta;
            estadistica.quizzesComment[1] = estadistica.quizzesTot[1] - estadistica.quizzesNoComment[1];
            if ( (estadistica.quizzesTot[1] > 0)  && (estadistica.commentsTot[1] > 0) ) {
              estadistica.commentsAverage[1] = estadistica.commentsTot[1] / estadistica.quizzesTot[1]
            }
          }
        )
        .then( function(c) {
          console.log("render statistic/show");
          res.render('statistics/show', { statistic: estadistica, errors: []})
        })
      })
    })
  .catch(function (err) { errors.push(err); })
};
