import React from "react";

export function BtnExportPDF({exportPDF}){
    return <>
        <button className="btnExport" onClick={exportPDF}><i className="fa-solid fa-file-export"></i> PDF</button>
    </>
}