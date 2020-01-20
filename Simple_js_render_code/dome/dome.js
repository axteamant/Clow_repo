String.prototype.replaceAll = function(search, replacement) 
			{
				var target = this;
				return target.split(search).join(replacement);
			};

			String.prototype.equals = function(b) 
			{
				return this==b;
			};

			String.prototype.belongsto = function(v) 
			{
				for(var i=0;i<v.length;i++)
					if(this==v[i]) return true;
				return false;
			};
			function tab(rientro)
			{
				var res = "";
				for(var i=0;i<rientro;i++)
					res+="&nbsp;";
				return res;
			}
			function renderJavaObject(ogg)
			{
				var state = ogg.attr('state').split(",");
				var name= ogg.attr('name');
				
				if(name=="null")
					return "<table border=0 width='100%'><tr><th colspan="+state.length+">"+name+"</th></tr></table>";
				
				var res = "<table border=0 cellspacing=0 width='100%'><tr><th colspan="+state.length+">"+name+"</th></tr>";
				res+="<tr>"
				for(var i=0;i<state.length;i++)
				{
					var label = state[i].split(":")[0];
					if(label.indexOf("(")>0) label = "<span class=method>"+label+"</span>";
					res+="<td>"+label+"</td>";
				}
				res+="</tr>";
				res+="<tr>"
				for(var i=0;i<state.length;i++)
				{
					var v= state[i].split(":")[1];
					v = v ?
						(state[i].split(":")[0].indexOf("(")>0 ? "<span class='method'>"+v+"</span>" : v) :
						" ";
					res+="<td>"+v+"</td>";
				}
				res+="</tr>";
				res+="</table>";
				return res;
			}
			var tl = 5;
			$(document).ready(function()
			{
				$("javaObject").each(function()
				{
					$(this).html(renderJavaObject($(this)));
				});
				
				var highlighters = 
				{
					"sql": new HighLighter(SQL),
					"Java": new HighLighter(java),
					"JavaScript": new HighLighter(Jscript),
					"HTML":new HighLighter(HTML)
				}
				
var kali=-1;
var kali1=-1;
$(document).ready(function()
				{
					$("graphic").each
					(
					
					function()
						{	kali++;
							
							var newCanvas = $('<canvas/>',{
								 'id': 'myCanvas:' + kali                   
							 }).prop({
								 'width': '0',
								 'height': '0',
								 'style':'position:relative'
							 });
			 $('canvas' + kali).append(newCanvas);		}
				);		
				});				
$(document).ready(function()
				{
					var graphics = 
					{
						
					//	"sql": new graphic(SQL),
					"Java": new graphic(javaDiagram),
					"Sharp": new graphic(CScarpDiagram)
					}
			
					$("graphic").each
						(
							
						function()
							{
								kali1++;
								console.log(kali1)
								var lenguage= 	graphics[$(this).attr('language')];
								lenguage.canvasCount= kali1;
								$(this).html
								(
									lenguage.render
																				(
																				$(this).text()
																				,kali1
																				)
																				
								);        
							}
						);	
				});
				$(".code, CODE").each
					(
					function()
						{
							
							$(this).html
							(
								highlighters[$(this).attr('language') ? $(this).attr('language'): "Java" ].render
																			(
																			$(this).text()
																			) 
							);        
						}
					);
				
			
		
			
				
			});
			
			
		
		