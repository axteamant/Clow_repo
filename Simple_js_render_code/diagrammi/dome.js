
var kali=-1;
var kali1=-1;
var diagrams= {};
var ka;
function loadActualLay()
{
	new load().loadFile;

}
function save1(kali)
{
	
	diagrams[kali][0].globalid= kali;
	saved
	(	
		kali,
		diagrams,
		document.getElementById('saving'+ kali).value,
		true
	);
}
$(document).ready(function()
	{
		$("graphic").each
			(
			function()
				{	
					kali++;
					var newCanvas = $('<canvas/>',
					{
					 'id': 'myCanvas:' + kali                   
					}).prop({
								'width': '0',
								'height': '0',
								'style':'position:relative'
							 });
					$('canvas' + kali).append(newCanvas);	
					var button=$('<input/>').attr(
						{
							type: "button",
							id: 'CanvasButton:' + kali       ,
							value: 'save actual layout',
							onclick: 'save1(' + kali + ')'
						});			
					$('canvas' + kali).append(button);	
					var newStringNome=$('<input/>').attr(
						{
							type: "text",
							id: 'saving' + kali ,
							value:''      
						});
					$('canvas' + kali).append(newStringNome);
					$('canvas' + kali).append(button);	
					var newStringNome=$('<input/>').attr(
						{
							type: "button",
							id: 'loadCanvas' + kali ,
							value:'load actual layout',
							onclick: 'loadActualLay()'     
						});
					$('canvas' + kali).append(newStringNome);		
				
				})	
	});
$(document).ready(function()
	{
		var graphics = 
		{	
			"Java": new graphic(javaDiagram),
			"Sharp": new graphic(CScarpDiagram)
		}
		$("graphic").each
			(		
				function()
					{
						kali1++;
						var lenguage= 	graphics[$(this).attr('language')];
						lenguage.canvasCount= kali1;
						diagrams[kali1]=lenguage.render($(this).text(),kali1)
						lenguage._clear();
						$(this).html("");        
					}
			);	
	});
			
			
		
		