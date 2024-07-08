import Image from 'next/image';
import React from 'react'

function Productcard({ produktname, preis, stichwörter, produktbild }) {
    return (
        <div className="card mx-3 mt-4"  style={{ width: '18rem', height: '28rem' }}>
            <div style={{ borderRadius: '0.375rem 0.375rem 0 0'}} className='d-flex justify-content-center align-items-center bg-light '>
                <Image style={{ borderRadius: '0.375rem 0.375rem 0 0'}} src={produktbild} alt={produktbild} width={250} height={250} />
            </div>
            <div className="card-body">
                <h1 className="card-title fs-5">{produktname}</h1>
                <p className='card-text'>{preis}€</p>
                <p className="card-text">{stichwörter}</p>
            </div>
        </div>
    )
}

export default Productcard