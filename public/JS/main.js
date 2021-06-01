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

// recipes.forEach(function(recipe){
//     let fiche = document.createElement('div');
//     fiche.classList.add('bloc-recette');
//     fiche.textContent = recipe.name
//     document.querySelector('#recettes').appendChild(fiche);
// //     let blocImg = document.createElement('div');
// //     blocImg.classList.add('img');
// //     document.querySelector('.bloc-recette').appendChild(blocImg);
//     // let blocImg = document.createElement('div');
// });

class FicheRecetteElement extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        // let name = recipe.name;
        // let ingredients = this(recipe.ingredients);
        // let description = this(recipe.description);

        this.innerHTML = `
        <div class="bloc-recette">
            <div class="img">
                <img class="image" src="" alt="" title="">
            </div>
            <div class="recette">
                <div class="titre">zgzegsdsgsdgsd</div>
                <p class="duree"><i class="far fa-clock"></i> 166 min</p>
                <div class="ingredients">dthf</div>
                <div class="description">shdzfgee eeeeeeeeeeeeee qzegagzahe zhqfqzdssss sssssssssss ssssssssssssss ssssssssss ssssssssssss sssssssssssss sssssssss</div>
            </div>
        </div>
        `;
    }
}
window.customElements.define('fiche-recette',FicheRecetteElement);

let eachName ='';
recipes.forEach(recipe => {eachName += `
<div class="bloc-recette">
    <div class="img">
        <img class="image" src="" alt="" title="">
    </div>
    <div class="recette">
        <div class="titre">${recipe.name}</div>
        <p class="duree"><i class="far fa-clock"></i>${recipe.time} mn</p>
        <div class="ingredients">${recipe.ingredients}</div>
        <div class="description">${recipe.description}</div>
    </div>
</div>
`;
});
console.log(eachName);
document.getElementById("recettes").innerHTML=eachName;

const length = recipes.length
console.log(length);

let name = "";
for(var i = 0; i < length; i++){
    name += recipes[i].name.innerText+"\n";
}

// //surveille la recherche
// const rechercheTexte = document.getElementById('recherche__texte');
// rechercheTexte.addEventListener('input',recherche);

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