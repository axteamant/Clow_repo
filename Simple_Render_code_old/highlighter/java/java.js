var java = new Language 
(
		{"{":2, "}":-2, "};":-2},	//indentation									,
        { 
            "keywords":["return","static","void","abstract"],
            "variabile":["int", "double","String","String[]","int[]", "double[]","boolean", "char","class","extends","implements","throws","throw","Map","HashMap"],
            "property": ["private","public","protected","package","import"],
            "iferazioni":["if","else","switch","case","for","do","while","try", "catch","break","break;","default","new"],
            
            "nully":"[x]",  
            "comment":"[x]" 
        },//kwywords
		{
            "keywords":
                new Transformation("keywords","<span class=keyword>[x]</span>"),
            "variabile":
                new Transformation("variabile","<span class=variabili>[x]</span>"),
            "property":
                new Transformation("property","<span class=property >[x]</span>"),
            //  new Transformation("literal", "[x]"),
            "nully":
                new Transformation("nully", "[x]"),
            "iferazioni":
                new Transformation("iferazioni", "<span class= iferazioni>[x]</span>"),
            "comment" : 
                 new Transformation("comment", "<span class=comment>[x]</span>")
           
         },//transformation
         {"'":"green","\"": "green" } ,// elementInside
         ["//"] //commentDefiner
);