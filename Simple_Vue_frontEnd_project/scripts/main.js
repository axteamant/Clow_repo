/*
total price
*/
var totalPrice=0;
/*
current currency
*/
var Valuta="$"
document.getElementById("currency").textContent=Valuta
/*
declaration of all product variable
*/
var products;
/*
	number of elements for page
*/
var Product_Footer_Count=6;
/*
	max of number before "..."
*/
var Number_of_Footer_Element=3;
/*
global Index
*/
var Global_page_index;
/*
	Map <"Name of List", Vector[product]>
*/
var Lists= {"WishList":[],"CartList":[]}
/*
	template of product in List_items (no bags one)
*/
var product_main_template=
 ` <li class="product-list__item ">
					<article class="product" itemscope itemtype="http://schema.org/Product">
                            <figure class="product__image-wrapper"> 
                                <img v-bind:src= product.product_immage class="product__image"  alt="Product" itemprop="image"/>
                                <button 
								
								v-on:click="wishlist(product)"
								class="product__wishlist-button button button--round button--wishlist">
                                    <svg class="icon" width="20px" height="20px" viewBox="0 6 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <title>Wishlist Icon</title>
                                        <polygon id="Wishlist-Icon" stroke="none" fill-rule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                                    </svg>
                                </button>
                            </figure>
                            <div class="product__details">
                                <h1 class="product__title" itemprop="brand">{{ product.product__details }}</h1>
                                <p class="product__subtitle" itemprop="description">{{ product.product__subtitle }}</p>
                                <div class="product__price" itemscope itemtype="http://schema.org/Offer">
                                   <span class="product__price--strike">  `  +Valuta + `{{ product.product__price__strike }}</span><span class="product__price--discounted" itemprop="price">
									 `  +Valuta + `{{ product.product__price__discounted }}</span>
                                </div>
                             </div>
                         <button v-on:click="addtocart(product)" class="product__add-to-cart button button--primary">Add to Cart</button>
						
                        </article>
				</li>
  `
  /*
	template of product in List_items (bags one)
*/
var Product_Wish_Cart_template= `
		<div class="Content_shop" >
		  <img v-bind:src= product.product_immage class="Content_shop_immage"  alt="Product" itemprop="image" >
		  <div class= "left">
		  <button v-on:click="remove__Product_List(product)" class="product__add-to-cart button button--primary" >&#x2715;</button>
			</div>
			<br>
			
			
			</div>
			<p>
			
		</div>
		
`
/*
	template of products list  (bags one)
*/
function Parmetric_List_Cart(type)
{
	return (
	`	
			<div id="example-1"  @focusout= "destroy" tabindex="-1"  style=" outline:0;"class="rende_tent 
 " > <div style=" font-size:200%; text-align: center;">
	`	+ (type!='WishList'?'CartList ': 'WishList')+`	
			</div>
			<div>
			<li v-for="product in products"  >` +Product_Wish_Cart_template +  ` </li>
			` + (type!='WishList'?`	
				<button  class="Content_shop product__add-to-cart button button--primary " style=" height:15%;   font-size:200%; padding-bottom: 15px; " >
				` + Valuta  + '  ' +  document.getElementById("bag__price").textContent+ `
			</button>
			`: '' ) +`
			</div>
			</div>
	`)

		
}
/*
oyher div possible
<div class="text_al">
			{{ product.product__price__strike }}
		<h2> <font face="Verdana" size="5" color="green">
		{{ product.product__details }}
		</font>
		</div>
*/
/*
	template pagination
*/
var custom_list_index_template=
`
			<ul  id="example-2" class="pagination__list" >
					  <li v-for=" item in items " class="pagination__item">
					       <a :href="pagesHref(item)" @Click= "switchPage(item)" class="pagination__link" >
							{{ item  +1  }}
                            </a>
					  </li>
				</ul>
`
/*
	template container of Product_List (no bags one)
*/
var  template_example_1;
function button_enabler(bool)
{
	for( var button in document.getElementsByTagName("button"))
			document.getElementsByTagName("button")[button].disabled=bool;		
}
function blur (name)
{	
	document.getElementById("blur").setAttribute("class",name)
}
/*
	Destroy beg container
*/
function destroy ()
{
	try
	{
	document.getElementById("example-1").remove()
	document.getElementById("DestroyWindows").remove()
	}catch (err) {}
	 blur ("")
		document.getElementsByTagName("main").add
		button_enabler(false)
		
}
/*
	@Param idTodel destroy element with that id
	@Param idToCreate create element afther id name
	@Param template to insert
*/
function create(idTodel, idToCreate, template)
{
	try{document.getElementById(idTodel).remove()} catch(err){console.log("non funziona")}
	document.getElementById(idToCreate).insertAdjacentHTML( 'afterBegin',
	template);
}
/*
	switch Page 
	@Param index index of the new page 
*/
function switchPage(index)
{
	
	var max=Math.ceil(products.length/Product_Footer_Count);
	console.log(index)
	switch(index)
	{
		case 'first':
		create('example-2','custom_list_index',custom_list_index_template)
		try{
		document.getElementById("middle").removeAttribute("hidden")
		document.getElementById("last_selection").setAttribute("hidden",false)
		}catch(err){}
		index=0;
		Show_Pagination_Footer(index)
		break;
		case 'down':
			if( Global_page_index!=0)
			index= Global_page_index-1
			else
				index=0;
		break;
		
		case 'up':
			if( Global_page_index!=max-1)
		index= Global_page_index+1 
		else
			index=max-1;
		break;
		case 'last':
		//da rivedere il destroy()
			render_Item_Main(max-1)
			create('example-2','custom_list_index',custom_list_index_template)
			index= max- Number_of_Footer_Element -2 ;
			Show_Pagination_Footer(index, Number_of_Footer_Element)
			document.getElementById("last_selection").removeAttribute("hidden")
			document.getElementById("middle").setAttribute("hidden",false)
			return
			
		break;
		case 'more':
		//TODO
		return;
		
	}
			Global_page_index=index;
			render_Item_Main(index)
}

