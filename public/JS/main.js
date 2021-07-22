import {recipes} from './recipes.js'; 
console.table(recipes); //tableau de recipes dans console

// getElements du DOM
const tags = document.getElementsByClassName("selected");
const cross = document.getElementsByClassName("fa-times-circle");
// const blocRecette = document.getElementsByClassName("bloc-recette");
const idIngredient = document.getElementById("ingredient");
const idAppareil = document.getElementById("appareil");
const idUstensiles = document.getElementById("ustensiles");
const searchBarId = document.getElementById("search-text");
// indices filtrés
// let allId=[];
// recipes.map(recipe => allId.push(recipe.id));
// console.log(allId);
// let indices=[];    
// recipes.map(recipe => indices.push(recipe.id));
// console.log(indices);
// tableaux de tags actifs
let ingTag = [];
let appTag = [];
let ustTag = [];
// résultats
let searchResult = []; // résultat de la recherche
let ingResult = []; // résultat des tags ingredients
let appResult = []; // résultat des tags appareils
let ustResult = []; // résultat des tags ustensils
// tableau d'indices filtré
let idResult;

// fonctions à lancer à l'ouverture
fiches();
initIdResult();


function initIdResult() {
    idResult=recipes.map(recipe => recipe.id);
};
console.log(idResult);

// listes dropdown
let listIngredients;
let listAppliance;
let listUstensils;

majDropdown();
function majDropdown() {
    let recupIngredients=[];
    listAppliance=[];
    let recupUstensils=[];
    for (let i = 0; i < idResult.length; i++) {
        recupIngredients.push(recipes[i].ingredients)
        if (!listAppliance.includes(recipes[i].appliance)) { // eviter les doublons appareils
            listAppliance.push(recipes[i].appliance)
        }
        recupUstensils.push(recipes[i].ustensils)
    }
    console.log(recupIngredients);
    listIngredients=[];
    recupIngredients.flat(1).forEach(ingredients => {
        if (!listIngredients.includes(ingredients.ingredient)) { // eviter les doublons ingrédients
            listIngredients.push(ingredients.ingredient)}
    });
    listUstensils=[];
    recupUstensils.flat().forEach(ustensil => {
        if (!listUstensils.includes(ustensil)) { // eviter les doublons ustensiles
            listUstensils.push(ustensil)}
    });
    // listes triés
    listIngredients.sort((a,b)=>a.localeCompare(b));
    console.log(listIngredients);
    listAppliance.sort((a,b)=>a.localeCompare(b))
    console.log(listAppliance);
    listUstensils.sort((a,b)=>a.localeCompare(b));
    console.log(listUstensils);
}



// *****tableaux simplifiés pour recherche*****
// tableau des ingredients
const arrayIngredients=recipes.map(e=>e.ingredients.map(i=>i.ingredient))
console.log(arrayIngredients);
// tableau des appareils
const arrayAppliance=recipes.map(e=>e.appliance)
console.log(arrayAppliance);
// tableau des descriptions
// const arrayDescription=recipes.map(e=>e.description)
// console.log(arrayDescription);


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


// zone de recherche
searchBarId.addEventListener("input", function(e) {
    let searchRegex = /^.{3,}$/g; // \S ou [a-zA-Z]+cara spé?
    let searchText = e.target.value;
    if (searchRegex.test(searchText) === true) {
        searchResult=[];
        recipes.forEach(e => {
            if (e.name.toLowerCase().includes(searchText)) { // recherche dans titre
                searchResult.push(e.id)};
            if (e.description.toLowerCase().includes(searchText)) { // recherche dans description
                if (!searchResult.includes(e.id)) {
                    searchResult.push(e.id)};
                }
            // if (e.appliance.toLowerCase().includes(searchText)) { // recherche dans appareils
            //     indices.push(e.id);
            //     console.log('testok')};
            e.ingredients.forEach(ing=>{
                if (ing.ingredient.toLowerCase().includes(searchText)) { // recherche dans titre
                    if (!searchResult.includes(e.id)) {
                        searchResult.push(e.id)};
                    }
            })
            console.log(searchResult)            
        });
        searchFusion()
        majDropdown();
        // console.log(searchResult);
        // let setIndices = new Set(searchResult);
        // console.log(setIndices);
        // recipes.forEach(recipe=> {
        //     if (setIndices.has(recipe.id)) {
        //         document.getElementById(recipe.id).style.display = "";
        //     } else {
        //         document.getElementById(recipe.id).style.display = "none";
        //     };
        // })
    } else {
        searchResult=[];
        recipes.map(recipe => searchResult.push(recipe.id));
        searchFusion();
    }
});

