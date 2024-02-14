import React from "react";

export function InputTitleScores({title, handleTitleChange}){
    return <>
        <input
            className="inputTitle"
            type="text"
            value={title} // Lier la valeur de l'entrée à l'état du titre
            onChange={handleTitleChange} // Gérer les modifications de l'entrée
        />
    </>
}