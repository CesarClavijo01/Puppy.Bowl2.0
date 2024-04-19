import { GetSinglePlayer } from "../API"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function SinglePlayer(){

    const [player, setPlayer] = useState({})
    const { playerId } = useParams()

    //create a function that uses GetSinglePlayer to display a single player
        useEffect(() => { 
            async function SinglePlayerRender(){
                try{

                    const singlePlayer = await GetSinglePlayer(playerId)
                    setPlayer(singlePlayer.data.player)

                }catch(error){

                    console.error(error)
                }
            }
            SinglePlayerRender()
        }, [])
        console.log(player)

    return(
        <div className="singlePlayerContainer">
            <div className="singlePlayerBox">
                <h1 id="singlePlayerName">{player.name}</h1>
                <ol>
                    <li>Breed: {player.breed}</li>
                    <li><img src={`${player.imageUrl}`} /></li>
                </ol>
            </div>

        </div>
    )
}