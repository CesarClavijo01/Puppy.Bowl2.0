import { useState, useEffect } from "react"
import { GetAllPlayers, NewPlayer } from "../API"
import { useNavigate } from "react-router-dom";

export default function AllPlayers({setSelectedPlayerId, selectedPlayerId}){
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState(null);
    const [newPlayerBreed, setNewPlayerBreed] = useState(null);
    const navigate = useNavigate()


    //fetch all players function

    useEffect(() => { async function Players()
       { try{
           const fetchPlayers = await GetAllPlayers();

           setPlayers(fetchPlayers.data.players);
            
        }
        catch(error){
            console.error(error);
        }}
        Players()
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

    // // create a function that gets the id from a specific player
    // function clickHandle(event){
    //     //navigate to a page for that players info
    //     navigate(`/${player.id}`)
    // }

    if(players.length < 1 ){
        return(
            <div>Loading...</div>
        )
    }
    return(
    <>
        <form className="searchForm">
            <input type='text' placeholder="Search player"/>
            <button className="searchBtn">Search</button>
        </form>
        <div className="AllPlayersContainer">
            {
                players.map(player => {
                    return ( 
                        <div  key={player.id} className="playerContainer">
                            <button className="deleteBtn">X</button>
                            <h1 className="playerNameContainer">{player.name}</h1>
                            <button className="infoBtn" onClick={() => {navigate(`/player/${player.id}`)}}>More Info</button>
                        </div>
                    )
                })
            }
        </div>
        <form className='formContainer' onSubmit={submitHandler}>
            <h2>Crete a New Player</h2>
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
