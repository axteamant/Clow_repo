


class layOut
{
    
    constructor(numPoints)
    {
        this.npoints= numPoints
        this.map;
    }   
    polygon(x, y, radius)
    {
        var index=-1;
        var mappy= [];
        var sx=0;
        var sy =0;
        var angle = 360 / this.npoints;
        for(var a = 0; a < 360; a += angle) 
        {
            index++;
            sx = x+ Math.sin(a * Math.PI / 180) * radius ;
            sy = y +  Math.cos(a * Math.PI / 180) * radius;
            mappy[index]={ "x": sx, "y": sy };
        }
        this.map= mappy;
    }
      
}




