import React from 'react'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('https://murmuring-coast-37889.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                this.props.loadUser(data)
                this.props.onRouteChange('home')  
            } else {alert('Wrong email or password')}
        })
        
    }


    render() {
        const enterToSubmit = (event) =>{
            if (event.keyCode === 13) {
                this.onSubmitSignIn();
            };
        }
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input 
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset b--black-10 ba shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                    type="email"   
                                    name="email-address"  
                                    id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label 
                                    className="db fw6 lh-copy f5" 
                                    htmlFor="password">Password</label>
                                <input 
                                    onKeyDown={enterToSubmit}
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset b--black-10 ba shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link br1 ba pointer grow mh5 black db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;