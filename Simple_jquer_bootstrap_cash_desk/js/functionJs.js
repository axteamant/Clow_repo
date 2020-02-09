//				"class": 'prodotto  paginator col-md-' +variabili_Ambiente['selettori_md']+
//							' col-sm-'+ variabili_Ambiente['selettori_sm']+
//							' col-xs-' + variabili_Ambiente['selettori_xs'],


var Lista_prodotti_to_buy =[];

var buy= ()=>
{
	console.log(Lista_prodotti_to_buy);
	var myCsv="";
	for(var i=0; i< Lista_prodotti_to_buy.length; i++)
		 myCsv+= Lista_prodotti_to_buy[i]["nome"] + "\n";
	 window.open('data:text/csv;charset=utf-8,' + escape(myCsv));
}
var dati_prova={"frutta" :[
{"nome":"banane" },{"nome":"fragole" },{"nome":"lamponi" },{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"banane" },
{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" },{"nome":"fragole" },
{"nome":"lamponi" },
{"nome":"mele" }
], "verdura":[
				{"nome":"zucchina"}, {"nome":"carota"}
			],
		"altro1":[
				{"nome":"zucchina"}, {"nome":"carota"}
			],
			"altro2":[
				{"nome":"zucchina"}, {"nome":"carota"}
			]}
var numero_totale= "";
var index=0;
 $(document).ready(function()
{
var visualizza_tipi= ()=>
{
	for (var i in dati_prova)
		{
			try
			{
			$('<div/>', {
			"class": 'selettore_prodotti_barra col-xs-4',
			tipo:i,
			text: i	
		}).appendTo('#selettore_tipologia_prodotti');
			}catch(err){}
		}
}	
visualizza_tipi();
	var manager =(campo, tipologia) =>
	{
	
		$( '#prodotti' ).empty();
		for(var i=campo*variabili_Ambiente['number_element']; i<campo*variabili_Ambiente['number_element']+variabili_Ambiente['number_element'] -2; i++)		
		{
		try
		{
			$('<div/>', {
				id: i,
				"class": 'prodotto col-md-'+ variabili_Ambiente['prodotto_md'] +
						' col-sm-'         + variabili_Ambiente['prodotto_sm']+
						' col-xs-'         + variabili_Ambiente['prodotto_xs'],
				text: 'Prodotto nome : '+  dati_prova[tipologia][i]["nome"]  + ' !'
		}).appendTo('#prodotti');
		}catch(err)
		{
				$('<div/>', {
					id: i,
					"class": 'prodotto col-md-'+ variabili_Ambiente['prodotto_md'] +
							' col-sm-'         + variabili_Ambiente['prodotto_sm']+
							' col-xs-'         + variabili_Ambiente['prodotto_xs'],
					text:''}).appendTo('#prodotti');
		}
		}
			$('<div/>', {
			id: "cambio_maggiore",
			"class": 'prodotto  paginator col-md-3 col-sm-3 col-xs-3',
			text: 'pagina +!'	
		}).appendTo('#prodotti');
			$('<div/>', {
				id: "cambio_minore",
				"class": 'prodotto paginator col-md-3 col-sm-3 col-xs-3',
				text: 'pagina - !'		
		}).appendTo('#prodotti');
			$("#cambio_maggiore").click(function()
			{
			console.log("funziona"+ index)
			console.log(index* variabili_Ambiente['number_element'])
			console.log(dati_prova[tipologia].length -2)
			if(index* variabili_Ambiente['number_element']<( dati_prova[tipologia].length -variabili_Ambiente['number_element']-2)  )
			{
				index+= 1;
				manager(index,tipologia)
			}
			});
		$("#cambio_minore").click(function()
		{
			if(index!=0)
			{	index-=1;
				manager(index ,tipologia)
				
			}
		});
		$(".prodotto").click(function()
		{
			var prodotto= dati_prova[variabili_Ambiente.tipo_prodotti][$(this)[0].id];
			Lista_prodotti_to_buy.push(prodotto)
			var prodotto_ordine=$('<div/>', {
				"class": 'prodotto_ordine col-md-12 col-sm-12 col-xs-12 row' ,
				id:"prodotto_kart" + Lista_prodotti_to_buy.length-1,
				text: 'Prodotto nome : '+ prodotto["nome"]  + ' !'
			})
			prodotto_ordine.appendTo('.contenitore_ordine');
		
				console.log(
				dati_prova[variabili_Ambiente.tipo_prodotti][$(this)[0].id])	
		});
	}

	$(".numero").click(function()
	{
		adder($(this).text())	
	}
	);
	$(".operatore").click(function()
	{
		console.log(numero_totale)
		numero_totale= "";
	}
	);
	$(".selettore_prodotti_barra").click(function()
	{
		variabili_Ambiente.tipo_prodotti=($(this)[0].attributes[1].value);
		manager(0,variabili_Ambiente.tipo_prodotti)	
	});
	for(var i in dati_prova)
	{ variabili_Ambiente.tipo_prodotti=i;
	manager(0, i); break;}
});
function adder( numero)
{
	numero_totale+=numero;
}
var variabili_Ambiente=
{
	"tipo_prodotti":"",
	"number_element": 20,
	"prodotto_md":3,
	"prodotto_sm":4,
	"prodotto_xs":6,
	"selettori_pg_md":3,
	"selettori_pg_sm":6,
	"selettori_pg_xs":6
}