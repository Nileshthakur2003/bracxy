
var glob=document.body.innerHTML;
var mod_html="";
alert(glob);
var ids={
    assgn:{start:"[@",end:"]"},
    dlvr:{start:"#"},
    tag:{start:"(@",end:")"}
};
var triggers={
    vars:false,
    val:false,
    dlvr:false,
    tag:false
}
var vars=[[],[]];
var tags=[[],[]];
var current={
    v:"",
    val:"",
    tag:"",
    
};
var dtp={
    input:"id"
};
var temp={a:0,b:0};
function clearTemp(){temp.a=0;temp.b=0}

function process_tag(tag){
    
    var rTag=tag.split(":");
    for(part in rTag){
      rTag[part]=  rTag[part].replace(ids.tag.start,"");
       rTag[part]= rTag[part].replace(ids.tag.end,"");
        
    }
    
    var elem = document.createElement(rTag[0]);
    
    if(rTag[1].search(";")!=-1) {
    var tempo=[];
       var rfnt=rTag[1].slice(1,rTag[1].length-1);
       var ptr= rfnt.split(";");
       console.log(ptr);
       for(x in ptr){
           tempo=ptr[x].split("=");
           elem.setAttribute(tempo[0],tempo[1]);
       }
    }else if(rTag[1]==""){
    
    /// do nothibg
    
    }else{
        var rfmt=rTag[1].slice(1,rTag[1].length-1)
        var tres=rfmt.split("=");
        elem.setAttribute(tres[0],tres[1])
    }
    
   if(rTag.length>=3){  elem.innerHTML=rTag[2].slice(1,rTag[2].length-1);
}
    return elem;
}


function off(trigger){
    trigger=false;
}

function on(trigger){
    trigger=true;
}

function read(gl){

    for (x in gl) {
    var p=eval(x);
    
       if(phrase(p,2,gl)==ids.assgn.start) {
           triggers.vars=true;
           temp.b=x;
       }
      
       
       if(triggers.vars){
           if(gl[x]=="]"){
             console.log("aaignment_error: expected '='");
             triggers.vars=false;
             current.v="";
           }else if (gl[x]=="=") {
               triggers.vars=false;
               triggers.val=true;
           }else{
           current.v+=gl[x];
           } 
       }
       
       if (triggers.val) {
           if(gl[x]=="]"){
            document.body.innerHTML=document.body.innerHTML.replace(glob.substr(temp.b,x-temp.b+1,""),"");
            temp.b=0; vars[0].push(current.v.replace("[@",""));
             vars[1].push(current.val.replace("=",""));



             current.v="";
             current.val="";
             triggers.val=false;
               
           }else{
           current.val+=gl[x];
           } 
       }
       
      
      if(phrase(p,2,gl)==ids.tag.start) {
           triggers.tag=true;
           temp.a=p;
       }
       
       if(triggers.tag){
           
          if (gl[x]==")") {
              triggers.tag=false;
              alert(current.tag);
              
              tags[0].push(current.tag);
             tags[1].push({
            start:temp.a,
            end:eval(x)
             });
              
               
              
              clearTemp();
              current.tag="";
              
           }else{
           current.tag+=gl[x];
           } 
       }
           
       }
      
      
 }

 
function phrase(x,length,content) {
x=eval(x);
    return content.substring(x,x+length);
    
}

read(glob);

for(var i=0;i<tags[0].length;i++){
  var text = tags[0][i].substr(1,tags[0][i].length-1);
     alert(text);
  var port=traverse(document.querySelector(" body"),text);
  alert(port.nodeName);
  port.appendChild(process_tag(tags[0][i]));
             
          
};

/*function scan_for_text(arr){
    var body= document.querySelector("body");
    var 
    for c in arr{
        
    }
}
*/
function traverse(node,searchText){
if(node.nodeName!="#text"){
   var p= node.innerText.search(searchText);
   if(p!=0){
       return node;
   }else{
       if(node.hasChildNodes()){
       var t= node.childNodes;
           for(var nt=0;nt<t.length;nt++){
               traverse(node.childNodes[nt],searchText);
           }
       }
   }
  }else{
      var p= node.nodeValue.search(searchText);
   if(p!=0){
       return node;
   }else{
       if(node.hasChildNodes()){
       var t= node.childNodes;
           for(var nt=0;nt<t.length;nt++){
               traverse(node.childNodes[nt],searchText);
           }
       }
   }
  }
}

function removeInputVariables(){
var before= document.body.innerHTML;
    for(var x=0;x<=vars[0].length;x++){
    
    
       before= before.replaceAll("#"+vars[0][x],vars[1][x]);
       alert(before);
       ;
        
    }
    document.body.innerHTML=before;
}


console.log(document.body.innerHTML);



removeInputVariables();
