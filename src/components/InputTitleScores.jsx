import React from "react";

export function InputTitleScores({title, handleTitleChange}){
    return <>
        <input
            className="inputTitle"
            type="text"
            value={title}
            onChange={handleTitleChange}
        />
    </>
}