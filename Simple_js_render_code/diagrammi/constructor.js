class Classe 
{
    constructor(visibilità,tipo,nomeClasse, parentela,Parentame, MapContenuto)
    {
        this.visibilità= visibilità;
        this.tipo=tipo;
        this.nomeClasse= nomeClasse;
        this.parentela=parentela;
        this.Parentame= Parentame;
        this.MapContenuto= MapContenuto;
        this.x="";
        this.y="";
        this.globalid;
    }

}
class Diagram
{
	constructor(keywords, graphs,visiblity, dimensioni, font,images)
	{
        this.keywords=keywords
        this.graphs= graphs
        this.visiblity=visiblity
        this.dimensioni= dimensioni;
        this.font= font;
        this.images= images;
	}
}
class graph
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
