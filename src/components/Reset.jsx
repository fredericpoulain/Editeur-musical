import React from "react";

export function Reset({reset}){
    const handleClickReset = () => {
        reset();
    };
    return <>
        <button className="btnReset" onClick={handleClickReset}>Reset</button>
    </>
}