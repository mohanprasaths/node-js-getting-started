var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var dataBaseConfig = {
   "host": "ec2-54-235-95-102.compute-1.amazonaws.com",
  "port": 5432,
  "database": "d6om08jbohqqjd",
  "user": "lgrvccnnwiaopb",
  "password" : "zaV5HFLYTtmGcmBFOG6dE0pubM",
      ssl: true


}
//var connectionString = 'postgres://postgres:a@localhost:5432/namesboard';
var connectionString = 'postgres://lgrvccnnwiaopb:zaV5HFLYTtmGcmBFOG6dE0pubM@ec2-54-235-95-102.compute-1.amazonaws.com:5432/d6om08jbohqqjd'
var db = pgp(dataBaseConfig);

function getAllNames(req,res,next){
	console.log("inside db func")
 db.any('select * from namesboard')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data.reverse(),
          message: 'Retrieved ALL puppies'
        });
    })
	.catch(function(err){
		console.log(err)
	})
}

function putName(req,res,next){
	
	db.none("insert into namesboard(name) values($1)",req.body.name).then(function(){
		res.status(200).json({
			status : "Success",
			message : "inserted"
		})
	})
}

module.exports = {
	getAllNames : getAllNames,
	putName : putName
}