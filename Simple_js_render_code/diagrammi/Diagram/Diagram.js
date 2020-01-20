
class graphic
{
    constructor(Diagram,canvasCount)
    {
        this.Diagram=Diagram;
        this.Firme= [];      
        this.cont=0;
        this.RenderAll=[]
        this.can;
        this.OriginX=90;
        this.OriginY=90;
        this.radious= 90;
        this.canvasCount= canvasCount;
        this.resizeX= 250;
        this.resizeY= 250;
        
    }
    render(text)
    {
      return this. _Definer(text);
    }
    _Definer(text)
    {
       text=text.trim();
       var dafare="";
       var gate=false;
       var text1= text.split("\n")
       for(var j=0; j<text1.length; j++)
        {
            text1[j]=text1[j].trim();
            if(text1[j].startsWith("//")||text1[j].startsWith("--") )
            {
                continue;
            }
            for(var jk=0; jk<this.Diagram.keywords["definer"].length; jk++)
           {  
               var verifier= text1[j].split(this.Diagram.keywords["definer"][jk]);
               if(verifier.length>1)
               {
                    if(gate==true)
                    {
                        this._Objectgenerator(dafare);
                        dafare="";
                    }
                    gate=true;
                    }    
                }
                if(gate==true)
                {
                    dafare+=text1[j]+ "\n";
                }
        } 
        this._Objectgenerator(dafare);
        var canvas = document.getElementById("myCanvas:" + this.canvasCount);
        canvas.width = this.resizeX * this.Firme.length;
        canvas.height = this.resizeY * this.Firme.length;
        var ctx = canvas.getContext("2d");
            ctx.font = this.Diagram.font["font"];
            ctx.fillStyle = this.Diagram.font["fillStyle"];
        var img = document.getElementById(this.Diagram.images["backGround"]);
        var ALLlayOut = new layOut(this.Firme.length);
      ALLlayOut.polygon(
                            this.OriginX* this.Firme.length,
                            this.OriginY* this.Firme.length,
                            this.radious * this.Firme.length
                        );
        this.can=  new Canvas(this.Diagram);
        for(var j=0; j<this.Firme.length; j++)
        {
            this.Firme[j].x=  ALLlayOut.map[j]["x"];
            this.Firme[j].y=  ALLlayOut.map[j]["y"]
            this.can.CanvasSingle(
                                    this.Firme[j],
                                    this.Firme[j].x, 
                                    this.Firme[j].y,
                                    ctx,
                                    img
                                 );              
        } 
        this.can._relation(ctx,this.Firme);  
        return this.Firme;    
    } 
    _clear()
    {
        this.Firme=[];
    }
    _Objectgenerator(text)
    {
    var Firma1=[];
    var texy=text.split("\n");
    var Firma= texy[0].split(" ");
    for(var j=0; j<Firma.length; j++)
    {
        if(Firma[j].length>0)
        Firma1.push(Firma[j])
    } 
    var classe= new Classe(
       
        Firma1[0],
        Firma1[1],
        Firma1[2],
        Firma1[3],
        Firma[4],
        texy      
    );
	
    this.Firme.push(classe);
    }
    _containerFirma(Firma)
    {
        
        this.Firme.push(Firma)
        this.cont++;
    
        return Firma;
    }
}









