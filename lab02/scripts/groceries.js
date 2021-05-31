	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Lettuce",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		organic: true,
		price: 1.99
	},
	{
		name: "Almond granola",
		dairyFree: true,
		nutFree: false,
		vegetarian: true,
		vegan: true,
		organic: true,
		price: 2.35
	},
	{
		name: "Salmon",
		dairyFree: true,
		nutFree: true,
		vegetarian: false,
		vegan: false,
		organic: false,
		price: 10.59
	},
	{
		name: "Yogurt",
		dairyFree: false,
		nutFree: true,
		vegetarian: true,
		vegan: false,
		organic: true,
		price: 3.39
	},
	{
		name: "Oat milk",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		organic: true,
		price: 4.49
	},
	{
		name: "Apple",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		organic: false,
		price: 1.19
	},
	{
		name: "Steak",
		dairyFree: true,
		nutFree: true,
		vegetarian: false,
		vegan: false,
		organic: true,
		price: 12
	},
	{
		name: "Tortilla chips",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		organic: false,
		price: 3.25
	},
	{
		name: "Cheddar cheese",
		dairyFree: false,
		nutFree: true,
		vegetarian: true,
		vegan: false,
		organic: true,
		price: 6.49
	},
	{
		name: "Coffee",
		dairyFree: true,
		nutFree: true,
		vegetarian: true,
		vegan: true,
		organic: false,
		price: 14.49
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
			forRemoval.push(prods[i]);
		}
		else if (restrictions.includes("nut-allergy") && (prods[i].nutFree == false)){
			forRemoval.push(prods[i]);
		}
		else if (restrictions.includes("vegetarian") && (prods[i].vegetarian == false)){
			forRemoval.push(prods[i]);
		}
		else if (restrictions.includes("vegan") && (prods[i].vegan == false)){
			forRemoval.push(prods[i]);
		} else if (organicOnly && (prods[i].organic == false)){
			forRemoval.push(prods[i]);
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
