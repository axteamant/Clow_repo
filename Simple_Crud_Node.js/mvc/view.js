var bind = require('bind')
var errors= {'err': null};
exports.viewList=(err, result,res) => {


	errors.err= err;
	bind.toFile('mvc/tpl/list.html',
	{
		fumetti:result,errori:errors},(data) => {		
								res.writeHead(200, {'Content-Type': 'text/html'});
								res.end(data);
	});
}
