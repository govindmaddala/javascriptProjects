import React from 'react'

function DeleteSection(props) {
  return (
    <div style={{backgroundColor:"white"}} className="p-3 shadow-lg delete-section-card">
        <h3 className='task-heading'>{props.titleProp}</h3>
        <p className='task-content'>{props.contentProp}</p>
      </div>
  )
}

export default DeleteSection
