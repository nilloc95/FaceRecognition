import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '54ac658f7bb242589963799c3536d0e3'
 });

const particleParams ={
  particles:{
    number:{
      value:30,
      density:{
        enable:true,
        value_area:400,
      }
    }
  }
}

class App extends Component{
  constructor(){
    super();
    this.state ={
      input: '',
      imageURL:'',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
    }
  } 

  calculateFaceLocation = (data) => {
    const clarifaiFaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFaceBox)
    const image = document.getElementById('inputimage');
    const w = Number(image.width);
    const h = Number(image.height);
    return{
      leftCol: clarifaiFaceBox.left_col * w,
      topRow: clarifaiFaceBox.top_row * h,
      rightCol: w - (clarifaiFaceBox.right_col * w),
      bottomRow: 1.1*h - (clarifaiFaceBox.bottom_row*h),
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({'box': box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onSubmit = (e) => {
    this.setState({ imageURL: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log('error', error))
  }

  onRouteChange = (route) =>{
    if (route === 'home'){
      this.setState({isSignedIn: true})
    } else if(route==='SignIn') {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params ={particleParams}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
            ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div>
            :(
              route === 'SignIn'
              ? <SignIn onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
            )
             
          } 
      </div>
    );
  }
}

export default App;
