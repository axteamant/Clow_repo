var database= require('./database')
var result = [];
var SelectQuery='SELECT * FROM  [table]' ;
var InsertQuery='insert into comics(titolo,numero,editore) values (\'[titolo]\',\'[numero]\',\'[editore]\')';
var SearchQuery ='SELECT * FROM comics  where [vincolo] like \'[parola]\'' ;
var killQuery='delete from comics where id = [id]'
var select = (table,callback) => {
database.query(SelectQuery.replace('[table]',table),(err, res, fields) => {
	result=[];
    if (err) return callback(err)
    if(res.length)
    for(var i = 0; i<res.length; i++ )result.push(res[i]);
    callback(null, result);
	});
}
var add = (req,callback) => {
	result=[];
	database.query(InsertQuery.replace('[titolo]',req['titolo'])
							  .replace('[numero]',req['numero'])
							  .replace('[editore]',req['editore']), 
							  ( err ) => { err ? callback ( err ) : callback( null ) });
}
var addTable = (req, callback) =>
{
	database.query(" create table bolla( id int)" ,( err ) => { err ? callback(err) : callback(null) });
}
var search = (req,callback) => {
database.query(SearchQuery.replace('[vincolo]',req['vincolo']).replace('[parola]', req['parola']), (err, res, fields) => {
	result=[];
    if (err)  return callback(err);
    if(res.length)for(var i = 0; i<res.length; i++ )result.push(res[i]);callback(null, result);
	});
}
var kill= (req,callback) => {
	database.query(killQuery.replace( '[id]',req['id']), (err, res, fields) =>
	{if (err) return callback(err); callback( null)  ;});	
}
exports.DAO = {'kill' : kill, 'search' : search , 'add' : add , 'select' : select}