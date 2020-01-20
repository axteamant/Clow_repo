var javaDiagram= new Diagram
(
        { 
            "definer":["class","interface"],
            "parents":["extends","implements"],
            "nully":"[x]"
        },
		{
            "keywords":
                new graph("definer","<span class=keyword>[x]</span>"),
            "variabile":
                new graph("parents","<span class=variabili>[x]</span>"),
            "nully":
                new  graph("nully", "[x]")
        }
);


