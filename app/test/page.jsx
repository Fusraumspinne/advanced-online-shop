"use client"

import React, { useState } from 'react'

function page() {
    const [image, setImage] = useState("")

    const convertToBase64 = (e) => {
        console.log(e)
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("Error: " + error)
        }
    }

    return (
        <div>
            <input type="file" accept='image/*' onChange={convertToBase64} />
            {image == "" || image == null ? "" :
                <img src={image} height={100} width={100} />
            }
        </div>
    )
}

export default page