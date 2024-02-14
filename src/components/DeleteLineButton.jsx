import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleMinus, faCirclePlus} from "@fortawesome/free-solid-svg-icons";

export function DeleteLineButton({ deleteLine }) {
    return (
        // On ajoute un gestionnaire d'événements onClick
        <div className="deleteButton" onClick={deleteLine}>
            <FontAwesomeIcon icon={faCircleMinus}/>
        </div>
    );
}