import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationSuccessfulPage = () => {
  return (
    <div className='registration-success'>
      <h2>Your account is created successfully, click <Link to='/'>login</Link> to login..!</h2>
    </div>
  )
}

export default RegistrationSuccessfulPage
