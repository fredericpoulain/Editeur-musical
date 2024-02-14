import React from "react";

export function TimeSignature ({handleTimeChange, timeSignature}){
    return <>
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
    </>
}