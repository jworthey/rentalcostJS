//Jeffrey Donald Worthey
//5-8-14
//Optional lab assignment
//CIS 122 Software Design
//Instructor Goodman

	//Constant variables based on the current price of the items avalible
	var chainSawPerDay = 20;
	var lawnMowerPerDay = 15;
	var trimmerPerDay = 10;
	var chipperPerDay = 30;
	var diffItems= 0;
	
	//Variable for the amount of each tool rented
	var amtChainSaw;			
	var amtLawnMower;
	var amtTrimmer;
	var amtChipper;
	
	//Tool price variables
	var chainSawPrice;
	var lawnMowerPrice;
	var trimmerPrice;
	var chipperPrice;
	
	//Discount variable for number of days rented, whether the customer is wholesale or retail to calculate total discount
	//and number of unique items rented
	
	var numDaysRented;
	var customerType;
	var numItems;
	
	//Variable for discount of each different item rented
	var diffItemsDiscount;
	var diffItems;
	
	var additionalDiscount;
	var discountForDays;
	
	//Variables to calculate total cost after discounts and tax
	var totalCost;
	var salesTax;
	var totalDiscount;
	var wholeSaleDiscount;
	var retailDiscount;
	var discountRate;
	var finalCost;				

function driverModule_Click()
{
	//Driver module for the lab HTML page
	getInput();
	calculateDiscount();
	customerOutput();
  

}

function getInput()
{
	//Get user input of equipment
	amtChainSaw = Number ( prompt ("How many Chainsaws are you renting?", "") );
	amtLawnMower = Number ( prompt ("How many Lawn Mowers are you renting?", "") );
	amtTrimmer = Number ( prompt ("How many Trimmers are you renting?", "") );
	amtChipper = Number ( prompt ("How many Chippers are you renting?", "") );
	numDaysRented = Number ( prompt ("How many days are you renting the equipment?", "") );
	customerType = prompt ("Are you a wholesale customer? Answer Y or N", "");
	
	
}

function calculateDiscount()
{
	//Module calculates total discount after input
	itemsRented();
	rentalCost();
	differentItemDiscount();
	itemsRentedDiscount();
	daysRentedDiscount();
	priceAfterDiscounts();
	finalPrices();
	customerTax();
	percentage();
	customerInvoice();
}

function itemsRented()
{
	//Total number of items rented
	numItems = amtChainSaw + amtLawnMower + amtTrimmer + amtChipper;
}

function rentalCost()
{
	//Multiplies tool price by number of tools rented
	chainSawPrice = chainSawPerDay * amtChainSaw;
	lawnMowerPrice = lawnMowerPerDay * amtLawnMower;
	trimmerPrice = trimmerPerDay * amtTrimmer;
	chipperPrice = chipperPerDay * amtChipper;
	
	//Total price of tools multiplied by number of days rented
	rentalPrice = chainSawPrice + lawnMowerPrice + trimmerPrice + chipperPrice;
	totalCost = rentalPrice * numDaysRented;
		
}


function differentItemDiscount()
{
		
	//Discount for the number of different items rented, 5% for 2 items, 10% for three
		
	if (amtChainSaw >= 1) {
		diffItems = diffItems + 1;
	}
		
	if (amtLawnMower >= 1) {
		diffItems = diffItems + 1;
	}
		
	if (amtTrimmer >= 1) {
		diffItems = diffItems + 1;
	}
		
	if (amtChipper >= 1) {
		diffItems = diffItems + 1;
	}
		
	if (diffItems <= 1) {
		diffItemsDiscount = 0;
	} else if (diffItems == 2) {
		diffItemsDiscount = 0.05;
	} else if (diffItems >= 3) {
		diffItemsDiscount = 0.10;
	}
		
}

function itemsRentedDiscount()
{	
	//Discount for the total number of items rented over one
	if (numItems > 1) {
		additionalDiscount = (numItems - 1) * 0.01;
	} else {
		additionalDiscount = 0;
	}
		
}

function daysRentedDiscount()
{
	//Discount per day rented based on type of equipment rented, only if rented for more than one day
	if (amtChipper >= 1) {
		discountForDays = (numDaysRented - 1) * 0.03;
	} else if (amtChainSaw >= 1) {
		discountForDays = (numDaysRented - 1) * 0.02;
	} else if (amtLawnMower >= 1 || amtTrimmer >= 1) {
		discountForDays = (numDaysRented - 1) * 0.01;
	}
		
	if (numDaysRented <= 1) {
		discountForDays = 0;
	}
}

function priceAfterDiscounts()
{
  
	//Automatic 25% discount if customer is wholesale
	if (customerType == "Y" || customerType == "y") {
		totalDiscount = 0.25;
	}
	
	//If customer is retail, calculate total discount not to exceed 25%
	if (customerType == "N" || customerType == "n") {
		totalDiscount = diffItemsDiscount + additionalDiscount + discountForDays;
	} else {
		totalDiscount = diffItemsDiscount + additionalDiscount + discountForDays;
	}
		
	if (diffItemsDiscount + additionalDiscount + discountForDays >= 0.25) {
		totalDiscount = 0.25;
	}
		
}

function finalPrices()
{
	wholeSaleDiscount = totalCost * 0.25;
	retailDiscount = totalCost * totalDiscount;
	finalCost = totalCost - retailDiscount;
}

function customerTax()
{		
	//6% sales tax
	salesTax = finalCost * 0.06;
		
}

function percentage()
{
	discountRate = totalDiscount * 100;
}

function customerInvoice()
{
	//Final price the customer pays after discounts and taxes
	customerBill = finalCost + salesTax;
}

function customerOutput()
{
  
	//Outputs total cost for items, total discount, what the tax cost was, and thanks customer based on customer type
	if (customerType == "Y" || customerType == "y") {
		labelOut.value = labelOut.value + "\n" + "Your total cost for " + numItems + " number of item(s) rented for " + numDaysRented + " number of day(s) is $" + finalCost + " plus tax.";
		labelOut.value = labelOut.value + "\n" + "This reflects a 25% discount of $" + wholeSaleDiscount;
		labelOut.value = labelOut.value + "\n" + "Your bill is $" + customerBill.toFixed(2) + ". This reflects a 6% sales tax of $" + salesTax.toFixed(2);
		labelOut.value = labelOut.value + "\n" + "You are a valued wholesale customer of ours." + "\n";
	} else if (customerType == "N" || customerType == "n") {
		labelOut.value = labelOut.value + "\n" + "Your total cost for " + numItems + " number of item(s) rented for " + numDaysRented + " number of day(s) is $" + finalCost + " plus tax.";
		labelOut.value = labelOut.value + "\n" + "This reflects a " + discountRate + "% discount of $" + retailDiscount;
		labelOut.value = labelOut.value + "\n" + "Your bill is $" + customerBill.toFixed(2) + ". This reflects a 6% sales tax of $" + salesTax.toFixed(2);
		labelOut.value = labelOut.value + "\n" + "You are a valued retail customer of ours." + "\n";
	} else {
		labelOut.value = labelOut.value + "\n" + "Your total cost for " + numItems + " number of item(s) rented for " + numDaysRented + " number of day(s) is $" + finalCost + " plus tax.";
		labelOut.value = labelOut.value + "\n" + "This reflects a " + discountRate + "% discount of $" + retailDiscount;
		labelOut.value = labelOut.value + "\n" + "Your bill is $" + customerBill.toFixed(2) + ". This reflects a 6% sales tax of $" + salesTax.toFixed(2);
		labelOut.value = labelOut.value + "\n" + "You are a valued retail customer of ours." + "\n";
	}
}
