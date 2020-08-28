import React from 'react';

const ImageLinkForm = ({onInputChange, onSubmit, onEnter}) =>{
    return(
        <div>
            <p className='f3'>
                {
                    'This voodoo magic will detect faces 👀'
                }
            </p>
            <div className='center'>
                <div className='center form pa4  br3 shadow-5'>
                    <input onKeyPress={onEnter} onChange={onInputChange} className='f4 pa2 w-70 center ba b--black-30 br3' placeholder='enter image url' type='text' />
                    <button onClick={onSubmit} className='w-30 grow link ba b--black-30 f4 ph3 pv2 dib white bg-blue br3'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;