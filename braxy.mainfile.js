var arraynames = [];
	var arrayvalues = [];
	var variable = [];
	var values = [];
function go(){
	
	var vartags = document.getElementsByTagName("var");

	for(i=0;i<vartags.length;i++){

		variable.push(document.getElementsByTagName("var")[i].getAttribute("name"));
		values.push(document.getElementsByTagName("var")[i].getAttribute("value"));
	}

	var body_text = document.body.innerText;
	var t = body_text.split(" ");
	
	for(io=0;io<t.length;io++){

		if(t[io].substr(0,2)=="[@" && t[io].substr((t[io].length-1),t[io].length)=="]"){
			var varlen = t[io].search("=");
			variable.push(t[io].substring(2,varlen));
			values.push(t[io].substring(varlen+1,t[io].length-1));
			setinnerText(document.body.innerText.replace(t[io],""));
			
		}

	}
	
	 for(p=0;p<variable.length;p++){
	 	
	 	var tosearch = "#"+variable[p];
	 	
		if(body_text.indexOf(tosearch)!=-1){
		document.body.innerText=document.body.innerText.replace(tosearch,values[p]);
		
	}
	}
	
	}

	function evalnumeric(){
		var t = document.body.innerText.split(" ");
		for(x=0;x<t.length;x++){
		if(t[x].substr(0,2)=="${" && t[x].substr((t[x].length-1),t[x].length)=="}"){
			setinnerText(document.body.innerText.replace(t[x],eval(t[x].substring(2,t[x].length-1))));
		}
	}
	}
	function arrayrecog(){
		var t = document.body.innerText.split(" ");
		for(x=0;x<t.length;x++){
			alert(t[x]);
		if(t[x].substring(0,3)=="[@@" && t[x].substring((t[x].length-1),t[x].length)=="]"){
			//var varlen = t[x].search("=");
			
			arraynames.push(t[x].substring(3,t[x].search("=")));
			arrayvalues.push(eval(t[x].substring(t[x].search("=")+1,t[x].length-1)));
			setinnerText(document.body.innerText.replace(t[x],""));
		}
	}
	}
	function arraydeploy(){
		var t = document.body.innerText.split(" ");
		for(x=0;x<t.length;x++){
		if(t[x].substring(0,1)=="[" && t[x].substring((t[x].length-1),t[x].length)=="]"){
			//var varlen = t[x].search("=");
			var nameofarray = t[x].substring(1,t[x].length-1);
			var value = arraynames.indexOf(nameofarray);
			alert(value);
			setinnerText(document.body.innerText.replace(t[x],arrayvalues[value]));
		}
	}
	}
	arrayrecog();
	go();
	arraydeploy();
	evalnumeric();
	function setinnerText(text){
		document.body.innerText=text;
	}
	
