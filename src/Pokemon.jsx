import React, { useEffect, useState } from 'react'
import './index.css'
import PokemonCards from './PokemonCards';
const Pokemon = () => {
    const[pokemon,setPokemon] = useState([]);
    const[loding,setLoading] = useState();
    const[error,setError] = useState(null);
    const [search, setSearch] = useState("");
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
    const fetchpokemon = async()=>{
       try{
          const res = await fetch(API);
          const data = await res.json();
        //   console.log(data);


           const detailedpokemonData = data.results.map(async(curpokemon)=>{
            //  console.log(curpokemon.url); 
            const res = await fetch(curpokemon.url);
            const  data = await res.json();
            return data;
           });
        //    console.log(detailedpokemonData);
           const  detailResponses = await Promise.all(detailedpokemonData);

           console.log(detailResponses);
           setPokemon(detailResponses);
           setLoading(false);

       } catch(error){
           console.log(error);
            setError(error);
       }

       if(loding){
        return <div>
            <h1>Looding</h1>
        </div>
       }

       if(error){
        return <div>
            <h1>{error.message}</h1>
        </div>
       }
    }
    useEffect(()=>{
        fetchpokemon();
    },[])

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
      );
  return (
  <>
    <section className='container'>
        <header>
            <h1>Lets Catch Pokemon</h1>

        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
            <ul className="cards">
                {
                    pokemon.map((curpokemon)=>{
                      return <PokemonCards key={curpokemon.id} pokemonData = {curpokemon}/>
                    })
                }
            </ul>
        </div>
    </section>
  </>
  )
}

export default Pokemon