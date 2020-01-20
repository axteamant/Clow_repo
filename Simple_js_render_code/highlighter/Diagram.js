
class graphic
{
    constructor(Diagram)
    {
        this.Diagram=Diagram;
    }
    render(text)
    {
        return this.Diagram.graphs["keywords"].render(text);
    }

}
class Diagram
{
	constructor(keywords, graphs)
	{
        this.keywords=keywords
        this.graphs= graphs
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






