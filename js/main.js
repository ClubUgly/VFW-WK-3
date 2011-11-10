    //John Williams
    //November 3, 2011
    //VFW Deliverable 2
    //Online Beer Store

//alert("JavaScript works!");

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
//	alert(localStorage.value(0));

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=beerSelection.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = beerSelection[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//find value of selected radio buttons.
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}
	
	function getCheckboxValue(){
		if($('terms').checked){
			termsValue = $('terms').value;
		}else{
			termsValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('beerForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('beerForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "inline";
				$('items').style.display = "none";				
				break;
			default:
				return false;		
		}
	}
	
	function storeData(){
		var id 			= Math.floor(Math.random()*100000001);
		// collect all form field values and store in an object
		// object properties contain array with the form label and input value
		getSelectedRadio();
		getCheckboxValue();
		var item 			= {};
			item.fname		= ["Name:", $('fname').value];
			item.email		= ["Email:", $('email').value];
			item.url 		= ["Home Page:", $('url').value];
			item.sex		= ["Sex:", sexValue];			
			item.borndate 	= ["Date of Birth:", $('borndate').value];
			item.group	 	= ["Beer Type:", $('groups').value];
			item.quantity	= ["Quantity:", $('quantity').value];
			item.comments 	= ["Additional Info:", $('comments').value];
			item.terms 		= ["TOS:", $('terms').termsValue];
			//save data into local storage: Use Stringify to convert our object to string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Shopping Info Saved!");	
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data stored.");
		}
		//write data from local storage to the browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by usig JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("Shopping order is deleted!");
			window.location.reload();
			return false;
		}
	}
	
	//Variable defaults
	var beerSelection = ["--Choose your can of beer--", "Bud Light", "Bud Select", "Sam Adams Cherry", "Sam Adams October Fest", "Corona", "Corona Light", "Milwaukee's Best"],
		sexValue,
		termsValue = "No"	
	;
	makeCats();
	
	//Set Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

});