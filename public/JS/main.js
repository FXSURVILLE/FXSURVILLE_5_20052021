import {recipes} from './recipes.js'; 
console.table(recipes);

// let idName1 = recipes[0].name;
// console.log(idName1);

// recipes.forEach(recipe => console.log(recipe));
// recipes.forEach(recipe => console.log(recipe.name));
// recipes.forEach(recipe => console.log(recipe.ingredients));
// recipes.forEach(recipe => console.log(recipe.description));
// recipes.forEach(recipe => console.log(recipe.appliance));
// recipes.forEach(recipe => console.log(recipe.ustensils));
// recipes.forEach((recipe) => const recette = recipe.name);
// console.log(recette);

// set d'ingrédients
const recupIngredients=[]; // ingrédients de chaque recette
recipes.forEach(recipe => recupIngredients.push(recipe.ingredients));
console.log(recupIngredients);
let flatIngredients=recupIngredients.flat(1); // concatener (tous les ingrédients)
console.log(flatIngredients);
const listIngredients=[];
flatIngredients.forEach(ing => listIngredients.push(ing.ingredient));
console.log(listIngredients);
const setIngredients=new Set(listIngredients); // nettoyer les doublons
// liste des ingredients triés
let arrayIngredients=[...setIngredients];
arrayIngredients.sort((a,b)=>a.localeCompare(b));
console.log(arrayIngredients);
// affichage choix
let eachIngredient ='';
arrayIngredients.forEach(ingredients => {eachIngredient += `<option value="${ingredients}">${ingredients}</option>`});
document.getElementById("filtres-ingredients").innerHTML=eachIngredient;


// liste d'appliance
const setAppliance=recipes.reduce((acc,e)=>{return acc.add(e.appliance)}, new Set());
let arrayAppliance=[...setAppliance]; // utilisation du spread sur le set pour creer le tableau
arrayAppliance.sort((a,b)=>a.localeCompare(b));
console.log(arrayAppliance);
// affichage choix
let eachAppliance ='';
arrayAppliance.forEach(appliance => {eachAppliance += `<option value="${appliance}">${appliance}</option>`});
document.getElementById("filtres-appareil").innerHTML=eachAppliance;


// set d'ustensils
const recupUstensils=[];
recipes.forEach(recipe => recupUstensils.push(recipe.ustensils));
let flatUstensils=recupUstensils.flat(); // concatener
const setUstensils=new Set(flatUstensils); // nettoyer les doublons
// liste des ustensils triés
let arrayUstensils=[...setUstensils];
arrayUstensils.sort((a,b)=>a.localeCompare(b));
console.log(arrayUstensils);
// affichage choix
let eachUstensils ='';
arrayUstensils.forEach(ustensils => {eachUstensils += `<option value="${ustensils}">${ustensils}</option>`});
document.getElementById("filtres-ustensiles").innerHTML=eachUstensils;



recupIngredients.forEach(e => e.forEach(i => console.log("<strong>"+i.ingredient+":</strong>"+i.quantity+i.unit)));

let eachName ='';
recipes.forEach(recipe => {eachName += `
<div class="bloc-recette" id="recipe${recipe.id}">
    <div class="img">
        <img class="image" src="" alt="" title="">
    </div>
    <div class="recette">
        <div class="titre">${recipe.name}</div>
        <p class="duree"><i class="far fa-clock"></i>${recipe.time} mn</p>
        <div class="ingredients"><strong>${recipe.ingredients[0].ingredient} :</strong> ${recipe.ingredients[0].quantity}${recipe.ingredients[0].unit}</div>
        <div class="description">${recipe.description}</div>
    </div>
</div>
`
});
document.getElementById("recettes").innerHTML=eachName;

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