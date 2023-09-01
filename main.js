"use strict"

/**
 TODO
    [X] Update the HTML
        [X] each coffee is displayed in a div
        [X] A heading displaying the coffee name
        [X] The type of roast in a paragraph.
        [X] Don't display the ids
        [X] Coffees should be sorted by their ids in ascending order
    [ ] Functional
        [X] Display only the coffees that match the provided search term
            (You will need to add an input field to the existing form for this)
        [X] update the displayed coffee as the user types into the search box
        [X] update the displayed coffee as they select an option from the select
    [ ] BONUS:
        [X] Add an option to select all roasts for roast type
        [X] Make your name search case insensitive
        [ ] Allow the user to add new coffees to the page

 */



// -- This is going to showcase the coffee Information
function renderCoffee(coffee) {
    let html = '<div class="coffee border border-dark p-4 border-3 d-flex rounded" style="width:fit-content">';
    // html += '<small>' + coffee.id + '</small>';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

//-- Looping through each coffee in the coffee object
function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }else if (selectedRoast === 'all') {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');

//Sort by ID
coffees.sort((x, y) => {return y.id - x.id;});

tbody.innerHTML = renderCoffees(coffees);

//-- Search Button
submitButton.addEventListener('click', updateCoffees);

//-- Input
let coffeeNameInput = document.querySelector('#coffeeNameInput');

coffeeNameInput.addEventListener("input", inputSearch);

function inputSearch(e){
    //-- Saved Input
    let savedInput = coffeeNameInput.value
    //New Array from search input
    let inputFilteredCoffees = [];
    //-- Loop through coffees
    coffees.forEach(function(coffee) {
        //LowerCase CoffeeName
        let lowerCaseCoffeeName = coffee.name.toLowerCase()
        //Lowercase Input Value
        let lowerCaseInputValue = savedInput.toLowerCase()
        //-- Does our input equal name of coffee
        if (lowerCaseCoffeeName.includes(lowerCaseInputValue)) {
            inputFilteredCoffees.push(coffee);
        } else if(savedInput === ""){
            inputFilteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(inputFilteredCoffees);
}


//-- Add Coffee Information
let addingCoffeeSubmitBtn = document.querySelector('#submit-button-adding');


addingCoffeeSubmitBtn.addEventListener("click", addingCoffee);

function addingCoffee(e){
    e.preventDefault()
    let addRoastSelection = document.querySelector('#add-roast-selection').value;
    let addNameInputValue = document.querySelector('#addCoffeeNameInput').value;

    let addingCoffees = [];

    coffees.forEach(function(coffee) {
        addingCoffees.push(coffee);
    });
    let newCoffee = {id: this.id, name: addNameInputValue, roast: addRoastSelection};

    addingCoffees.push(newCoffee);

    console.log("ID: "+addingCoffees.length+"\nRoast: "+addRoastSelection+" \nCoffee Name: "+addNameInputValue)
    tbody.innerHTML = renderCoffees(addingCoffees);
}











