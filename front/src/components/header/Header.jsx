import axios from 'axios'
import { useState } from 'react'
import pokedexLogo from '/pokedex.png'
import './css/Header.css'
import { Result } from '../result/Result'


export function Header(){

    const [pokemon, setPokemon] = useState({})
    const [pokemonData, setPokemonData] = useState({})
    const [response, setRespose] = useState({})

    const getPokemon = () =>{
        const _pokemon = String(pokemon).toLowerCase();

        const formatData = (data) =>{
            const pokemonTypes = [];
            for (let i = 0; i< data['types'].length; i++){
                pokemonTypes.push(data.types[i].type.name)
            }
            const pokemonAbilities = [];
            for (let i = 0; i< data['abilities'].length; i++){
                pokemonAbilities.push(data.abilities[i].ability.name)
            }

            return [pokemonTypes, pokemonAbilities]
        }

        const baseURL = `https://pokeapi.co/api/v2/pokemon/${_pokemon}`;
        axios.get(baseURL)
        .then((res) =>{
            const data = res.data;
            const [pokemonTypes, pokemonAbilities] = formatData(data);
            const pokemonData = {
                name : data.name,
                abilities : pokemonAbilities,
                types : pokemonTypes,
                image : data.sprites.front_default,
                stats : {
                    hp : data.stats[0].base_stat,
                    attack : data.stats[1].base_stat,
                    defense : data.stats[2].base_stat
                    }
            }
            console.log(pokemonData);

            const response = {
                isOk : true,
                data: `found ${String(pokemonData.name).toUpperCase()}!`,
                pokemon: pokemon
            }
            setRespose(response)
            setPokemonData(pokemonData)

        })
        .catch((err) => {
            console.log(err.data);

            const response = {
                isOk : false,
                data: `can't find ${String(pokemon).toUpperCase()}!`,
                pokemon: 'not found'
            }

            setRespose(response)
        })

    }

    return(
        <>
        <header>
            <section className="logo">
                <img src={pokedexLogo} alt="Pokedex Logo" />
            </section>
            <section className="containerBrowser">
                <div className="brwText">
                    <h1>Enter a Pokemon name</h1>
                </div>
                <div className="brwInputs">
                    <input 
                        type="text" 
                        className='browser' 
                        placeholder='Name Here' 
                        onChange={(e) =>{
                        setPokemon(e.target.value)
                    }}/>
                    <button className='brwButton'
                            onClick={getPokemon}>TRY!</button>
                </div>
                <div className={ response.isOk ? 'responseOK':'responseNotOK' }>
                    <strong>{response.data}</strong>
                </div>
            </section>
        </header>
        
        { response.isOk ? (
            <article className="pokemonPreview">
                <Result pokemon = {pokemonData}/>
            </article>
            ) : '' }
        </>
    )
}