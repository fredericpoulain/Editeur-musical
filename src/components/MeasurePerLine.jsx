import React from "react";

export function MeasurePerLine ({handleMeasuresChange, measurePerLine}){
    return <>
        <div className="measurePerLineBloc">
            <p>Nombre de mesure par lignes : </p>
            <div>
                <div className="OneMeasures">
                    <input type="radio" id="1-measures" name="measurePerLine" value="1"
                           checked={measurePerLine === 1}
                           onChange={handleMeasuresChange}/>
                    <label htmlFor="1-measures">1</label>
                </div>
                <div className="twoMeasures">
                    <input type="radio" id="2-measures" name="measurePerLine" value="2"
                           checked={measurePerLine === 2}
                           onChange={handleMeasuresChange}/>
                    <label htmlFor="2-measures">2</label>
                </div>
                <div className="threeMeasures">
                    <input type="radio" id="3-measures" name="measurePerLine" value="3"
                           checked={measurePerLine === 3}
                           onChange={handleMeasuresChange}/>
                    <label htmlFor="3-measures">3</label>
                </div>
            </div>
        </div>
    </>
}