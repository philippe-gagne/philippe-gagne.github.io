
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


function hideItems(){

	var s1 = document.getElementById("dietSelect");

	var elements = s1.elements;
	var restrictions = [];

	 for(var i=0, element; element=elements[i++];){
		 if (element.checked){
			 restrictions.push(element.value)
		 }
	 }

	var removedItems = restrictListProducts(products, restrictions);
	console.log(removedItems);

	let cards = document.getElementsByName("item-card");
	console.log(cards);

	for (i=0; i<cards.length; i++){

		if(removedItems.includes(cards[i].getAttribute('id').replace("-item-card", ""))){
			
			cards[i].style.display = "none";

		} else {
			cards[i].style.display = "block";
		}

	}

}


// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices() {

	document.getElementById('cart-tab').click()

    var s2 = document.getElementById("displayProduct");
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";

	// sorting algo taken from https://stackoverflow.com/questions/8092776/how-to-sort-list-of-dicts-in-js
	products.sort(function(first, second) {
		return first.price - second.price;
	   });
	//----------------------
		
	for (i = 0; i < products.length; i++) {
		
		// if(!removedItems.includes(products[i])){

			// create the item card
			var card = document.createElement("div");
			card.className = "item-card";
			card.id = products[i].name.concat("-item-card");
			card.setAttribute("name", "item-card");

			if(products[i].src != ""){
				var image = document.createElement("img");
				image.className="item-card-thumbnail";
				image.id=products[i].name.concat("-thumbnail");
				image.src=products[i].src;
				card.appendChild(image);
			}

			// add item name to card
			var name = document.createElement("h3");
			name.id = "item-name";
			name.innerHTML = products[i].name;
			card.appendChild(name);

			if(products[i].organic){
				var icon = document.createElement("img");
				icon.src="./assets/organic-logo.png";
				icon.className="organic-icon";
				icon.title="Certified Organic";
				card.appendChild(icon);
			}

			// add item price to card
			var price = document.createElement("h4");
			price.id = products[i].name.concat("-item-price");
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

			var addButton = document.createElement('button');
			addButton.className = "add-button";
			addButton.id = products[i].name.concat("-add-button");
			addButton.innerHTML = "Add";
			addButton.setAttribute('onclick', 'addItemToCart("'.concat(products[i].name, '")'));
			card.appendChild(addButton);

			// add card to page
			s2.appendChild(card);
			   
		// }
	}
}


function addItemToCart(name){

	var item = document.getElementById(name.concat("-item-card"));

	var c = document.getElementById('displayCart');

	var cartCards = document.getElementsByName("cart-card");
	console.log(cartCards);
	var t = document.getElementById("tally");
	var tally = 0;

	var inCart = false;
	var cartIndex;

	// Check if current tally is 0
	if(t.innerHTML == "Your cart is empty"){
		tally = 0;
	} else{
		tally = Number(t.innerHTML.split("$")[1]);
	}
	console.log("tally", tally);

	// Check if there are other items in the cart and if the added item is already in it
	if(cartCards != null){
		for (i=0; i<cartCards.length; i++){
			if(cartCards[i].querySelector("h3").innerHTML==item.querySelector("h3").innerHTML){
				inCart = true; 
				cartIndex = i;
			}
		}
	}

	var removeFrom;
	if(inCart){
		console.log
		if (Number(item.querySelector("input").value) == 0){
			// cartCards[cartIndex].querySelector("h4").innerHTML = 0;
			cartCards[cartIndex].remove();
		} else if (Number(item.querySelector("input").value) != 0){
			cartCards[cartIndex].querySelector("h4").innerHTML = "Quantity: ".concat(item.querySelector("input").value, ' x ', item.querySelector("h4").innerHTML);
			
		}
	} else if (Number(item.querySelector("input").value) != 0){

		// create the item card
		var card = document.createElement("div");
		card.className = "cart-card";
		card.id = item.querySelector("h3").innerHTML.concat('-cart-card');
		card.setAttribute('name', "cart-card");

		// add item name to card
		var name = document.createElement("h3");
		name.id = "item-name";
		name.innerHTML = item.querySelector("h3").innerHTML;
		card.appendChild(name);

		var quantity = document.createElement("h4");
		quantity.id = "item-quantity";
		quantity.innerHTML = "".concat(item.querySelector("input").value, ' x ', item.querySelector("h4").innerHTML);
		card.appendChild(quantity);

		c.appendChild(card);
	}

	tally = 0;
	if(cartCards != null){
		for (i=0; i<cartCards.length; i++){
			var vals = cartCards[i].querySelector("h4").innerHTML.split(" x $");
			tally = tally + Number(vals[0])*Number(vals[1]);
		}
	}

	tally = precisionRoundMod(tally, 2);

	if (tally != 0){

		t.innerHTML = "Your subtotal is $".concat(tally);

	}
	// console.log("tally ", tally);
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

// From: https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
function precisionRoundMod(number, precision) {
	var factor = Math.pow(10, precision);
	var n = precision < 0 ? number : 0.01 / factor + number;
	return Math.round( n * factor) / factor;
  }



