import React from 'react';

export function BeatsLine({ timeSignature, measurePerLine }) {
    console.log(timeSignature);

    return (
        <div className='container'>
            <div className='beatsLine'>
                {

                    Array.from({length: measurePerLine}, (v, j) =>
                        // div "measure" représente une mesure.
                        // On boucle un certain nombre de fois (measurePerLine) pour avoir le nombre de mesures désiré
                        <div key={j} className='beatsMeasure'>
                            {
                                // div "beats" représente un temps.
                                // On boucle un certain nombre de fois (timeSignature) pour avoir le nombre de temps par mesure
                                Array.from({length: timeSignature}, (t, i) =>
                                    <div key={i} className='beat'>*</div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>

    );
}
