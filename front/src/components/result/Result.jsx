import axios from 'axios'
import './css/Result.css'
import { useEffect, useState } from 'react'

export function Result({pokemon}){

    const [sendingError, setSendingError] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);

    useEffect(()=>{
        setSendingError(false);
        setAccepted(false);
    } ,[pokemon]);

    const sendData = (pokemon)=>{
        setSendLoading(true);
        axios.post('http://localhost:1313/pokemon/add', pokemon)
        .then((res)=>{
            setSendLoading(false);
            console.log(res.data);
            setSendingError(false)
            setAccepted(true)
        })
        .catch((err)=>{
            setSendLoading(false);
            console.log(err);
            setAccepted(false)
            setSendingError(true);
        });
    }

    return (
        <>
        
        <section className="viewer">
            <div className="image">
                <img src={pokemon.image} alt="Pokemon Image" />
            </div>
            <div className="info">

                <section className="name">
                    <strong className='pokemonName'>{pokemon['name'].toUpperCase()}</strong>
                </section>

                <section className="types">
                    <strong className='pokemonAtrib'>Types: </strong>
                    {
                        pokemon['types'].map((type, index) => {
                            if (index < pokemon['types'].length-1){
                                return (
                                    <span key={index}>{type}, </span>
                                )
                            } else {
                                return (
                                    <span key={index}>{type}.</span>
                                )
                            }
                        })
                    }
                </section>

                <section className="abilities">
                    <strong className='pokemonAtrib'>Abilities: </strong>
                        {
                            pokemon['abilities'].map((ability, index) => {
                                if (index < pokemon['abilities'].length-1){
                                    return (
                                        <span key={index}>{ability}, </span>
                                    )
                                } else {
                                    return (
                                        <span key={index}>{ability}.</span>
                                    )
                                }
                            })
                        }
                </section>

            </div>
        </section>
        <section className="buttons">
            <div className="button">
                <button 
                className={sendingError?'error':(accepted?'accepted':'')}
                onClick={()=>{
                    !accepted?sendData(pokemon):''
                }}>
                    {(sendingError&&accepted === false?'RETRY':'')}
                    {(sendingError === false&&accepted?'SAVED':'')}
                    {(sendingError === false&&accepted === false?'SAVE':'')}
                </button>
            </div>
            {sendLoading?<strong className='msgState'>saving...</strong>:''}
            {(sendingError&&sendLoading===false)?<strong className='msgState error'>see error</strong>:''}
        </section>
        
        
        </>
    )
}