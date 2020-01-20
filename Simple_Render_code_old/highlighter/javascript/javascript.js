var Jscript = new Language
(
		{"{":1, "}":-1, "};":-1},
        { 
            "keywords": [
                        "break","case"	,"implements"	,"boolean","catch"	,"interface","class"	
                        ,"let","const"	,"package","continue"	,"private","debugger"	,"protected"
                        ,"default","public","delete","static","do"	,"yield","enum","export","extends"	
                        ,"of","false","finally","for","function","if","import","in"	,"instanceof","new"
                        ,"null"	,"return","super","switch","this","throw","true","try","typeof"	,"var"
                        ,"void","while"	,"with"	,"if","break","case","catch","class","const","continue"
                        ,"debugger","default" ,"delete" ,"do","else","enum" ,"export" ,"extends" ,"false"
                        ,"finally","for","function","if","import","in","instanceof","new","null" ,"return",
                        "super","switch","this","throw","true","try","typeof","var","void","while","with"
                        ],
            "nully":"[x]",
            "comment":"[x]" 
        },
		{
            "keywords":
                new Transformation("keywords","<span class=keyword>[x]</span>"),
            "nully":
                new Transformation("nully", "[x]"),
             "comment" : 
            new Transformation("comment", "<span class=comment>[x]</span>")
         },
         {"'":"green","\"": "green" }   ,
         ["//"]
);