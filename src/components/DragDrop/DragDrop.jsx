import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./DragDrop.css"

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ fileTypes, label, dropMessageStyle, pathtoicon, alt, set_file_var}) {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        console.log('handle');
        setFile(file);
        set_file_var(file);
      };
       
    return (
    <FileUploader 
        handleChange={handleChange} 
        name="file" 
        types={fileTypes} 
        dropMessageStyle={dropMessageStyle}
        pathtoicon={pathtoicon}
        alt={alt}
        children=
        <div className={`generation-drag-drop-img-wrapper`}>
            <div className='generation-drag-drop-img-text'>
                {file && file.name ? file.name : label}
            </div>
            <div className='generation-drag-drop-img-icon'>
                <img src={pathtoicon} alt={alt} />
            </div>
        </div>
    />
    );
}

export default DragDrop;