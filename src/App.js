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

const initialState = {
    input: '',
    imageURL:'',
    box: {},
    route: 'SignIn',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState
  } 

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
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
    this.setState({'box': box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onSubmit = (e) => {
    this.setState({ imageURL: this.state.input });
      fetch('https://murmuring-coast-37889.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(resp => resp.json())
      .then(response => {
        if (response){
          fetch('https://murmuring-coast-37889.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log('error', error))
  }

  onRouteChange = (route) =>{
    if (route === 'home'){
      this.setState({isSignedIn: true})
    } else if(route==='SignIn') {
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  onEnter = (event) =>{
    if (event.keyCode === 13) {
        this.onSubmit();
    };
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onEnter={this.onSubmit} onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div>
            :(
              route === 'SignIn'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
             
          } 
      </div>
    );
  }
}

export default App;
