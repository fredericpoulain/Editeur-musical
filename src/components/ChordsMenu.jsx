import React, {useState} from 'react';
import {updateLocalStorage} from "../functions/localStorage.jsx";


export function ChordsMenu({showMenuChord, closeMenu, dicoState, measureClickedState, infoScores}) {
    const notes = ["A", "B", "C", "D", "E", "F", "G"];
    const alterations = ["♭", "♯"];
    const qualities = ["m"];
    const chordColor = ["4", "5", "6", "7", "M7", "9", "11"];

    const [selectedNote, setSelectedNote] = useState("");
    const [selectedAlteration, setSelectedAlteration] = useState("");
    const [selectedQuality, setSelectedQuality] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [dico, setDico] = dicoState;
    const [measureClicked, setMeasureClicked] = measureClickedState;
    const [timeSignature, measurePerLine, lineCount] = infoScores;
    const handleClickClosed = () => {
        closeMenu();
    };

    const selectNote = (note) => {
        setSelectedNote(prevState => prevState === note ? "" : note);
    };

    const selectAlteration = (alteration) => {
        setSelectedAlteration(prevState => prevState === alteration ? "" : alteration);
    };

    const selectQuality = (quality) => {
        setSelectedQuality(prevState => prevState === quality ? "" : quality);
    };

    const selectColor = (color) => {
        setSelectedColor(prevState => prevState === color ? "" : color);
    };

    const combineChord = () => {
        const chordConbinated = selectedNote + selectedAlteration + selectedQuality + selectedColor;
        const firstCaract = chordConbinated[0];
        if (notes.includes(firstCaract)){
            // code non fonctionnel : voir composant Line pr plus d'infos
            // const updatedDico = new Map(dico);
            // updatedDico.set(measureClicked, chordConbinated);
            // setDico(updatedDico);
            // console.log(dico)
            // // Convertir la Map en un tableau de tableaux
            // const entriesArray = Array.from(dico.entries());
            // // Convertir en JSON et enregistrer dans le localStorage
            // localStorage.setItem('dicoChord', JSON.stringify(entriesArray));
            setDico(prevDico => {
                console.log(prevDico)
                const updatedDico = new Map(prevDico);
                // const [timeSignature, measurePerLine, lineCount] = infoScores;
                updatedDico.set('timeSignature', timeSignature);
                updatedDico.set('measurePerLine', measurePerLine);
                updatedDico.set('lineCount', lineCount);
                updatedDico.set(measureClicked, chordConbinated);
                updateLocalStorage(updatedDico);
                console.log(updatedDico)
                return updatedDico;
            });
            closeMenu();
        }

    };
    const deleteChord = () => {
        // console.log(measureClicked)
        setDico(prevDico => {
            const updatedDico = new Map(prevDico);
            // const [timeSignature, measurePerLine, lineCount] = infoScores;
            updatedDico.delete(measureClicked);
            updateLocalStorage(updatedDico);
            return updatedDico;
        });

    };



    return (
        <div className={`chordContainer ${showMenuChord ? 'chordContainerShow' : ''}`}>
            <div className="closeChord" onClick={handleClickClosed}><i className="fa-solid fa-xmark"></i></div>

            <div className="chordPart">
                <ul className="circle">
                    {notes.map((note, index) => (
                        <li key={index}
                            className={`${selectedNote === note ? 'selected' : ''}`}
                            onClick={() => selectNote(note)}>
                            <div className="text"><span>{note}</span></div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chordAlteration">
                {alterations.map((alteration, index) => (
                    <div key={index} className={`${selectedAlteration === alteration ? 'selected' : ''}`}
                         onClick={() => selectAlteration(alteration)}>
                        {alteration}
                    </div>
                ))}
            </div>
            <div className="chordThird">
                <h4>Tierce : </h4>
                {qualities.map((quality, index) => (
                    <div key={index} className={`${selectedQuality === quality ? 'selected' : ''}`}
                         onClick={() => selectQuality(quality)}>
                        {quality}
                    </div>
                ))}
            </div>
            <div className="chordColor">
                <h4>Couleur de l'accord : </h4>
                {chordColor.map((color, index) => (
                    <div key={index} className={`${selectedColor === color ? 'selected' : ''}`}
                         onClick={() => selectColor(color)}>
                        <span>{color}</span>
                    </div>
                ))}
            </div>
            <button className="btnInsert" onClick={combineChord}>Valider</button>
            <div>
                <button className="btnDelete" onClick={deleteChord}>Effacer l'accord</button>
            </div>
        </div>
    );

}
