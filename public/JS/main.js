import {recipes} from './recipes.js'; 
console.table(recipes);

// recipes.forEach(recipe => console.log(recipe));
// recipes.forEach(recipe => console.log(recipe.name));
// recipes.forEach(recipe => console.log(recipe.ingredients));
// recipes.forEach(recipe => console.log(recipe.description));
// recipes.forEach(recipe => console.log(recipe.appliance));
// recipes.forEach(recipe => console.log(recipe.ustensils));
// console.log(recette);

// Ingredients
const recupIngredients=[]; // ingrédients de chaque recette'
recipes.forEach(recipe => recupIngredients.push(recipe.ingredients));
console.log(recupIngredients);
// console.log(flatIngredients);
const listIngredients=[];
recupIngredients.flat(1).forEach(ingredients => {
    if (!listIngredients.includes(ingredients.ingredient)) { // eviter les doublons
        listIngredients.push(ingredients.ingredient)}
});
// liste des ingredients triés
listIngredients.sort((a,b)=>a.localeCompare(b));
console.log(listIngredients);
// affichage choix
let eachIngredient ='';
listIngredients.forEach(ingredients => {eachIngredient += `<option value="${ingredients}">${ingredients}</option>`});
document.getElementById("filtres-ingredients").innerHTML=eachIngredient;


// Appliance
let listAppliance=[]; //liste des appliances
recipes.forEach(recipe => {
    if (!listAppliance.includes(recipe.appliance)) { // eviter les doublons
        listAppliance.push(recipe.appliance)}
});
listAppliance.sort((a,b)=>a.localeCompare(b))
console.log(listAppliance);
// affichage choix
let showAppliance ='';
listAppliance.forEach(appliance => {showAppliance += `<option value="${appliance}">${appliance}</option>`});
document.getElementById("filtres-appareil").innerHTML=showAppliance;


// Ustensils
let arrayUstensils=[];
recipes.forEach(recipe => arrayUstensils.push(recipe.ustensils));
console.log(arrayUstensils);
// liste d'ustensils
let listUstensils=[];
arrayUstensils.flat().forEach(ustensil => {
    if (!listUstensils.includes(ustensil)) { // eviter les doublons
        listUstensils.push(ustensil)}
});
listUstensils.sort((a,b)=>a.localeCompare(b));
console.log(listUstensils);
// affichage choix
let showUstensils ='';
listUstensils.forEach(ustensils => {showUstensils += `<option value="${ustensils}">${ustensils}</option>`});
document.getElementById("filtres-ustensiles").innerHTML=showUstensils;


let eachName ='';
recipes.forEach(recipe => {eachName += `
<div class="bloc-recette" id="recipe${recipe.id}">
    <div class="img">
        <img class="image" src="" alt="" title="">
    </div>
    <div class="recette">
        <div class="titre">${recipe.name}</div>
        <p class="duree"><i class="far fa-clock"></i>${recipe.time} mn</p>
        <ul class="ingredients">${listOfIngredients(recipe.ingredients)}</ul>
        <div class="description">${recipe.description}</div>
    </div>
</div>
`
});
document.getElementById("recettes").innerHTML=eachName;


let searchBarId = document.getElementById("search-text");
searchBarId.addEventListener("input", function(e) {
    let searchRegex = /^\S{3,30}$/; // \S ou [a-zA-Z]+cara spé?
    let searchText = e.target.value;
    if (searchRegex.test(searchText) === true) {
        console.log("ok");
    } else {
        console.log("nok");
    }
});


// Ingrédients d'une recette
function listOfIngredients(recipeIngredients) {
    let ingredientsNeeded = '';
    recipeIngredients.forEach(e => {
        let ingredientQuantity; // check quantity
        if(e.quantity) {
            ingredientQuantity = " : " + e.quantity
        } else {
            ingredientQuantity = ''
        }
        let ingredientUnit; // check unit
        if(e.unit) {
            ingredientUnit = e.unit
        } else {
            ingredientUnit = ''
        }
        ingredientsNeeded += '<li><strong>' + e.ingredient + '</strong> '+ ingredientQuantity + '  ' + ingredientUnit + '</li>' // chaque ingrédient
    });
    return ingredientsNeeded;
};




const length = recipes.length
console.log(length);

function liste() {
let liste = "";
for(var i = 0; i < length; i++){
    liste += recipe.ingredients[i].ingredient+"\n";
    console.log(liste);
}
return liste;
};

// 1 recherche dans classes des fiches

// 2 recherche dans tableau


// recupIngredients.forEach(e => e.forEach(i => console.log("<strong>"+i.ingredient+":</strong>"+i.quantity+i.unit)));

// // //surveille la recherche
// const rechercheTexte = document.getElementById('recherche__texte');
// rechercheTexte.addEventListener('input',function recherche(){
//     if ()
// });

// function recherche() {}

// const recipesName = recipes.map(recipe => recipe.name); 

// afficher les ingrédients
// let listeIngredients = ingredients.map(e => ingredients + ": " quantity + unit);

// // filtrer (ingredientsFiltres= tous les éléments du tableau ingrédients moins l'elementdufiltre )
// let ingredientsFiltres = ingredients.filter(function(ingrdient) {
//     if(ingredient != "elementdufiltre"){
//         return true; // ou: return ingrédient;
//     }
// })
// = si un seul parametre
// let ingredientsFiltres = ingredients.filter(function(ingrdient) {
//     if(ingredient != "elementdufiltre"){
//         return true; // ou: return ingrédient;
//     }
// })




// const setUstensils=recipes.reduce((acc,e)=>{return acc.add(e.appliance)}, new Set());
// let arrayList=[...setUstensils] // utilisation du spread sur le set pour creer le tableau
// arrayList.sort((a,b)=>a.localeCompare(b));
// console.log(arrayList);

// class FicheRecetteElement extends HTMLElement {
//     constructor(){
//         super();
//     }
//     connectedCallback(){
//         // let name = recipe.name;
//         // let ingredients = this(recipe.ingredients);
//         // let description = this(recipe.description);
//         this.innerHTML = `
//         <div class="bloc-recette">
//             <div class="img">
//                 <img class="image" src="" alt="" title="">
//             </div>
//             <div class="recette">
//                 <div class="titre">zgzegsdsgsdgsd</div>
//                 <p class="duree"><i class="far fa-clock"></i> 166 min</p>
//                 <div class="ingredients">dthf</div>
//                 <div class="description">shdzfgee eeeeeeeeeeeeee qzegagzahe zhqfqzdssss sssssssssss ssssssssssssss ssssssssss ssssssssssss sssssssssssss sssssssss</div>
//             </div>
//         </div>
//         `;
//     }
// }
// window.customElements.define('fiche-recette',FicheRecetteElement);