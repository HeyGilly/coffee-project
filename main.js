"use strict"

// -- This is going to showcase the coffee Information
function renderCoffee(coffee) {
    let html = '<section class="coffee rounded bg-light">';
    // html += '<small>' + coffee.id + '</small>';
    html += '<h3 class="p-0 m-0">' + coffee.name+ '</h3>';
    html += '<p class="p-0 m-0">' + coffee.roast + '</p>';
    html += '</section>';

    return html;
}

//-- Looping through each coffee in the coffee object
function renderCoffees(coffees) {
    var html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
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
let coffees = [
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
    let addForm = document.querySelector('#addForm');

    let newCoffee = {id: 1+coffees.length, name: addNameInputValue, roast: addRoastSelection};

     coffees.push(newCoffee);

    coffees.sort((x, y) => {return y.id - x.id;});


    tbody.innerHTML = renderCoffees(coffees);
    localStorage.setItem('coffees', JSON.stringify(coffees));
    console.log(JSON.parse(localStorage.getItem("coffees")).sort());

    addForm.reset();
}





const retrievedObject = JSON.parse(localStorage.getItem("coffees"));
if(retrievedObject !== null) {
    coffees = retrievedObject;
    tbody.innerHTML = renderCoffees(coffees);
}





