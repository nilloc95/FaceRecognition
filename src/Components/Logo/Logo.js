import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './Brain.png';

const Logo = () => {
    return(
        <div style={{zIndex:'-1'}} className='ma4 mt6 center pt4'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 200, width: 200 }} >
            <div className="Tilt-inner pa2 pt4"> 
                <img src={brain} alt="logo"/> 
            </div>
            </Tilt>
        </div>
    );
}

export default Logo