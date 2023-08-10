import React, { useState } from 'react'
import axios from 'axios'
import './Prompt.css'
import Loading from './Loading'

export default function Prompt() {
    const [img, setImg] = useState('')
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [allimg, setAllimg] = useState([])
    const [caption, setCaption] = useState('')

    const add_to_all_img = (img) => {
        setAllimg(prevallimg => [...prevallimg, img]);
    }

    const imgfetch = async (e) => {
        setImg('')
        e.preventDefault();
        setLoading(true)
        setCaption(input)
        setInput('')
        try {
            const response = await axios.post('http://localhost:1000/api/imggen', {
                input: input,
            });
            const image = response.data.imgURL
            setImg(image);

            add_to_all_img(image)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <header className='navbar'>
                <h1>ImagiGen</h1>
            </header>
            <div className="container">
                <div>
                    <form className='input_div' onSubmit={imgfetch}>
                        <input type="text" value={input} placeholder='Describe image here' onChange={(e) => setInput(e.target.value)} required />
                        <button>Generate Image</button>
                    </form>
                </div>
                <div className="image_section">
                    <div className="generated_img_div">
                        {!img && (<div className="generated_here_text">
                            <p>Your Image will be generated here....</p>
                        </div>)}
                        <div className="loading_div">
                            {loading && (<Loading />)}
                        </div>
                        {img && (<div className='img_caption'><p className='caption'>{caption}</p><img className='generated_img' src={img} /></div>)}
                    </div>

                    <div className="all_generated_img_div">
                        <p>All your generated Images</p>
                        <div className="all_generated_img">
                            {allimg.map((imgurl, index) => (
                                <img src={imgurl} className='recent_images' key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
