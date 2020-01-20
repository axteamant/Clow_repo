//Da deprecare, non funziona
var HTML = new Language
(
		{"(":2, ")":-2, ");":-2},
        { 
            "keywords": ["<br>", "</br>", "<b>", "</b>" ]  ,
            "nully":"[x]"
        },
		{
            "keywords":
                new Transformation("keywords","[x]"),
            "nully":
                new Transformation("nully", "[x]"),
         },
         {"'":"green","\"": "grey" },
         ["--"],
		 function(rendered)
		{
			return 	rendered
					.replaceAll("<br>", "&lt;")
					.replaceAll(">","&gt;")
					.replaceAll("\n", "<br>");
		}
);