// recherche par les tags
function rechTags() {
    // indices=[];
    // ingTag.map(e=> indices.push(arrayIngredients.forEach(arr=>arr.indexOf(e)+1)))
    // appTag.map(e=> indices.push(arrayAppliance.indexOf(e)+1))
    // ustTag.map(e=> indices.push(arrayAppliance.indexOf(e)+1))
    ingResult = [];
    appResult = [];
    ustResult = [];
    for (let i = 0; i < recipes.length; i++) {
        ingTag.map(e=> {
            if (arrayIngredients[i].includes(ingTag[0])) { // fait premier tag
                if(!ingResult.includes(i+1)) {
                    ingResult.push(i+1);
                }
                for (let j = 1; j < ingTag.length; j++) { // filtre avec tag suivants
                    if (!arrayIngredients[i].includes(ingTag[j])) {
                        if(ingResult.includes(i+1)) { // retire les index non validés par
                            let reduce=ingResult.indexOf(i+1);
                            ingResult.splice(reduce,1);
                        }
                    }
                }
            }
        });
        appTag.map(e=> {
            if (arrayAppliance[i].includes(appTag[0])) { // fait premier tag
                if(!appResult.includes(i+1)) {
                    appResult.push(i+1);
                }
                for (let j = 1; j < appTag.length; j++) { // filtre avec tag suivants
                    if (!arrayAppliance[i].includes(appTag[j])) {
                        if(appResult.includes(i+1)) { // retire les index non validés par
                            let reduce=appResult.indexOf(i+1);
                            appResult.splice(reduce,1);
                        }
                    }
                }
            }
        });
        ustTag.map(e=> {
            if (arrayUstensils[i].includes(ustTag[0])) { // fait premier tag
                if(!ustResult.includes(i+1)) {
                    ustResult.push(i+1);
                }
                for (let j = 1; j < ustTag.length; j++) { // filtre avec tag suivants
                    if (!arrayUstensils[i].includes(ustTag[j])) {
                        if(ustResult.includes(i+1)) { // retire les index non validés par
                            let reduce=ustResult.indexOf(i+1);
                            ustResult.splice(reduce,1);
                        }
                    }
                }
            }
        });
    }
    searchFusion()
    // console.log(indices);
    // fiches();
    // for (let i = 1; i <= recipes.length; i++) {
    //     document.getElementById(i).style.display = 'none';
    // }
    // recipes.forEach(id=> document.getElementById(id.id).style.display = 'none')
    // indices.forEach(id=> document.getElementById(id).style.display = '')
}

// fusion des recherches
function searchFusion() {
    initIdResult();
    if (ingTag.length!=0) {   
        let a=idResult.filter(x => ingResult.includes(x));
        idResult=a;
        console.log(idResult);
    }else{
        console.log("ing vide");
    }
    if (appTag.length!=0) {   
        let a=idResult.filter(x => appResult.includes(x));
        idResult=a;
        console.log(idResult);
    }else{
        console.log("app vide");
    }
    if (ustTag.length!=0) {   
        let a=idResult.filter(x => ustResult.includes(x));
        idResult=a;
        console.log(idResult);
    }else{
        console.log("ust vide");
    }
    if (searchResult.length!=0) {   
        let a=idResult.filter(x => searchResult.includes(x));
        idResult=a;
        console.log(idResult);
    }else{
        console.log("src vide");
    }
    if (ingTag.length+appTag.length+ustTag.length+searchResult.length==0) {
        idResult=[];
    }
    recipes.forEach(recipe=> {
        if (idResult.includes(recipe.id)) {
            document.getElementById(recipe.id).style.display = "";
        } else {
            document.getElementById(recipe.id).style.display = "none";
        };
    })
}



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



// creation des filtres
function autocomplete(inp, arr) {
    // listener de la recherche
    inp.addEventListener("input", function(e) {
        console.log(listIngredients);
        console.log(arr);
        inp.classList.add("up");
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
                storeTags();
                // fermeture de la liste
                closeAllLists();
                majDropdown();
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
        // retirer rotation des chevrons
        idIngredient.classList.remove("up");
        idAppareil.classList.remove("up");
        idUstensiles.classList.remove("up");
    });
};

// tags
// close tags
function closeTag(elmnt) { //icone en cible
    for (var i = 0; i < cross.length; i++) {
      if (elmnt == cross[i]) {
        cross[i].parentNode.remove(cross[i]);
        storeTags();
        rechTags()
      }
    }
}
// ferme au clic
document.addEventListener("click", function (e) {
    closeTag(e.target);
});
  
// champs de selection
autocomplete(idIngredient, listIngredients);
autocomplete(idAppareil, listAppliance);
autocomplete(idUstensiles, listUstensils);


