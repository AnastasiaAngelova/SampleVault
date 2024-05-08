import React  from 'react';
import "./ImageSection.css"

export function ImageSection() {
  
    return (
        <div className="new-block_images">
            <div >
            <img src={'ImageSection/image.png'} alt='image1' className="large-image" />
            </div>
            <div className="small-images">
                <img src={'ImageSection/image2.png'} alt='image2' className="small-image" />
                <img src={'ImageSection/image1.png'} alt='image3' className="small-image" />
            </div>
            <div className="small-images">
                <img src={'ImageSection/image1.png'} alt='image4' className="small-image" />
                <img src={'ImageSection/image3.png'} alt='image5' className="small-image" />
            </div>
        </div>
    );
  };
  