var max;
/*
	render Pagination 
	@Param index need it to some logic 
*/
function Show_Pagination_Footer(index)
{

var x=[] ;
	max = Math.ceil(products.length/Product_Footer_Count);
	if(max<= Number_of_Footer_Element +2 )
	{	
	for(j=1; j<max-1; j++)
			x[j-1]= j
		try{
		document.getElementById('last_selection').remove()
		document.getElementById('middle').remove()
		document.getElementById("firstPage").removeAttribute("hidden")
		document.getElementById("lastPage").removeAttribute("hidden")
		}catch(err){console.log(err)}
	}
else
	for(var k=0; k<Number_of_Footer_Element; k++)
	{
		x [k]= k+index + 1
	}

	if(x.length>=Product_Footer_Count)
	{		
		var y = document.getElementsByClassName("Arrow_bottom");	
			for( var j=0  ; j< y.length; j++)
			{
				y[j].removeAttribute("hidden")
			}
	}
	
	 new Vue({
		  el: '#lastPage',
		  data: {
			max: max 
				} ,
		methods: 
  {
	  pagesHref: function (index) {
                    return "#page=" + index.toString();
                }
  }
				});
var example2 = new Vue({
	el: '#example-2',
	  data: {
		items: x
  },
  methods: 
  {
	  pagesHref: function (index) {
                    return "#page=" + index.toString();
                },
		switchPage: function(index)
		{
			switchPage(index)
		}	
  }
})
	
}
/*
	show Template of that time of list (beg calls)
*/
function ShowList(type)
{
	
	var products= Lists[type]
	if(products.length==0)
	{alert( " Is empty " +  type)
			return
	}
	if(products.length>0)
	{	
		blur("blur")
		button_enabler(true)
		console.log(Parmetric_List_Cart(type))
		create("example-1" ,"tent", Parmetric_List_Cart(type))
		new Vue({
	  el: '#example-1',
	   props: {
		product: Object
	  },
	  data: {
			products
	  },
	   methods: {
		remove__Product_List:function(pr)
		{
			for(var i=0; i< products.length; i++)
			{	
			if(products[i]==pr)
			{
					Lists[type].pop(i)
						Counter(type=="WishList"?	
						 "item__counter__wish":del(pr),-1)	
					break;
				}			
			}
			if(products.length==0)
				destroy();	
		},
			destroy: function() {
				destroy()
}
		}
	})
	document.getElementById("example-1").setAttribute('autofocus', 'autofocus')
	}	
}
/*
	Refresh value of products price
*/
function del(pr)
{
	
	Counter("bag__price",-pr.product__price__discounted)
	 return "item__counter__bag"
}
/*
	counter of price
*/
function Counter(id , many)
{
var span = document.getElementById(id);

span.textContent=parseInt(span.textContent) + many
totalPrice=parseInt(span.textContent)
}
/*
	products scafolding
*/
	products = [
  
    {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 1",
    product__subtitle:"..........",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details:"PGGGGG 1",
    product__subtitle:"pagina 1",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 1",
    product__subtitle: "pagina 1",
    product__price__strike: 50,
	product__price__discounted:40
  },
  
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 1",
    product__subtitle: "pagina 1",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 1",
    product__subtitle: "pagina 1",
    product__price__strike: 50,
	product__price__discounted:40
  },
  {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 2",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
    {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 2",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 2",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "pagina 2",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
  
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "pagina 2",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  }
  ,
  {

    product_immage: "images/activity_image.jpeg",
    product__details: "pagina 2",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
    {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 3",
    product__subtitle: "PGGGGG 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 3",
    product__subtitle: "PGGGGG 3",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 3",
    product__subtitle: "PGGGGG 3",
    product__price__strike: 50,
	product__price__discounted:40
  },
  
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 3",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 3",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 3",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
  
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 4",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  }
  ,
  {

    product_immage: "images/activity_image.jpeg",
    product__details:"PGGGGG 4",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
    {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 4",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 4",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
     {

    product_immage: "images/activity_image.jpeg",
    product__details:"PGGGGG 4",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  },
  
     {

    product_immage: "images/activity_image.jpeg",
    product__details: "PGGGGG 4",
    product__subtitle: "pagina 2",
    product__price__strike: 50,
	product__price__discounted:40
  }
]
/*
	Vue component ( list of product main)
*/
Vue.component('product-component', {
  template: 
  product_main_template,
  props: {
    product: Object
  },
  methods: {
  addtocart: function (product) {
	Lists["CartList"].push(product)
	Counter("item__counter__bag",1);
	Counter("bag__price",product.product__price__discounted);
    },
	wishlist: function(product)
	{
	Lists["WishList"].push(product)
	Counter("item__counter__wish",1);
	
	}
}
});
/*
	render all Products in main (no bag)
*/
function render_Item_Main(index)
{
	
	var prodRender= [];
	var count =-1;
	create("app_List","list_product_main", 
	  `<ul class="product-list" id="app_List">
							  <product-component  v-for="product in products" :product="product"  />
                </ul>
	  `)
	try{
		
	for(var i =index*Product_Footer_Count; i< index*Product_Footer_Count + Product_Footer_Count; i++)
	{
		count++;
		if(products[i]!=undefined)
		prodRender[count]= products[i];
	}
	}catch (err) {}
	console.log(prodRender)
	 new Vue({
	  el: '#app_List',
	  data: {
		products:prodRender
	  }
	  
})
}
/*
___________________________________________
	Inizialize page 0 
*/
if(!Global_page_index)
{
	Global_page_index=0;
	render_Item_Main(Global_page_index)
}
Show_Pagination_Footer(0)
/*

*/
