import React, {useState} from 'react';

import {Line} from "./components/Line.jsx";
import {AddLineButton} from "./components/AddLineButton.jsx";
import {DeleteLineButton} from "./components/DeleteLineButton.jsx";
import {ChordsMenu} from "./components/ChordsMenu.jsx";
import {getDataLocalStorage, updateLocalStorage} from "./functions/localStorage.jsx";
import {TimeSignature} from "./components/TimeSignature.jsx";
import {MeasurePerLine} from "./components/MeasurePerLine.jsx";
import {InputTitleScores} from "./components/InputTitleScores.jsx";
import {Reset} from "./components/Reset.jsx";
import { PDFExport } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import {BtnExportPDF} from "./components/BtnExportPDF.jsx";

function App() {


    let restoredDico;
    let defaultTimeSignature = 4;
    let defaultMeasurePerLine = calcDefaultMeasurePerLine();
    let defaultLineCount = 2;
    let defaultTitle = "Mon titre";

    function calcDefaultMeasurePerLine(){
        if (window.matchMedia("(max-width: 550px)").matches) return 1;
        return 2;
    }
    // Récupère les données du localStorage
    const storedDico = getDataLocalStorage();
    // Vérifie si des données sont stockées
    if (storedDico) {
        // Convertie les données JSON en tableau de tableaux
        const storedDicoArray = JSON.parse(storedDico);
        // // Créé une nouvelle Map à partir du tableau de tableaux
        restoredDico = new Map(storedDicoArray);
        defaultLineCount = restoredDico.get('lineCount') || defaultLineCount;
        defaultTimeSignature = restoredDico.get('timeSignature') || defaultTimeSignature ;
        defaultMeasurePerLine = restoredDico.get('measurePerLine') || defaultMeasurePerLine;
        defaultTitle = restoredDico.get('title') || defaultTitle;
    }


    const [timeSignature, setTimeSignature] = useState(defaultTimeSignature);
    const [measurePerLine, setMeasurePerLine] = useState(defaultMeasurePerLine);
    const [lineCount, setLineCount] = useState(defaultLineCount);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [measureClicked, setMeasureClicked] = useState('');
    const [title, setTitle] = useState(defaultTitle);
    const [dico, setDico] = useState(restoredDico ? new Map(restoredDico) : new Map());

    //changement 2/4, 3/4, 4/4
    const handleTimeChange = (event) => {
        const oldTimeSignature = timeSignature;
        const newTimeSignature = Number(event.target.value);
        setTimeSignature(newTimeSignature);
        const condition = `key.endsWith("-" + (oldValue - 1))`
        updateStructureScores("timeSignature", newTimeSignature, oldTimeSignature, condition)
    };

    //changement du nombre de mesures par lignes
    const handleMeasuresChange = (event) => {
        const oldMeasurePerLine = measurePerLine;
        const newMeasurePerLine = Number(event.target.value);
        setMeasurePerLine(newMeasurePerLine);
        const condition = `key.includes("-" + (oldValue - 1) + "-")`
        updateStructureScores("measurePerLine", newMeasurePerLine, oldMeasurePerLine, condition)
    };
    function updateStructureScores(keyName, newValue, oldValue, condition){
        //on récupère le local storage :
        let dataLocalStorage = getDataLocalStorage();
        if (dataLocalStorage) {
            const storedDicoArray = JSON.parse(dataLocalStorage);
            restoredDico = new Map(storedDicoArray);
            restoredDico.set(keyName, newValue);
            //supprimer les accords correspondant au temps supprimé seulement si on réduit le nombre de mesures par ligne
            if (oldValue > newValue){
                for (let [key, value] of restoredDico.entries()) {
                    // si le chiffre central de la clé correspond à 'oldMeasurePerLine'
                    if (eval(condition)) {
                        // Supprime l'entrée de la Map
                        restoredDico.delete(key);
                    }
                }
            }
            setDico(restoredDico);
            updateLocalStorage(restoredDico)
        }
    }

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
            // Itère sur les entrées de la Map pour supprimer toutes les mesures de la ligne supprimée.
            //Les mesures à supprimer sont identifiables par le premier chiffre de leurs identifiants, correspondant à la ligne
            for (let [key, value] of updatedDico.entries()) {
                // si la clé commence par le préfixe à supprimer
                if (key.startsWith((lineToDeleted - 1) + "-")) {
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

    // Met à jour le titre lors de la modification de l'entrée
    const handleTitleChange = (e) => {
        const titleName = e.target.value;
        setTitle(titleName);
        const updatedDico = new Map(dico);
        updatedDico.set('title', titleName)
        setDico(updatedDico);
        updateLocalStorage(updatedDico)
    };
    const reset = () => {
        setTimeSignature(4);
        setMeasurePerLine(calcDefaultMeasurePerLine)
        setLineCount(2)
        setTitle("Mon titre");
        setDico(prevDico => {
            let updatedDico = new Map()
            updateLocalStorage(updatedDico);
            return updatedDico;
        });
        updateLocalStorage(dico)

    }

    const pdfExportComponent = useRef();
    const exportPDF = () => {
        pdfExportComponent.current.save();
    };

    return (
        <>
            <h1>Éditeur de grille d'accords</h1>
            <div className="container">
                <div className="infoSetting">
                    <TimeSignature handleTimeChange={handleTimeChange} timeSignature={timeSignature}/>
                    <MeasurePerLine handleMeasuresChange={handleMeasuresChange} measurePerLine={measurePerLine}/>
                </div>
                <PDFExport ref={pdfExportComponent} scale={0.8} paperSize="A3">
                <div className="scoreContent">
                    <div className="title">
                        <InputTitleScores title={title} handleTitleChange={handleTitleChange}/>
                    </div>
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
                </div>
                </PDFExport>
                <div className="btnAddDelete">
                    <AddLineButton addLine={addLine}/>
                    <DeleteLineButton deleteLine={deleteLine}/>
                </div>
                <div className="btnResExp">
                    <Reset reset={reset}/>
                    <BtnExportPDF exportPDF={exportPDF} />
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