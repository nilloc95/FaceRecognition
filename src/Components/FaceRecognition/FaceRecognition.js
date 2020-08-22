import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box }) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' className='pb4 pt2' width='500px' heigh='auto' src={imageURL} alt=''/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition