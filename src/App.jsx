import React, {useState} from 'react';

import {Line} from "./components/Line.jsx";
import {AddLineButton} from "./components/AddLineButton.jsx";
import {DeleteLineButton} from "./components/DeleteLineButton.jsx";
import {ChordsMenu} from "./components/ChordsMenu.jsx";
import {getDataLocalStorage, updateLocalStorage} from "./functions/localStorage.jsx";
import {TimeSignature} from "./components/TimeSignature.jsx";
import {MeasurePerLine} from "./components/MeasurePerLine.jsx";
import {InputTitleScores} from "./components/InputTitleScores.jsx";

function App() {


    let restoredDico;
    let defaultTimeSignature = 4;
    let defaultMeasurePerLine = 2;
    let defaultLineCount = 2;

    // Récupérer les données du localStorage
    const storedDico = getDataLocalStorage();
    // Vérifier si des données sont stockées
    if (storedDico) {
        // Convertir les données JSON en tableau de tableaux
        const storedDicoArray = JSON.parse(storedDico);
        // // Créer une nouvelle Map à partir du tableau de tableaux
        restoredDico = new Map(storedDicoArray);
        defaultLineCount = restoredDico.get('lineCount');
    }


    const [timeSignature, setTimeSignature] = useState(defaultTimeSignature);
    const [measurePerLine, setMeasurePerLine] = useState(defaultMeasurePerLine);
    const [lineCount, setLineCount] = useState(defaultLineCount);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [measureClicked, setMeasureClicked] = useState('');
    const [title, setTitle] = useState("Mon titre");
    const [dico, setDico] = useState(restoredDico ? new Map(restoredDico) : new Map());

    //changement 2/4, 3/4, 4/4
    const handleTimeChange = (event) => {
        const newTimeSignature = Number(event.target.value);
        setTimeSignature(newTimeSignature);
        console.log(newTimeSignature)
        //on récupère le local storage :
        let dataLocalStorage = getDataLocalStorage();
        // on le transforme en tableau
        if (dataLocalStorage) {
            // Convertir les données JSON en tableau de tableaux
            const storedDicoArray = JSON.parse(dataLocalStorage);
            // // Créer une nouvelle Map à partir du tableau de tableaux
            restoredDico = new Map(storedDicoArray);
            restoredDico.set("timeSignature", newTimeSignature);
            //a ce stade le map est mis à jours (normalement)
            //reste à le remttre en tableau et à le réincorpérer dans le localstorage
        }
    };

    //changement du nombre de mesures par lignes
    const handleMeasuresChange = (event) => {
        setMeasurePerLine(Number(event.target.value));
    };


    // Fonction pour ajouter une ligne
    const addLine = () => {
        setLineCount(lineCount + 1);
    };

    // Fonction pour supprimer une ligne
    //Il faudra donc supprimer les accords de la ligne du côté du "useState" et "LocalStorage"
    const deleteLine = () => {
        if (lineCount > 1) {
            const lineToDeleted = lineCount;
            // On décrémente l'état lineCount
            setLineCount(lineCount - 1);
            // Met à jour le dico pour refléter le nouveau lineCount
            const updatedDico = new Map(dico);
            updatedDico.set("lineCount", lineCount - 1);
            // Itérer sur les entrées de la Map pour supprimer toutes les mesures de la ligne supprimée.
            //Les mesures à supprimer sont identifiables par le premier chiffre de leurs identifiants, correspondant à la ligne
            for (let [key, value] of updatedDico.entries()) {
                // si la clé commence par le préfixe à supprimer
                if (key.startsWith((lineToDeleted-1) + "-")) {
                    // Supprime l'entrée de la Map
                    updatedDico.delete(key);
                }
            }
            //Met à jour le dico useState et le localStorage
            setDico(updatedDico);
            updateLocalStorage(updatedDico)
            
        }
    };
    // Fonction pour gérer le clic sur la mesure
    const handleClickForMenu = () => {
        setIsShowMenu(!isShowMenu); // Mettre à jour l'ouverture du menu lorsque le clic se produit
    };

    // Mettre à jour le titre lors de la modification de l'entrée
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <>
            <h1>Éditeur de grille d'accords</h1>
            <div className="container">
                <div className="infoSetting">
                    <TimeSignature handleTimeChange={handleTimeChange} timeSignature={timeSignature} />
                    <MeasurePerLine handleMeasuresChange={handleMeasuresChange} measurePerLine={measurePerLine} />
                </div>
                <InputTitleScores title={title} handleTitleChange={handleTitleChange}/>
                <div className="lines">
                    {Array.from({length: lineCount}, (v, i) => (
                        <Line
                            key={`line-${i}`}
                            timeSignature={timeSignature}
                            measurePerLine={measurePerLine}
                            onMeasureClick={handleClickForMenu}
                            lineNumber={i}
                            dicoState={[dico, setDico]}
                            measureClickedState={[measureClicked, setMeasureClicked]}
                        />
                    ))}
                </div>
                <div className="btnAddDelete">
                    <AddLineButton addLine={addLine}/>
                    <DeleteLineButton deleteLine={deleteLine}/>
                </div>
            </div>
            <ChordsMenu
                showMenuChord={isShowMenu}
                closeMenu={handleClickForMenu}
                dicoState={[dico, setDico]}
                measureClickedState={[measureClicked, setMeasureClicked]}
                infoScores={[timeSignature, measurePerLine, lineCount]}
            />
        </>
    );
}
export default App
