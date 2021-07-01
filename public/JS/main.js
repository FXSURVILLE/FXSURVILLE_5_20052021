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
let listIngredients=[];
recupIngredients.flat(1).forEach(ingredients => {
    if (!listIngredients.includes(ingredients.ingredient)) { // eviter les doublons
        listIngredients.push(ingredients.ingredient)}
});
// liste des ingredients triés
listIngredients.sort((a,b)=>a.localeCompare(b));
console.log(listIngredients);


// Appliance(appareils)
let listAppliance=[]; //liste des appliances
recipes.forEach(recipe => {
    if (!listAppliance.includes(recipe.appliance)) { // eviter les doublons
        listAppliance.push(recipe.appliance)}
});
// liste des appareils triés
listAppliance.sort((a,b)=>a.localeCompare(b))
console.log(listAppliance);


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
// liste des Ustensils triés
listUstensils.sort((a,b)=>a.localeCompare(b));
console.log(listUstensils);

//création des fiches recette
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
        let result = recipes[0].description.includes(searchText);
        // const result = recupIngredients[0].filter(
        //     (e) => e.ingredient == searchText       // tri sur ingredients
        // );
        console.log(searchText);
        console.log(result);
        console.log(recipes[0].description);
        recipes.forEach(e => {
            if (e.appliance.toLowerCase().includes(searchText)) { // recherche dans appareils
                console.log('testok')}
        });
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
        ingredientsNeeded += '<li><strong>' + e.ingredient + '</strong> '+ ingredientQuantity + '  ' + ingredientUnit + '</li>' // mise en forme ingrédient
    });
    return ingredientsNeeded;
};

// // Nombre de recettes
// const length = recipes.length
// console.log(length);


let idIngredient = document.getElementById("ingredient");
let idAppareil = document.getElementById("appareil");
let idUstensiles = document.getElementById("ustensiles");


// creation des filtres
function autocomplete(inp, arr) {
    // listener de la recherche
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        // si liste déja onverte, la ferme
        closeAllLists();
        // if (!val) { return false;}
        // creation de la div pour la liste
        a = document.createElement("ul");
        a.setAttribute("id", this.id + "-list");
        a.setAttribute("class", "new-choice");
        // ajoute ul
        this.parentNode.appendChild(a);
        // pour chaque item du tableau
        for (i = 0; i < arr.length; i++) {
        //   Controler si le texte commence par la ref
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            // creation div pour chaque ref trouvée
            b = document.createElement("li");
            b.setAttribute("class", this.id + " choice");
            //recup classe pour config tag
            let classe = this.id;
            // surbrillance du texte cherché
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            // ajoute type + valeur
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            // fonction pour le clic de l'élément
            b.addEventListener("click", function(e) {
                // récupere le texte de la cible
                let choice = this.getElementsByTagName("input")[0].value;
                // mise en forme du tag
                let tag = `<li class="${classe} selected">${choice}<i class="far fa-times-circle"></i></li>`
                // ajout d'un tag
                document.getElementById("tag").innerHTML+=tag;
                // fermeture de la liste
                closeAllLists();
            });
            // ajoute les li à ul
            a.appendChild(b);
          }
        }
    });
    function closeAllLists(elmnt) {
      //ferme les listes, sauf celle active
      var x = document.getElementsByClassName("new-choice");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    //ferme la liste quand on clic ailleurs
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        idIngredient.value = "";
        idAppareil.value = "";
        idUstensiles.value = "";
    });
};


//close tags
function closeTag(elmnt) {
    var tag = document.getElementsByClassName("fa-times-circle"); //icone en cible
    for (var i = 0; i < tag.length; i++) {
      if (elmnt == tag[i]) {
        tag[i].parentNode.remove(tag[i]);
      }
    }
}
//ferme au clic
  document.addEventListener("click", function (e) {
    closeTag(e.target);
});
  
//   champs de selection
autocomplete(idIngredient, listIngredients);
autocomplete(idAppareil, listAppliance);
autocomplete(idUstensiles, listUstensils);




// foreach if regex= name let id 


// function liste() {
// let liste = "";
// for(var i = 0; i < length; i++){
//     liste += recipes.ingredients[i].ingredient+"\n";
//     console.log(liste);
// }
// return liste;
// };

// 0 recherche dans tout

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
// let ingredientsFiltres = ingredients.filter(function(ingredient) {
//     if(ingredient != "elementdufiltre"){
//         return true; // ou: return ingrédient;
//     }
// })
// = si un seul parametre
// let ingredientsFiltres = ingredients.filter(function(ingredient) {
//     if(ingredient != "elementdufiltre"){
//         return true; // ou: return ingrédient;
//     }
// })


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
