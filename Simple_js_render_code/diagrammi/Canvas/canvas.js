class Canvas
{
    constructor(Diagram)
    {
        this.Diagram= Diagram;
        this.TipoDirelazione;
        this.Arrow=[];
       
    }
    CanvasSingle(Firma, x,  y, ctx, img)
    {  
        ctx.globalAlpha = 1;
        ctx.fillText("CLASSE : "+Firma.nomeClasse + "\n", x+10 ,y+40) 
        ctx.fillText("VISIBILITà : " + Firma.visibilità + "\n", x+10 ,y +80) 
        ctx.fillText("tipo parentela : "+Firma.parentela+ "\n", x+10 ,y + 120) 
        ctx.fillText("parente : "+Firma.Parentame+ "\n", x+10 ,y + 160)
        //ctx.arc(400,400,300, 0, 2 * Math.PI);
        ctx.lineWidth = "4";
        ctx.strokeStyle = "blue";
        ctx.strokeRect(x,y,this.Diagram.dimensioni["x"],this.Diagram.dimensioni["y"] )     
        ctx.globalAlpha = 0.3;
        ctx.drawImage(img, x, y,this.Diagram.dimensioni["x"],this.Diagram.dimensioni["y"]);    
        ctx.stroke();  
    }
    _relation(ctx, Firme)
    { 
        var cordinate={};
        for(var i =0; i<Firme.length; i++)
        {
            for(var j= 0; j<Firme.length; j++)
            {
                if(Firme[i].nomeClasse == Firme[j].Parentame)
                {  
                    this.TipoDirelazione= Firme[j].parentela;
                    cordinate=this.StartEndPoint(Firme[i].y,Firme[j].y,Firme[i].x,Firme[j].x)     
                    switch(this.segmatation( cordinate))
                    {
                        case 2:this.drawPath2(cordinate,ctx);  break;     
                        case 3:this.drawPath3(cordinate,ctx);  break;          
                    } 
                }
            }
        }
    }
    controlloPosizionamenoPAth3(Ax,Bx,Ay,By)
    {
        var scalarY;
        var scalarX;
        var lunghezza=this.lunghezza(Ax,Bx,Ay,By)
        scalarY= Ay>By ? Ay-lunghezza/2:Ay+lunghezza/2
        scalarX= Ax>Bx ? Ax-lunghezza/2:Ax+lunghezza/2
        return [scalarX,scalarY];
    }
    tratteggio()
    {
        if(this.TipoDirelazione== "implement") return 10;return 0;
    }
    drawPath3(cordinate,ctx)
    {
 
        var tt= this.controlloPosizionamenoPAth3(cordinate["Ax"],cordinate["Bx"],cordinate["Ay"],cordinate["By"] )
        var scaly= false;
        var scalarX= tt[0];
        var scalarY= tt[1];
        if(cordinate["start"]== "up"||cordinate["start"]== "down")scaly=true;   
        ctx.beginPath();
        ctx.setLineDash([this.tratteggio()]);  
        ctx.arrow( 
                        cordinate["Ax"],
                        cordinate["Ay"] ,
                        scaly==true?cordinate["Ax"]:scalarX,
                        scaly==true?scalarY:cordinate["Ay"]
                        , [0, 1, -10, 1, -20, 0]);
                     
        this.Arrow["1"]=[]                       
        ctx.arrow(scaly==true?cordinate["Ax"]:scalarX,
                        scaly==true?scalarY:cordinate["Ay"],
                        scaly==true?cordinate["Bx"]:scalarX,
                        scaly==true?scalarY:cordinate["By"]
                        , [0, 1, -10, 1, -20, 0]); 
        ctx.arrow( 
                        scaly==true?cordinate["Bx"]:scalarX,
                        scaly==true?scalarY:cordinate["By"],
                        cordinate["Bx"],
                        cordinate["By"]
                        
                            ,[0, 1, -10, 1, -20, 10]);  
       if(this.tratteggio()==0)ctx.fill();
        ctx.stroke();           
    }
    drawPath2(cordinate, ctx)
    {
        ctx.beginPath();  
        ctx.setLineDash([this.tratteggio()]);  
        ctx.arrow(cordinate["Ax"],cordinate["Ay"] ,cordinate["Bx"],cordinate["Ay"],[0, 1, -10, 1, -20, 0]);     
        ctx.arrow(cordinate["Bx"],cordinate["Ay"] ,cordinate["Bx"], cordinate["By"] ,[0, 1, -10, 1, -20, 10]);   
        if (this.tratteggio()==0) ctx.fill();
        ctx.stroke();             

    }
    segmatation(cordinate)
    {
        var x;
        switch(cordinate["end"])
        {
            case "left":x= cordinate["start"]!="right"?2:3;break;        
            case "right":x= cordinate["start"]!="left"?2:3;break;
            case "up":x= cordinate["start"]!="down"?2:3; break;          
            case "down":x= cordinate["start"]!="up"?2:3; break;          
        }
         return x
    }
    lunghezza(x1,x2,y1,y2)
    {
        var a =Math.abs( x1 - x2);
        var b =Math.abs( y1 - y2);
        var c = Math.sqrt( a*a + b*b )
        return c;
    }
    StartEndPoint(y1,y2,x1,x2)
    { 
        var A1={};
        var B1= {};
        A1= this.PuntiDAlorigine(x1,y1);
        B1= this.PuntiDAlorigine(x2,y2);
        return  this.puntiDefinitivi(A1,B1);
        }
    calcoloOrigine(x1,y1)
    {
        var  origineX1= x1 + this.Diagram.dimensioni["x"]/2;
        var origineY1= y1 + this.Diagram.dimensioni["y"]/2;
        return[origineX1,origineY1]
    }
    puntiDefinitivi(A, B)
    {
        var cordinate={};
        var lunghezza ;
        var max=  Number.MAX_SAFE_INTEGER;
        for(var i in A )
        {
            for(var k in B)
            {
                lunghezza=this.lunghezza(A[i]["x"],B[k]["x"],A[i]["y"],B[k]["y"])
                if(lunghezza<max)
                {
                    max= lunghezza;
                    cordinate["end"]= k 
                    cordinate["start"]= i;
                    cordinate["Ax"]= B[k]["x"]
                    cordinate["Ay"]= B[k]["y"]
                    cordinate["Bx"]=A[i]["x"]
                    cordinate["By"]=  A[i]["y"]    
                }
            }
        }
    return cordinate;
    }
    PuntiDAlorigine(x,y)
    {
        var mappaPunti= 
        {
            "up":{"x": x + this.Diagram.dimensioni["x"]/2, "y": y },
            "down":{"x": x + this.Diagram.dimensioni["x"]/2, "y": y+this.Diagram.dimensioni["y"] },
            "right":{"x": x + this.Diagram.dimensioni["x"], "y": y+this.Diagram.dimensioni["y"]/2 },
            "left":{"x": x , "y": y +this.Diagram.dimensioni["y"]/2 }
        }
    return mappaPunti;
    }     
}