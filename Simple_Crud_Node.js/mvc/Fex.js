var dao = require('./dao');
var view = require('./view');
var uccidi = (req,res,chian) => 
{
	dao.DAO.kill(req.query, (err, result) => 
	{
		(err)&&(err=errors.db);
		lista(req,res,err)
	})	
}
var lista = (req,res,error) => 
{
	dao.DAO.select('comics',(err, result) =>
		{
			(err)&&(err=errors.db)
			view.viewList(err, result,res)
		})	
}
var add = (req,res) =>
{
	dao.DAO.add(req.query,(err, result) => 
	{
		(err)&&( err=errors.db);
		lista(req,res,err)
	})
}
var createTable= (req,res)=>
{
	dao.DAO.addTable(req.query, (err) =>
	{
		if(err) err= errors.sq;
	})
}
var cerca = (req,res) => {
dao.DAO.search(req.query, (err, result) =>
	{
		if(err)
		view.viewList(errors.qr, result,res)
		else
		{
			if(result.length==0)
			err= errors.sq
		view.viewList(err, result,res)
		}
		});
}
exports.actions = { 'kill' : uccidi , 'list' : lista , 'add' : add , 'cerca' : cerca,'createTable': createTable};
var errors={
	'db': 'Database error!',
	'qr': 'query error feald unmatched',
	'sq': 'no result found'
};


