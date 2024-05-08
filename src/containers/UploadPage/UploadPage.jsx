import React, { useState, useEffect } from 'react';
import "./UploadPage.css"
import Upload from "../../components/Upload/Upload"


const UploadPage = () => {
    return (
        <div className="right-selection">
            <Upload/>
        </div>
    );
};

export default UploadPage;