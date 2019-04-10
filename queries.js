var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var dataBaseConfig = {
   "host": "ec2-184-73-210-189.compute-1.amazonaws.com",
  "port": 5432,
  "database": "d38j30d90hmn0t",
  "user": "labwmhfuefaski",
  "password" : "4dadfccb1b1eb34507a58063fe96681702ce2ec3735175ecc99c33c8a99ff555",
      ssl: true


}
//var connectionString = 'postgres://postgres:a@localhost:5432/namesboard';
var connectionString = 'postgres://labwmhfuefaski:4dadfccb1b1eb34507a58063fe96681702ce2ec3735175ecc99c33c8a99ff555@ec2-184-73-210-189.compute-1.amazonaws.com:5432/d38j30d90hmn0t'
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