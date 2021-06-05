
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}


	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
    var s1 = document.getElementById(slct1);
    var s2 = document.getElementById(slct2);
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
	
	//make a list of restrictions based on slct1 contents
	var elements = s1.elements;
	var restrictions = [];

	 for(var i=0, element; element=elements[i++];){
		 if (element.checked){
			 restrictions.push(element.value)
		 }
	 }
	

	// obtain a reduced list of products based on restrictions
    var removedItems = restrictListProducts(products, restrictions);

	// sorting algo taken from https://stackoverflow.com/questions/8092776/how-to-sort-list-of-dicts-in-js
	products.sort(function(first, second) {
		return second.price - first.price;
	   });
	//----------------------
		
	for (i = 0; i < products.length; i++) {
		
		if(!removedItems.includes(products[i])){

			// create the item card
			var card = document.createElement("div");
			card.className = "item-card";
			card.id = "item-card";
			card.setAttribute("name", "item-card");

			if(products[i].organic){
				var icon = document.createElement("img");
				icon.src="./assets/organic-icon.png";
				icon.className="organic-icon";
				icon.title="Certified Organic";
				card.appendChild(icon);
			}

			// add item name to card
			var name = document.createElement("h3");
			name.id = "item-name";
			name.innerHTML = products[i].name;
			card.appendChild(name);

			// add item price to card
			var price = document.createElement("h4");
			price.id = "item-price";
			price.innerHTML = ("$").concat(products[i].price);
			card.appendChild(price);

			// add label for input box
			var label = document.createElement('label');
			label.for = "quantity";
			label.innerHTML = "Quantity: ";
			card.appendChild(label);

			// add input for quantity of items
			var inputBox = document.createElement('input');
			inputBox.type = "text";
			inputBox.name = "quantity";
			inputBox.id = "quantity";
			inputBox.value = "0";
			card.appendChild(inputBox);

			// add card to page
			s2.appendChild(card);
			   
		}
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	let cards = document.getElementsByName("item-card");
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	var t = document.getElementById("tally");
	var tally = 0;

	// build list of selected item
	for (i=0; i<cards.length; i++){

		if (cards[i].querySelector("input").value != 0){

			// create the item card
			var card = document.createElement("div");
			card.className = "item-card";
			card.id = "item-card";
			card.name = "item-card";

			// add item name to card
			var name = document.createElement("h3");
			name.id = "item-name";
			name.innerHTML = cards[i].querySelector("h3").innerHTML;
			card.appendChild(name);

			var quantity = document.createElement("h4");
			quantity.id = "item-quantity";
			quantity.innerHTML = "Quantity: ".concat(cards[i].querySelector("input").value);
			card.appendChild(quantity);

			var cost = document.createElement("h4");
			cost.id = "item-total-cost";
			cost.innerHTML = "Total Item Cost: $".concat(
				Number(quantity.innerHTML = cards[i].querySelector("input").value)*Number(cards[i].querySelector("h4").innerHTML.slice(1)));
			card.appendChild(cost);
			
			tally = tally + Number(quantity.innerHTML = cards[i].querySelector("input").value)*Number(cards[i].querySelector("h4").innerHTML.slice(1));

			c.appendChild(card);
		}
	}

	t.innerHTML = "Your cart subtotal is $"+tally;

}


