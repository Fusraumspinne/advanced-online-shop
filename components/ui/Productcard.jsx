import Image from 'next/image';
import React from 'react'

function Productcard({ produktname, preis, stichwörter, produktbild, extraClass }) {
    return (
        <div className={`card mx-2 product_card ${extraClass}`}  style={{ width: '18rem', height: '28rem' }}>
            <div style={{ borderRadius: '0.375rem 0.375rem 0 0'}} className='d-flex justify-content-center align-items-center bg-light '>
                <Image className='product_card_image' style={{ borderRadius: '0.375rem 0.375rem 0 0', width: "100%", maxHeight: "250px", objectFit: "cover" }} src={produktbild} alt={produktbild} width={250} height={250} />
            </div>
            <div className="card-body">
                <div className='product_card_title' style={{height: "50px", overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}>
                    <h1 className="card-title fs-5">{produktname}</h1>
                </div>
                <div className='mt-2 product_card_preis' style={{height: "25px"}}>
                    <p className='card-text'>{preis ? `${preis}€` : ''}</p>
                </div>
                <div className='mt-2 product_card_stichwörter' style={{height: "75px", overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                    <p className="card-text">{stichwörter}</p>
                </div>
            </div>
        </div>
    )
}

export default Productcard