// recupération des tags
function storeTags() {
    ingTag = [];
    appTag = [];
    ustTag = [];
    console.log(tags);
    for(var i = 0; i < tags.length; i++){
        if(tags[i].className.includes("ingredient")) {
            ingTag.push(tags[i].textContent);
        }
        if(tags[i].className.includes("appareil")) {
            appTag.push(tags[i].textContent);
        }
        if(tags[i].className.includes("ustensiles")) {
            ustTag.push(tags[i].textContent);
        }
        rechTags();
    }
    console.log(ingTag);    console.log(appTag);    console.log(ustTag);
}


// console.log(document.getElementsByClassName('bloc-recette'));
// function filtreFiches() {
//     console.log(indices);
//     for (i = 0; i < blocRecette.length; i++) {
//         td = tr[i].getElementsByTagName("td")[0];
//         if (td) {
//             txtValue = td.textContent || td.innerText;
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }       
//     }
// }


// maj tableau suivant recherches
// function idResults() {
//     if (id2.length!=0) {   
//         let a=idResult.filter(x => id2.includes(x));
//         idResult=a;
//         console.log(idResult);
//     }else{
//         alert ("vide");
//     }
//     if (id3.length!=0) {   
//         let a=idResult.filter(x => id3.includes(x));
//         idResult=a;
//         console.log(idResult);
//     }else{
//         alert ("vide");
//     }
//     if (id4.length!=0) {   
//         let a=idResult.filter(x => id4.includes(x));
//         console.log(id4);
//         idResult=a;
//         console.log(idResult);
//     }else{
//         alert ("vide");
//     }
//     if (id5.length!=0) {   
//         let a=idResult.filter(x => id5.includes(x));
//         idResult=a;
//         console.log(idResult);
//     }else{
//         alert ("vide");
//     }
// }


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


// let searchAll=[];
// searchAll += JSON.stringify(recipes[0].ingredients);
// searchAll += JSON.stringify(recipes[0].description);
// searchAll += JSON.stringify(recipes[0].appliance);
// searchAll += JSON.stringify(recipes[0].ustensils);
// console.log(searchAll);
// recipes.forEach(e => searchAll.push(e.ingredients.forEach(i => i.ingredient)+e.description+e.appliance+e.ustensils));


// recipes.forEach(recipe => console.log(recipe));
// recipes.forEach(recipe => console.log(recipe.name));
// recipes.forEach(recipe => console.log(recipe.ingredients));
// recipes.forEach(recipe => console.log(recipe.description));
// recipes.forEach(recipe => console.log(recipe.appliance));
// recipes.forEach(recipe => console.log(recipe.ustensils));


// let result = recipes[0].description.includes(searchText);
 // const result = recupIngredients[0].filter(
 //     (e) => e.ingredient == searchText       // tri sur ingredients
 // );

 // let idx = arrayAppliance.indexOf(searchText);
 // console.log(idx);
 // while (idx != -1) {
//   indices.push(idx);
//   idx = arrayAppliance.indexOf(searchText, idx + 1);
// }
        
// function liste() {
//     let liste = "";
//     for(var i = 0; i < recipes.length; i++){
//         liste += recipes.ingredients[i].ingredient+"\n";
//         console.log(liste);
//     }
//     return liste;
// };



// // Ingredients
// const recupIngredients=recipes.map(recipe => recipe.ingredients); // ingrédients de chaque recette'
// console.log(recupIngredients);
// let listIngredients=[];
// recupIngredients.flat(1).forEach(ingredients => {
//     if (!listIngredients.includes(ingredients.ingredient)) { // eviter les doublons
//         listIngredients.push(ingredients.ingredient)}
// });
// // liste des ingredients triés
// listIngredients.sort((a,b)=>a.localeCompare(b));
// console.log(listIngredients);


// // Appliance(appareils)
// let listAppliance=[]; //liste des appliances
// recipes.forEach(recipe => {
//     if (!listAppliance.includes(recipe.appliance)) { // eviter les doublons
//         listAppliance.push(recipe.appliance)}
// });
// // liste des appareils triés
// listAppliance.sort((a,b)=>a.localeCompare(b))
// console.log(listAppliance);


// // Ustensils
// let arrayUstensils=recipes.map(recipe => recipe.ustensils);
// console.log(arrayUstensils);
// // liste d'ustensils
// let listUstensils=[];
// arrayUstensils.flat().forEach(ustensil => {
//     if (!listUstensils.includes(ustensil)) { // eviter les doublons
//         listUstensils.push(ustensil)}
// });
// // liste des Ustensils triés
// listUstensils.sort((a,b)=>a.localeCompare(b));
// console.log(listUstensils);