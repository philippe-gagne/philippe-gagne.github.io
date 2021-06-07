	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Lettuce",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		glutenFree: true,
		organic: true,
		price: 1.99,
		src: 'assets/item-images/lettuce.jpg'
	},
	{
		name: "Almond granola",
		dairyFree: true,
		nutFree: false,
		vegetarian: true,
		vegan: true,
		glutenFree: true,
		organic: true,
		price: 2.35,
		src: 'assets/item-images/almond-granola.jpg'
	},
	{
		name: "Salmon",
		dairyFree: true,
		nutFree: true,
		vegetarian: false,
		vegan: false,
		glutenFree: true,
		organic: false,
		price: 10.59,
		src: 'assets/item-images/salmon.jpg'
	},
	{
		name: "Strawberry yogurt",
		dairyFree: false,
		nutFree: true,
		vegetarian: true,
		vegan: false,
		glutenFree: true,
		organic: true,
		price: 3.39,
		src: 'assets/item-images/strawberry-yogurt.jpg'
	},
	{
		name: "Oat milk",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		glutenFree: true,
		organic: true,
		price: 4.49,
		src: 'assets/item-images/oat-milk.png'
	},
	{
		name: "Fuji apple",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		glutenFree: true,
		organic: false,
		price: 1.19,
		src: 'assets/item-images/apple.jpg'
	},
	{
		name: "Steak",
		dairyFree: true,
		nutFree: true,
		vegetarian: false,
		vegan: false,
		glutenFree: true,
		organic: true,
		price: 12,
		src: 'assets/item-images/steak.jpg'
	},
	{
		name: "Tortilla chips",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		glutenFree: true,
		organic: false,
		price: 3.25,
		src: 'assets/item-images/tortilla-chips.jpg'
	},
	{
		name: "White cheddar cheese",
		dairyFree: false,
		nutFree: true,
		vegetarian: true,
		vegan: false,
		glutenFree: true,
		organic: true,
		price: 6.49,
		src: 'assets/item-images/white-cheddar-cheese.jpg'
	},
	{
		name: "Whole coffee beans",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		glutenFree: true,
		organic: false,
		price: 14.49,
		src: 'assets/item-images/whole-coffee-beans.jpg'
	},
	{
		name: "Sourdough bread",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		glutenFree: false,
		organic: true,
		price: 5.29,
		src: 'assets/item-images/sourdough.jpg'
	}
];


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price
function restrictListProducts(prods, restrictions) {

	let product_list = JSON.parse(JSON.stringify(prods));
	let forRemoval = [];

	var organicOnly = document.getElementById("organic-switch").checked;

	for (let i=0; i<product_list.length; i+=1) {
		// console.log(product_list[i])
		if (restrictions.includes("lactose-intolerant") && (prods[i].dairyFree == false)){
			forRemoval.push(prods[i].name);
		}
		else if (restrictions.includes("nut-allergy") && (prods[i].nutFree == false)){
			forRemoval.push(prods[i].name);
		}
		else if (restrictions.includes("vegetarian") && (prods[i].vegetarian == false)){
			forRemoval.push(prods[i].name);
		}
		else if (restrictions.includes("vegan") && (prods[i].vegan == false)){
			forRemoval.push(prods[i].name);
		} else if (restrictions.includes("no-gluten") && prods[i].glutenFree == false){
			forRemoval.push(prods[i].name);
		} else if (organicOnly && (prods[i].organic == false)){
			forRemoval.push(prods[i].name);
		}
	}

	console.log("for removal ",forRemoval);

	// for(let x=0; x<forRemoval.length; x+=1){
	// 	let index = prods.indexOf(forRemoval[x])
	// 	product_list.splice(index, 1);
	// }
	// console.log("original list, ", prods);
	// console.log("return", product_list);
	return forRemoval;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
