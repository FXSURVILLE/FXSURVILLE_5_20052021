import {recipes} from './recipes.js'; 
console.table(recipes); //tableau de recipes dans console
fiches();
// recipes.forEach(recipe => console.log(recipe));
// recipes.forEach(recipe => console.log(recipe.name));
// recipes.forEach(recipe => console.log(recipe.ingredients));
// recipes.forEach(recipe => console.log(recipe.description));
// recipes.forEach(recipe => console.log(recipe.appliance));
// recipes.forEach(recipe => console.log(recipe.ustensils));
// console.log(recette);

// Ingredients
const recupIngredients=recipes.map(recipe => recipe.ingredients); // ingrédients de chaque recette'
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
let arrayUstensils=recipes.map(recipe => recipe.ustensils);
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
function fiches() {
    let eachName ='';
    recipes.forEach(recipe => {eachName += `
    <div class="bloc-recette" id="${recipe.id}" display = "">
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
}


let searchBarId = document.getElementById("search-text");
searchBarId.addEventListener("input", function(e) {
    let searchRegex = /^\S{3,30}$/; // \S ou [a-zA-Z]+cara spé?
    let searchText = e.target.value;
    let indices=[];    
    if (searchRegex.test(searchText) === true) {
        console.log("ok");
        let result = recipes[0].description.includes(searchText);
        // const result = recupIngredients[0].filter(
        //     (e) => e.ingredient == searchText       // tri sur ingredients
        // );

        // let idx = arrayAppliance.indexOf(searchText);
        // console.log(idx);
        // while (idx != -1) {
        //   indices.push(idx);
        //   idx = arrayAppliance.indexOf(searchText, idx + 1);
        // }

        console.log(searchText);
        console.log(result);
        console.log(recipes[0].description);
        // filterFunction();
        recipes.forEach(e => {
            if (e.name.toLowerCase().includes(searchText)) { // recherche dans titre
                indices.push(e.id)};
            if (e.description.toLowerCase().includes(searchText)) { // recherche dans description
                indices.push(e.id)};
            // if (e.appliance.toLowerCase().includes(searchText)) { // recherche dans appareils
            //     indices.push(e.id);
            //     console.log('testok')};
            e.ingredients.forEach(ing=>{
                if (ing.ingredient.toLowerCase().includes(searchText)) { // recherche dans titre
                        indices.push(e.id)};
            })
        });
        console.log(indices);
        let setIndices = new Set(indices);
        console.log(setIndices);
        recipes.forEach(recipe=> {
            if (setIndices.has(recipe.id)) {
                document.getElementById(recipe.id).style.display = "";
            } else {
                document.getElementById(recipe.id).style.display = "none";
            };
        })
    } else {
        fiches();
    }
});


let searchAll=[];
// searchAll += JSON.stringify(recipes[0].ingredients);
// searchAll += JSON.stringify(recipes[0].description);
// searchAll += JSON.stringify(recipes[0].appliance);
// searchAll += JSON.stringify(recipes[0].ustensils);
// console.log(searchAll);
// recipes.forEach(e => searchAll.push(e.ingredients.forEach(i => i.ingredient)+e.description+e.appliance+e.ustensils));

// tableau des ingredients
const arrayIngredients=recipes.map(e=>e.ingredients.map(i=>i.ingredient))
console.log(arrayIngredients);
// tableau des appareils
const arrayAppliance=recipes.map(e=>e.appliance)
console.log(arrayAppliance);
// tableau des descriptions
const arrayDescription=recipes.map(e=>e.description)
console.log(arrayDescription);

function liste() {
    let liste = "";
    for(var i = 0; i < recipes.length; i++){
        liste += recipes.ingredients[i].ingredient+"\n";
        console.log(liste);
    }
    return liste;
};


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

/*
recherche
concat ing+app+ust+recet
if rech+tag false = all id
forEach id concat
if rech dans concat =true add id dans Set else remove id
if tag dans array =true add id dans Set else remove id
*/

// 2 recherche dans tableau
/*
recherche
foreach id rech if recet else ing else app else ust
*/

// let recupID=nomarray.map(e=>e.id) ?

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



