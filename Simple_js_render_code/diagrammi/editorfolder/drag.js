var k=-1;
function TOsave(view)
{

    console.log(view.globalid)
    var all=[];
    for(var i in view)
    {
       
       var classe= $('#' + i);
      
       view[i].x=classe.css('left').substring(0, classe.css('left').length-2)-50;
       view[i].y=classe.css('top').substring(0, classe.css('top').length-2)-50;
      
    }
    all[0]= view;
    saved(0,all,"canvas"+ view[0]["globalid"],false);
}
function kill(classi)
{
    var j=-1;
    for(var i in classi)
    {
        j++;$('#'+j).remove();
    }
    $(".DIA").remove();  
}

function renderDIA(classi)
{
    drowAllLine(classi)
    refrash();
   for(var i in classi)
    {
        k++;
        $("<img  id= " + k  + " class='bl pink' src=img.jpg></img>").appendTo('#dia')
        .css(
            {
                top: classi[i].y+50, 
                left: classi[i].x+50,
                position:'absolute'
            })
        .draggable();
    } 
    
   k=-1;
}
/*$("<rect  id= " + k  +" ></rect>").appendTo('#Arrows')
.css(
    {
        top: classi[i].y+ 100, 
        left: classi[i].x+100,
        width: 100,
        height:100,
        position:'absolute', 
    })
*/ 
    
function refrash()
{
    $("body").html($("body").html());
}
function drowAllLine(classi)
{
    $('#dia').append("<svg id= Arrows class= DIA  width=5000 height=5000></svg>")
    $('#Arrows').append("<line class=DIA id =line0 x1=50 y1=50 x2=350 y2=350 stroke=black/>");
}
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
    $(this).on("mouseup", function (e)
     { 
        try
        {
            pos1= $("#0").position();
            pos2=$("#1").position();
            console.log(pos1.left)
            $("#line0").attr('x1', pos1.left)
            .attr('y1', pos1.top)
            .attr('x2', pos2.left)
            .attr('y2', pos2.top);
        }catch(error){}
});

