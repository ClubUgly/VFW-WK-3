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
	
	function storeData(key){
		//if there is no key, this means this is a brand new item and we need a new key
		if(!key){
			var id 			= Math.floor(Math.random()*100000001);		
		}else{
			//set the id to the existing key were editing so that it will save over the data
			//the key is the same key thats been passed along from the editSubmit even handle
			//to the validate function, and then passed here into the storeData function.
			id = key;
		}
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
		deleteLink.addEventListener("click", deleteItem);
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
			}else if(radios[i].value == "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('borndate').value = item.borndate[1];
		$('groups').value = item.group[1];
		$('quantity').value = item.quantity[1];
		$('comments').value = item.comments[1];
		if(item.terms[1] == "Yes"){
			$('terms').setAttribute("checked", "checked");
		}
		
		//remove the initial listener from the input save order button
		save.removeEventListener("click", storeData);
		//change submit button value to edit button
		$('submit').value = "Edit Order";
		var editSubmit = $('submit');
		//save the key value established in this function as a property of the edit submit event.
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you wish to delete this order?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Order was deleted!!!");
			window.location.reload();
		}else{
			alert("Order was NOT deleted.")
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
	
	function validate(e){
		//define elements we want to check
		var getFname = $('fname');
		var getEmail = $('email');
		var getBorndate = $('borndate');
		var getGroup =$('groups');
		
		//reset error messages
		errMsg.innerHTML = "";
		getFname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		getBorndate.style.border = "1px solid black";
		getGroup.style.border = "1px solid black";
		
		//get error messages
		var messageAry = [];

		
		//name validation
		if(getFname.value === ""){
			var fNameError = "Please enter your name.";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);		
		}
		
		//email validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		
		//DOB validation
		if(getBorndate.value === ""){
			var borndateError = "Please enter your birthday.";
			getBorndate.style.border = "1px solid red";
			messageAry.push(borndateError);		
		}		
		
		//group vailidation
		if(getGroup.value=="--Choose your can of beer--"){
			var groupError = "Please choose a beer.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
				
		//if there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);	
			}
			e.preventDefault();
			return false;
		}else{
			// if all is ok, save our data! send key value which came from the edit data function
			// remember this key value was passed through
			storeData(this.key);			
		}
	}
	
	//Variable defaults
	var beerSelection = ["--Choose your can of beer--", "Bud Light", "Bud Select", "Sam Adams Cherry", "Sam Adams October Fest", "Corona", "Corona Light", "Milwaukee's Best"],
		sexValue,
		termsValue = "No",
		errMsg = $('errors');	
	;
	makeCats();
	
	//Set Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);

});