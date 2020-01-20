
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
				

			
			var id=-1;
				var tn = 0;
				var index = "";
				$(".title").each(function()
				{
				
					var testo = $(this).text();
					var testoA=testo;
					if(tn>0) testo = "<span class='number'><A name= " +tn+"></A>"+(tn<9? "0" + (tn+1) : (tn+1))+ "&nbsp;" + "</span> "+testo;
					
                        tn++;	id++;
                        if(testoA.trim()!="Introduzione")
					index += "<div class= indice >"+(tn<10 ? "0"+tn : tn) 
					+ "&nbsp;"+"<A style='color :rgb(52, 8, 247)' HREF= #"+id+">"
					+"<style='font-size:24px' class='fas'>&#xf04e;</A>&nbsp;" +testoA+"</div>";
					
					$(this).html(testo);
					
				});
				
				$("#index").html(index);
			
			

			
				
			});
			
			
		
		