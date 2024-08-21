import React from 'react'
import {Link} from "react-router-dom";

function Modal({handleModalBtn, status}) {
  return (
    <div className='modal-container'>
        <div className='modal'>
            <img alt='??' src='../error.png' />
            <p>{status?.message ? status.message :"Sorry! Enter correct Seed Phrase"}</p>
        <Link to="/" onClick={handleModalBtn} className='btn modal_btn' >Go Back</Link>
        </div>
    </div>
  )
}

export default Modal;