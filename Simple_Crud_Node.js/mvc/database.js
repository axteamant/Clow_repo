 var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'alex',
   database:'fumetto'
 });
connection.connect((error) => {
	(!!error)?
	console.log(error):console.log('Connected!:)');
	});  
module.exports = connection;
