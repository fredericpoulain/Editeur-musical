import React from 'react';

export function Line({ timeSignature, measurePerLine, onMeasureClick, lineNumber, dicoState, measureClickedState}) {
    const widthBeat = 100 / timeSignature;

    const [dico, setDico] = dicoState;
    const [measureClicked, setMeasureClicked] = measureClickedState;
    // console.log(lineNumber)
    const handleClickShowMenu = (e, lineNumber, measure, pulsation) => {

        const idMeasureClicked = `${lineNumber}-${measure}-${pulsation}`;
        setMeasureClicked(idMeasureClicked)

        /**
         * ici on peux pas faire ça :
         *  const updatedDico = new Map(dico);
         *  updatedDico.set(idMeasureClicked, updatedDico.get(idMeasureClicked) || '');
         *  setDico(updatedDico);
         *  => Lorsque vous utilisez setDico en lui passant directement une valeur, cela peut poser problème lorsque vous essayez
         *  d'accéder à la valeur mise à jour immédiatement après avoir appelé setDico,
         *  car React ne garantit pas que l'état sera immédiatement mis à jour.
         *  Cela peut entraîner des problèmes si vous essayez d'accéder à l'état mis à jour immédiatement après
         *  avoir appelé setDico, car il peut toujours contenir l'ancienne valeur.
         *  (en fait React est tellement reactif (d'ou son nom) qu'il envoit la valeur dico avant que je useSate met à jour la nouvelle valeur
         *
         *  La solution c'est de passer une fonction de rappel :
         *  Lorsque vous appelez setDico avec cette fonction de rappel, React garantit que la fonction de rappel sera appelée avec la dernière valeur de l'état, ce qui signifie que prevDico sera toujours la version la plus récente de dico. En utilisant cette approche, vous évitez les problèmes de mise à jour asynchrone de l'état, car vous travaillez toujours avec la version la plus récente de l'état.
         *
         * Cela garantit que les mises à jour d'état dans votre application sont basées sur les valeurs les plus récentes,
         * ce qui aide à éviter les erreurs liées à la mise à jour asynchrone de l'état.
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

            <div className='line'>                {

                    Array.from({length: measurePerLine}, (v, measure) =>

                        // div "measure" représente une mesure.
                        // On boucle un certain nombre de fois (measurePerLine) pour avoir le nombre de mesures désiré
                        <div key={`${lineNumber}-${measure}`} className='measure'>
                            {
                                // div "beats" représente un temps.
                                // On boucle un certain nombre de fois (timeSignature) pour avoir le nombre de temps par mesure
                                Array.from({length: timeSignature}, (t, pulsation) =>
                                    <div
                                        // data-id={`${lineNumber}-${j}-${i}`}
                                        style={{width: `${widthBeat}%`}}
                                        key={`${lineNumber}-${measure}-${pulsation}`}
                                        className='beat'
                                        onClick={(e) => handleClickShowMenu(e, lineNumber, measure, pulsation)}
                                    >
                                        {dico && dico.get(`${lineNumber}-${measure}-${pulsation}`)}
                                        {/*<span className="signBeat"><i className="fa-solid fa-plus"></i></span>*/}
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

