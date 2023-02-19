import React from 'react'
import '../../src/IndexPage.css'
import {Link} from 'react-router-dom'

function Index(props) {
  return (
    <div className="container mb-5">
        <div className="row">
            <div className="col-lg-6 col-12">
                <div className="signuppage-content">
                    <h1>MySite</h1>
                    <p>This is caption</p>
                </div>
            </div>
            <div className="col-lg-6 col-12">
                <div className="signup-box shadow-lg">
                    <form action="/home" method="post">
                        <div className="d-flex flex-column justify-content-center p-5">
                            <div>
                                <input className="input-box" type="text" id="fname" name="fname"
                                    placeholder="  First Name*" value={props.textValue.fname} onChange={props.handleSignupChange} />
                            </div>
                            <div>
                                <input className="input-box" type="text" name='lname' id="lname" placeholder="  Last Name*" value={props.textValue.lname} onChange={props.handleSignupChange} />
                            </div>
                            <div>
                                <input className="input-box" type="email" name='mailID' id="email"
                                    placeholder="  Email Address*" value={props.textValue.mailID} onChange={props.handleSignupChange} />
                            </div>
                            <div>
                                <input className="input-box" type="password" name='password' id="pwd"
                                    placeholder="  Password*" value={props.textValue.password} onChange={props.handleSignupChange}/>
                            </div>
                            <div>
                                <input className="input-box" type="password" name='cpassword' id="cpwd"
                                    placeholder="  Confirm password*" value={props.textValue.cpassword} onChange={props.handleSignupChange}/>
                            </div>
                            <div className="button-box">
                                <Link to={props.signRoute} type="submit" className="signup-button btn btn-primary" onClick={props.createAccount}>Sign-Up</Link>
                            </div>
                            <hr />
                            <div className="button-box">
                            <p>Already have an account ?</p>
                                <Link to='/Login' type="submit" className="signup-button btn btn-primary" >Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index
