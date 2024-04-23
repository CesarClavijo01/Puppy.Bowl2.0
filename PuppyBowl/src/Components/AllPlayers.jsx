import { useState, useEffect } from "react"
import { GetAllPlayers, NewPlayer, DeletePlayers } from "../API"
import { useNavigate } from "react-router-dom";

export default function AllPlayers(){
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState(null);
    const [newPlayerBreed, setNewPlayerBreed] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();


    //fetch all players function

    useEffect(() => { 
        async function PlayersRender()
       { try{
           const fetchPlayers = await GetAllPlayers();

           setPlayers(fetchPlayers.data.players);
            
        }
        catch(error){
            console.error(error);
        }}
        PlayersRender()
    }, [])

    //submit new player function

    async function submitHandler(event){
        event.preventDefault();
        try{
            const postedNewPlayer = await NewPlayer(newPlayerName, newPlayerBreed);
            if(postedNewPlayer.success){
                setPlayers([...players, postedNewPlayer.data.newPlayer])
            }
        }catch(error){
            console.error(error);
        }
    }
    

        //search function
        const handleChange = (event) => {
            setSearchValue(event.target.value)
        }
    
        const searchResults = players.filter((player) => {
            const lowerCaseName = player.name.toLowerCase()
            return lowerCaseName.includes(searchValue.toLowerCase())
        })

        console.log(searchResults)
    

    // call the delete function from api and make sure it deletes it from the dom
    async function deleteHandler(id){
        try{
            setPlayers(players.filter((player) => {
                console.log('hello')
                return  player.id != id
            }))
            const remove = await DeletePlayers(id);
        }
        catch(error){
            console.error(error)
        };
    }

    if(searchResults.length < 1 ){
        return(
            <>
                <div>Loading...</div>

                <form className='formContainer' onSubmit={submitHandler}>
                <h2>Create a New Player</h2>
                <label>
                    Player Name:<input onChange={(event) => setNewPlayerName(event.target.value)} />
                </label>
                <label>
                    Breed:<input onChange={(event) => setNewPlayerBreed(event.target.value)} />
                </label>
                <button className="submitBtn">Submit</button>  
            </form>
        </>

        )
    }
    return(
    <>
        <form className="searchForm">
            <input 
            className="search"
            type='text' 
            placeholder="Search player" 
            onChange={handleChange} 
            value={searchValue}/>
        </form>
        <div className="AllPlayersContainer">
            {
                searchResults.map(result => {
                    return ( 
                        <div  key={result.id} className="playerContainer">
                            <button className="deleteBtn" onClick={() => {deleteHandler(result.id)}}>X</button>
                            <h1 className="playerNameContainer">{result.name}</h1>
                            <button className="infoBtn" onClick={() => {navigate(`/player/${result.id}`)}}>More Info</button>
                        </div>
                    )
                })
            }
        </div>
        <form className='formContainer' onSubmit={submitHandler}>
            <h2>Create a New Player</h2>
            <label>
                Player Name:<input onChange={(event) => setNewPlayerName(event.target.value)} />
            </label>
            <label>
                Breed:<input onChange={(event) => setNewPlayerBreed(event.target.value)} />
            </label>
            <button className="submitBtn">Submit</button>  
        </form>

    </>
    )
}
