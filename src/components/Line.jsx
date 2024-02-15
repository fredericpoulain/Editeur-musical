import React from 'react';

export function Line({timeSignature, measurePerLine, onMeasureClick, lineNumber, dicoState, measureClickedState}) {
    const widthBeat = 100 / timeSignature;

    const [dico, setDico] = dicoState;
    const [measureClicked, setMeasureClicked] = measureClickedState;
    const handleClickShowMenu = (e, lineNumber, measure, pulsation) => {

        const idMeasureClicked = `${lineNumber}-${measure}-${pulsation}`;
        setMeasureClicked(idMeasureClicked)

        /**
         * On utilise setDico avec cette fonction de rappel, pour garantir que les mises à jour d'état dans l'application sont basées
         * ...sur les valeurs les plus récentes
         */
        setDico(prevDico => {
            const updatedDico = new Map(prevDico);
            updatedDico.set(idMeasureClicked, updatedDico.get(idMeasureClicked) || '');
            return updatedDico;
        });
        onMeasureClick();

    };
    return (
        <div className='lineContainer'>

            <div className='line'> {

                Array.from({length: measurePerLine}, (v, measure) =>
                    // div "measure" représente une mesure.
                    // On boucle un certain nombre de fois (measurePerLine) pour avoir le nombre de mesures désiré
                    <div key={`${lineNumber}-${measure}`} className='measure'>
                        {
                            // div "beats" représente un temps.
                            // On boucle un certain nombre de fois (timeSignature) pour avoir le nombre de temps par mesure
                            Array.from({length: timeSignature}, (t, pulsation) =>
                                <div
                                    style={{width: `${widthBeat}%`}}
                                    key={`${lineNumber}-${measure}-${pulsation}`}
                                    className='beat'
                                    onClick={(e) => handleClickShowMenu(e, lineNumber, measure, pulsation)}
                                >
                                    {dico && dico.get(`${lineNumber}-${measure}-${pulsation}`)}
                                </div>
                            )
                        }
                    </div>
                )
            }
            </div>
        </div>

    );
}

