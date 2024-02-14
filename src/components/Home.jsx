import React, {useState} from "react";
import {Line} from "./Line";
import {AddLineButton} from "./AddLineButton";
import {ChordsMenu} from "./ChordsMenu";
import {DeleteLineButton} from "./DeleteLineButton";

export function Home() {

    // Récupérer les données du localStorage
    const storedDico = localStorage.getItem('scores');
    let restoredDico;
    let defaultTimeSignature = 4;
    let defaultMeasurePerLine = 2;
    let defaultLineCount = 2;
    // Vérifier si des données sont stockées
    if (storedDico) {
        // Convertir les données JSON en tableau de tableaux
        const storedDicoArray = JSON.parse(storedDico);
        // // Créer une nouvelle Map à partir du tableau de tableaux
        restoredDico = new Map(storedDicoArray);
        defaultLineCount = restoredDico.get('lineCount');
    }

    // const element = null;
    const [timeSignature, setTimeSignature] = useState(defaultTimeSignature);
    const handleTimeChange = (event) => {
        setTimeSignature(event.target.value);
    };
    const [measurePerLine, setMeasurePerLine] = useState(defaultMeasurePerLine);
    const handleMeasuresChange = (event) => {
        setMeasurePerLine(event.target.value);
    };

    // On initialise l'état avec au moins une ligne
    const [lineCount, setLineCount] = useState(defaultLineCount);

    const [isShowMenu, setIsShowMenu] = useState(false); // Nouvel état pour l'ouverture du menu
    // const [measureClicked, setMeasureClicked] = useState(element); // Nouvel état pour l'élément cliqué'
    const [measureClicked, setMeasureClicked] = useState(''); // Nouvel état pour l'élément cliqué'
    const [title, setTitle] = useState("Mon titre"); // État pour stocker le titre



    const [dico, setDico] = useState(restoredDico ? new Map(restoredDico) : new Map());
    console.log(dico)
    // Fonction pour incrémenter le nombre de lignes
    const addLine = () => {
        setLineCount(lineCount + 1);
    };
    const deleteLine = () => {
        if (lineCount > 1) {
            const lineToDeleted = lineCount;
            // On décrémente l'état lineCount
            setLineCount(lineCount - 1);
            // Mettre à jour le dico pour refléter le nouveau lineCount
            const updatedDico = new Map(dico);
            updatedDico.set("lineCount", lineCount - 1);
            // Itérer sur les entrées de la Map
            for (let [key, value] of updatedDico.entries()) {
                // Vérifier si la clé commence par le préfixe à supprimer
                if (key.startsWith((lineToDeleted-1) + "-")) {
                    // Supprimer l'entrée de la Map
                    updatedDico.delete(key);
                }
            }
            setDico(updatedDico);
            // Convertir la Map en un tableau de tableaux
            const entriesArray = Array.from(updatedDico.entries());
            // Convertir en JSON et enregistrer dans le localStorage
            localStorage.setItem('scores', JSON.stringify(entriesArray));
            console.log(dico)
        }
    };
    // Fonction pour gérer le clic sur le beat
    const handleBeatClick = () => {
        // console.log(element)
        setIsShowMenu(!isShowMenu); // Mettre à jour l'ouverture du menu lorsque le clic se produit
        // setMeasureClicked(element); // Mettre à jour l'élément cliqué lorsque le clic se produit

    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value); // Mettre à jour le titre lors de la modification de l'entrée
    };


    return (
        <>
            <h1>Éditeur de grille d'accords</h1>
            <div className="container">
                <div className="infoSetting">
                    <div className="timeSignatureBloc">
                        <p>Temps par mesures : </p>
                        <div>
                            <input type="radio" id="2-4" name="time" value="2" checked={timeSignature === 2}
                                   onChange={handleTimeChange}/>
                            <label htmlFor="2-4">2/4</label>
                            <input type="radio" id="3-4" name="time" value="3" checked={timeSignature === 3}
                                   onChange={handleTimeChange}/>
                            <label htmlFor="3-4">3/4</label>
                            <input type="radio" id="4-4" name="time" value="4" checked={timeSignature === 4}
                                   onChange={handleTimeChange}/>
                            <label htmlFor="4-4">4/4</label>
                        </div>
                    </div>
                    <div className="timeSignatureBloc">
                        <p>Nombre de mesure par lignes : </p>
                        <div>
                            <input type="radio" id="1-measures" name="measurePerLine" value="1"
                                   checked={measurePerLine === 1}
                                   onChange={handleMeasuresChange}/>
                            <label htmlFor="1-measures">1</label>
                            <input type="radio" id="2-measures" name="measurePerLine" value="2"
                                   checked={measurePerLine === 2}
                                   onChange={handleMeasuresChange}/>
                            <label htmlFor="2-measures">2</label>
                            <input type="radio" id="3-measures" name="measurePerLine" value="3"
                                   checked={measurePerLine === 3}
                                   onChange={handleMeasuresChange}/>
                            <label htmlFor="3-measures">3</label>
                        </div>
                    </div>


                    {/*<p>Nombre de mesure par lignes : {measurePerLine}</p>*/}
                </div>
                <input
                    className="inputTitle"
                    type="text"
                    value={title} // Lier la valeur de l'entrée à l'état du titre
                    onChange={handleTitleChange} // Gérer les modifications de l'entrée
                />
                {/*On utilise une boucle pour afficher le nombre de lignes souhaité */}
                <div className="lines">
                    {Array.from({length: lineCount}, (v, i) => (

                        <Line
                            key={`line-${i}`}
                            timeSignature={timeSignature}
                            measurePerLine={measurePerLine}
                            onBeatClick={handleBeatClick}
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
                onBeatClick={handleBeatClick}
                dicoState={[dico, setDico]}
                measureClickedState={[measureClicked, setMeasureClicked]}
                infoScores={[timeSignature, measurePerLine, lineCount]}
            />
        </>
    );
}


