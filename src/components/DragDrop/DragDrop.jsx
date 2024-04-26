import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./DragDrop.css"

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ fileTypes, label, dropMessageStyle, pathtoicon, alt}) {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
      };

    if (file) {
            return(
                <FileUploader 
                    handleChange={handleChange} 
                    name="file" 
                    types={fileTypes} 
                    label={file.name} 
                    dropMessageStyle={dropMessageStyle}
                    pathtoicon={pathtoicon}
                    alt={alt}
                    children=
                    <div className={`generation-drag-drop-img-wrapper`}>
                        <div className='generation-drag-drop-img-text'>
                            {file.name}
                        </div>
                        <div className='generation-drag-drop-img-icon'>
                            <img src={pathtoicon} alt={alt} />
                        </div>
                    </div>
                />
            );
            
        } else {  

            return (
            <FileUploader 
                handleChange={handleChange} 
                name="file" 
                types={fileTypes} 
                label={label} 
                dropMessageStyle={dropMessageStyle}
                pathtoicon={pathtoicon}
                alt={alt}
                children=
                <div className={`generation-drag-drop-img-wrapper`}>
                    <div className='generation-drag-drop-img-text'>
                        {label}
                    </div>
                    <div className='generation-drag-drop-img-icon'>
                        <img src={pathtoicon} alt={alt} />
                    </div>
                </div>
            />
    );}
}

export default DragDrop;