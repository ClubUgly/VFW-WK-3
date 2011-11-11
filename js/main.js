    //John Williams
    //November 10, 2011
    //VFW Deliverable 3
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
			var linksLi = document.createElement('li');
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
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/links for each item in local storage.
		}
	}
	
	// make item links
	//create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit signle item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Order";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add a line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Order";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show the forum
		toggleControls("off");
		
		//populate the form fields with current localStorage values.
		$('fname').value = item.fname[1];
		$('email').value = item.email[1];
		$('url').value = item.url[1];
		var radios = document.forms[0].sex
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && itme.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('borndate').value = item.borndate[1];
		$('groups').value = item.groups[1];
		$('quantity').value = item.quantity[1];
		$('comments').value = item.comments[1];
		if(item.terms[1] == "Yes"){
			$('terms').setAttribute("checked", "checked");
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