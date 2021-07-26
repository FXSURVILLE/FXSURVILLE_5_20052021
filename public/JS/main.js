import {recipes} from './recipes.js'; 
// console.table(recipes); //tableau de recipes dans console

// *****variables*****
// getElements du DOM
const tags = document.getElementsByClassName("selected");
const cross = document.getElementsByClassName("fa-times-circle");
// const blocRecette = document.getElementsByClassName("bloc-recette");
const idIngredient = document.getElementById("ingredient");
const idAppareil = document.getElementById("appareil");
const idUstensiles = document.getElementById("ustensiles");
const searchBarId = document.getElementById("search-text");
// tableau recherches
let arrSearch=[];
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
// listes dropdown
let listIngredients;
let listAppliance;
let listUstensils;


// *****création du tableau de données pour search*****
recipes.forEach(recipe=> {
    let a=[];
    a.push(recipe.name,recipe.description);
    for (let i = 0; i < recipe.ingredients.length; i++) {
        a.push(recipe.ingredients[i].ingredient)        
    }
    arrSearch.push(a);
})


// *****tableaux simplifiés pour recherche*****
// tableau des ingredients
const arrayIngredients=recipes.map(e=>e.ingredients.map(i=>i.ingredient))
// tableau des appareils
const arrayAppliance=recipes.map(e=>e.appliance)


// *****idResult par défaut*****
initIdResult();
function initIdResult() {
    idResult=recipes.map(recipe => recipe.id);
    fiches();
};


// *****Dropdown*****
function majDropdown() {
    let recupIngredients=[];
    listAppliance=[];
    let recupUstensils=[];
    for (let i = 0; i < idResult.length; i++) {
        let idUsed = idResult[i]-1;
        recupIngredients.push(recipes[idUsed].ingredients)
        if (!listAppliance.includes(recipes[idUsed].appliance)) { // eviter les doublons appareils
            listAppliance.push(recipes[idUsed].appliance)
        }
        recupUstensils.push(recipes[idUsed].ustensils)
    }
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
    listAppliance.sort((a,b)=>a.localeCompare(b));
    listUstensils.sort((a,b)=>a.localeCompare(b));
}


// *****Création des fiches recette*****
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


// *****Recherches*****
// zone de recherche
searchResult=idResult
searchBarId.addEventListener("input", function(e) {
    let searchRegex = /^.{3,}$/g; // \S ou [a-zA-Z]+cara spé?
    let searchText = e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (searchRegex.test(searchText)) {
        searchResult=[];
        for (let i = 0; i < arrSearch.length; i++) {
            for (let j = 0; j < arrSearch[i].length; j++) {
                let g=arrSearch[i][j].toLowerCase();
                if (g.includes(searchText)) { // recherche globale
                    searchResult.push(i+1)
                };
            } 
        }
        searchFusion();
    } else {
        initIdResult();
        searchResult=idResult;
        searchFusion();
    }
});

// recherche par les tags
function rechTags() {
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
}

// fusion des recherches
function searchFusion() {
    initIdResult();
    if (ingTag.length!=0) {   
        let a=idResult.filter(x => ingResult.includes(x));
        idResult=a;
    }
    if (appTag.length!=0) {   
        let a=idResult.filter(x => appResult.includes(x));
        idResult=a;
    }
    if (ustTag.length!=0) {   
        let a=idResult.filter(x => ustResult.includes(x));
        idResult=a;
    }
    if (searchResult.length!=0) {   
        let a=idResult.filter(x => searchResult.includes(x));
        idResult=a;
    }
    if (searchResult.length==0) {
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


// *****Ingrédients d'une recette*****
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


// *****Tags*****
// creation de la dropdown
function tagCreation(inp, arr) {
    // listener de la recherche
    inp.addEventListener("input", function(e) {
        majDropdown();
        if (inp==idIngredient) {
            arr=listIngredients;
        } else if (inp==idAppareil) {
            arr=listAppliance;
        } else {
            arr=listUstensils;
        }
        inp.classList.add("up");
        // si liste déja onverte, la ferme
        closeAllLists();
        // creation de la div pour la liste
        let a = document.createElement("ul");
        a.setAttribute("id", this.id + "-list");
        a.setAttribute("class", "new-choice");
        // ajoute ul
        this.parentNode.appendChild(a);
        // pour chaque item du tableau
        for (let i = 0; i < arr.length; i++) {
            let val = this.value;
        //   Controler si le texte commence par la ref
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            // creation div pour chaque ref trouvée
            let b = document.createElement("li");
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
// ferme au clic
document.addEventListener("click", function (e) {
    closeTag(e.target);
});
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
// champs de selection pour dropdown
tagCreation(idIngredient, listIngredients);
tagCreation(idAppareil, listAppliance);
tagCreation(idUstensiles, listUstensils);


// recupération des tags
function storeTags() {
    ingTag = [];
    appTag = [];
    ustTag = [];
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
}
