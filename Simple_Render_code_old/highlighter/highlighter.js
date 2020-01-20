class HighLighter
	{
		constructor(language)
		{
			this.language 	= language;
            this.rientro=0;	
            this.content=0;	
        }
        _Indentetion(row)
        {
           
            var T=this.rientro;
            var X= "";
            row= row.trim(); 
            
         
                for(var j=0; j<row.split("(TAB)").length; j++)
                {
                    for(var k=0;k<6; k++)
                    X+="&nbsp;" ;
                   row= row.replace("(TAB)","")
                }
            
            for(var Map in this.language.indentation)
            {
                if(row== Map)
                {
                    this.rientro+= this.language.indentation[Map];
                    if(this.rientro<T)
                    T=this.rientro;       
                }
                for(var k=0;k<T;k++)
                {
                    X+="&nbsp;";
                }
            }
			return X+ row;
        }
        _transform(row)
		{
           
           
			var tokens = this._tokenize(row);
            
            var nrow = "";
			for(var k=0;k<tokens.length;k++)
                nrow+=this.language.transformations[tokens[k].category]
                                                .render(tokens[k].value)+" ";
            
            nrow+"<br/>";
            
	    	return nrow;
		}
		render(code, scope, highlights)
		{	
           
			(!scope) && (scope=[]);
			var rows = code.split("\n");
            var res = "<br>"+"<br>";
           // res= "<table class=tableCode style=width:100%>"
			for(var i=0;i<rows.length;i++)
		    	{
                    rows[i]= rows[i].trim();
                    if(rows[i]=="")
                    {
                        continue;
                    }
                    this.content++;
                    var j="";
                    if( this.content<10)
                    j="0";
					var nrow = this._Indentetion(this._transform(rows[i]));
                    res+=
                  //  "<tr>"+
                        //        "<td >"+
                                "<div class= numerazioneCodice> "+j+ this.content + "</div>"
                        //       "</td>"+ 
                               
                        //      "<td> "
                            +" <div class=coderow>"+ nrow+  "</div><br>"
                         //       "</td>"+
                    //"</tr>";
                }   
            // res+="</table>"
             this.content=0;
             this.rientro=0;
            
			var res = this.block(res.replaceAll("\""+ "&quot;" ).replaceAll("'","&lsquo;") +"<br>");
     
			return 	this.language.postRender 		?
					this.language.postRender(res) 	:
					res;
        }
        _tokenize(row)
        {
            var parts= [];
           
            if(row.startsWith(this.language.commentDefiner[0])) //da rifattorizzare 
            {
               
                parts.push({"value":row,"category": "comment"});
             
                return parts;
            }
            
            var k=row.split(" ") 
            for(var i=0; i<k.length; i++)
                {
                    var kex="nully";
                    for (var key in this.language.transformations) 
                        {
                            if(key=="nully")
                            continue;       
                            if(this.language.keywords[key].includes(k[i]))
                            {   
                                kex=key;
                                continue;    
                            }      
                        }   
                    parts.push({"value": k[i], "category":kex})   
                    var kex="nully";          				
                }
               
        return parts;
        }
        blockOld(content)
        {
            var map= this.language.elementinside;
            var j=0
            for (var carattere in map) 
                {
                    var j=content.split(carattere);
                    var all="";
                    for(var k=0;k<j.length; k++ )
                    {
                        if(!(k%2==0))
                            j[k] = "<span style=color:"+ map[carattere] + ">"+carattere +j[k] +carattere +"</span>"  
                        all+=j[k];
                    }
                content= all;
                }
                
        return all
        }		     
        block(content)
        {
           
            var map= this.language.elementinside;
            var j=0
            var lines = content.split("<div class=coderow>");
            
            for(var i=0;i<lines.length;i++)
            {
                lines[i]= "<div class=coderow>"+ lines[i];
               
                if((lines[i].split(this.language.commentDefiner[0]).length<=1))
                { 
                for (var carattere in map) 
                {
                    var j=lines[i].split(carattere);
                    var all="";
                    for(var k=0;k<j.length; k++ )
                    {
                        if(!(k%2==0))
                            j[k] = "<span style=color:"+ map[carattere] + ">"+carattere +j[k] +carattere +"</span>"  
                        all+=j[k];
                
                    }          
                   lines[i]= all;
                }
            }
            }
            var res = "";
            for(var i=0;i<lines.length;i++ )
            res+=lines[i];
            
        
                
        return res;
        }		     
        
    }
class Language
{
		//keywords è un vettore di trasformazioni
	constructor(indentation,keywords, transformations,elementinside,commentDefiner,postRender)
	{
        this.indentation 	= 
								indentation 	?
								indentation		:
                                {"{":5, "}":-5, "};":-5};
		this.keywords 		= keywords;
        this.transformations = transformations;
        this.elementinside=elementinside
        
        this.commentDefiner=commentDefiner;
		this.postRender = postRender;
	}
}
class Transformation
{
		constructor(category,template)
		{
			this.category = category;
			this.template = template;
		}
		render(value)
		{
            var r= this.template.replace("[x]", value);		   
            return r;
		}
}