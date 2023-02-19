import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
    const [imageData, setImageData] = useState([]);
    // const [frontendImages, setFrontendImages] = useState([]);
    useEffect(() => {
        axios.get('/images/get').then((res) => {
            setImageData(res.data)
        }).catch((err) => {
            console.log(err);
        })
    })


    function handleChange(event) {
        console.log(`Selected file - ${event.target.files[0].name}`);
    }

    function fileSend(event){
        axios.post('/images/upload').data({
            name:"from frontend",
            filename:event.target.files[0].name
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }


    return (
        <div>
            <h2>Home of Images</h2>
            <form action="/" method="post">
                <input type="file" onChange={handleChange} />
                <button onSubmit={fileSend}>Submit</button>
            </form>
            {
                imageData.map((imgFile) => {
                    var index = imageData.indexOf(imgFile);
                    var base64 = btoa(
                        new Uint8Array(imgFile.img.data.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    return <img src={`data:image/png;base64,${base64}`} alt="" key={index} />
                })}
        </div>
    )
}

export default App
