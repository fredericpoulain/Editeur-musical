const KEY_LOCALSTORAGE = 'scores';

export function updateLocalStorage(updatedDico){
    // Converti la Map en un tableau de tableaux
    const entriesArray = Array.from(updatedDico.entries());
    // Converti en JSON et enregistrer dans le localStorage
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(entriesArray));
}

export function getDataLocalStorage(){
    return localStorage.getItem(KEY_LOCALSTORAGE);
}

