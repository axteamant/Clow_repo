var CScarpDiagram= new Diagram
(
        { 
            "definer":["class","interface"],
            "visibility":["public"],
            "parents":["extends","implements"]    
        },
		{
            "keywords":
                new graph("definer","<container class=keyword>[x]</container>"),
            "variabile":
                new graph("parents","<span class=variabili>[x]</span>"),
            "nully":
                new  graph("nully", "[x]")
        },
        null,
        {"x": 200, "y":200},
        {"font": "15px Arial","fillStyle": "black" },
        {"backGround":"C#BG"}
);

