import Image from 'next/image';
import React from 'react'

function Productcard({ produktname, preis, stichwörter, produktbild, extraClass }) {
    return (
        <div className={`card mx-3 ${extraClass}`}  style={{ width: '18rem', height: '28rem' }}>
            <div style={{ borderRadius: '0.375rem 0.375rem 0 0'}} className='d-flex justify-content-center align-items-center bg-light '>
                <Image style={{ borderRadius: '0.375rem 0.375rem 0 0'}} src={produktbild} alt={produktbild} width={250} height={250} />
            </div>
            <div className="card-body">
                <div style={{height: "50px", overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}>
                    <h1 className="card-title fs-5">{produktname}</h1>
                </div>
                <div className='mt-2' style={{height: "25px"}}>
                    <p className='card-text'>{preis ? `${preis}€` : ''}</p>
                </div>
                <div className='mt-2' style={{height: "75px", overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                    <p className="card-text">{stichwörter}</p>
                </div>
            </div>
        </div>
    )
}

export default Productcard