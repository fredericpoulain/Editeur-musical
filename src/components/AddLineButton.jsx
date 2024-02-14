import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export function AddLineButton({ addLine }) {
    return (
        // On ajoute un gestionnaire d'événements onClick
        <div className="addButton" onClick={addLine}>
            <FontAwesomeIcon icon={faCirclePlus}/>
        </div>
    );
}