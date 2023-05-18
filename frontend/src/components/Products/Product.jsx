import React, { useEffect, useState } from 'react'
import "./Product.css"
import Modal from '../modal/Modal';


const Product = () => {
    const[capsdata, setCapsData] = useState([]);
    const[isOpen, setOpen] = useState(false)
    const[serielId, setSerielID] = useState();
    const[text, setText] = useState("");
    const[showData, setDataShow] = useState([])

    const handleOpen = (id) => {
        setOpen(true)
        setSerielID(id)
    }

    const getData = () => {
        fetch('https://api.spacexdata.com/v3/capsules').then((res) => res.json()).then((data) => setCapsData(data))
    }

    const getSearchedData = () => {
        const filterData = capsdata.filter(item => item.status === text || item.original_launch === text || item.type === text)
        setDataShow(filterData)
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if(isOpen){
            window.scrollTo({top: 0, left:0, behavior : 'smooth'});
        }
    }, [isOpen])

    useEffect(() => {
        if(text === ""){
            setDataShow(capsdata)
        }
    },[text])


    return (
        <div style={{position: "relative"}}>
        
            <div className='navbarDiv'>
                <input type="text"  placeholder='Search' onChange={(e) =>setText(e.target.value)} />
                <button onClick={getSearchedData}>Submit</button>
            </div>

            <div className='bannerDiv'>
                <img src={'./assets/banner.jpg'} alt="banner" />
            </div>

            <h1>Capsules</h1>

            <div className='parentBox'>
                {showData.map((caps) => (
                    <div className='box' onClick={() => handleOpen(caps.capsule_serial)}>
                        <h2>Details: {caps.details}</h2>
                        <h2>Type: {caps.type}</h2>
                        <h2>Capsule Seriel: {caps?.capsule_serial}</h2>
                        <h2>Mission Name: {caps?.missions[0]?.name}</h2>
                    </div>
                ))}
            </div>
                    <Modal isOpen={isOpen} setOpen={setOpen} serielId={serielId}/>
        </div>
    )
}

export default Product
