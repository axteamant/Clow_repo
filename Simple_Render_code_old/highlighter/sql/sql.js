var SQL = new Language
(
		{"(":2, ")":-2, ");":-2},
        { 
            "keywords": [
                    "select","insert","update","delete","innerjoin","left","right",
                    "join","in","from","where","having","group","by",
                    "union","into","values","set","drop","trucate"
                        ]  ,
            "nully":"[x]"
        },
		{
            "keywords":
                new Transformation("keywords","<span class=keyword>[x]</span>"),
            "nully":
                new Transformation("nully", "[x]"),
         },
         {"'":"green","\"": "grey" },
         ["--"]
);
