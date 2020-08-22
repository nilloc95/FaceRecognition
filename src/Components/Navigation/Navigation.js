import React from 'react';

const Navigation = ( {onRouteChange, isSignedIn } ) =>{
        if(isSignedIn){
            return(
                    <div className='shadow-2' style={{ zIndex:1,top:'0', position:'fixed', width:'100%'}}>
                        <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                            <p onClick={() => onRouteChange('SignIn')} className="f3 link dim black underline pa0 mr5 pointer">Sign Out</p>
                        </nav>
                    </div> 
                );           
        } else{
            return(
                    <div className='shadow-2' style={{zIndex:1,top:'0', position:'fixed', width:'100%'}}>
                        <nav style={{ display: 'flex', justifyContent:'flex-end'}} >
                            <p onClick={() => onRouteChange('SignIn')} className="f3 link dim black underline pa0 mr5 pointer">Sign In</p>
                            <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa0 mr5 pointer">Register</p>
                        </nav>
                    </div>
            );
        }
}

export default Navigation;