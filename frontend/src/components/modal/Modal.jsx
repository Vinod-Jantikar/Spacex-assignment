import React, { useEffect } from 'react'
import './Modal.css'
import { useState } from 'react';

const Modal = ({isOpen,setOpen, serielId}) => {

    const [capsdata, setCapsData] = useState(null);
    const[loading, setLoading] = useState(false)
   
    const getData = () => {
        setLoading(true)
        fetch(`https://api.spacexdata.com/v3/capsules/${serielId}`).then((res) => res.json()).then((data) => {
            setCapsData(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [serielId])


    if(loading) {
        return <h1>Loading....</h1>
    }

    
  return (
    <>
    {
        isOpen ? ( <div className='outerBox' >
        <div className='innerBox' style={{position: "relative"}}>
        <button style={{position: 'absolute', right: "0", top: "0"}} onClick={() => setOpen(false)}>Close</button>
       <div style={{padding: "20px"}}>
       <h2>Details: {capsdata.details}</h2>
        <h2>Type: {capsdata.type}</h2>        
        <h2>Capsule Seriel: {capsdata.capsule_serial}</h2>     
        </div> 
        </div>

      
    </div>) : null
    }
   
    </>
  )
}

export default Modal
