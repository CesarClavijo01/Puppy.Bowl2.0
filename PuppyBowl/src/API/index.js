const baseURL = "https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-ET-WEB-PT/players"

export async function GetAllPlayers(){
    const response = await fetch(baseURL);
    const result = await response.json();
    
    return result;
};

export async function GetSinglePlayer(id){
    try{
        const responce = await fetch(`${baseURL}/${id}`);
        const result = await responce.json();
        
        return result;
    }catch(error){
        console.error(error)
    }
}

export async function NewPlayer(name, breed){
    const response = await fetch(baseURL, {
        method:'POST',
        headers: 
        {'Content-Type': 'application/JSON'},
        body:JSON.stringify({
            name: name,
            breed: breed
        })
    })
    const result = response.json();
    return result
}

export async function DeletePlayers(id){
    const response = await fetch(`${baseURL}/${id}`,{
        method: 'delete',
    });

    if(response.status === 204){
        return true
    }

    throw new Error(`Sorry, we couldn't delete player: ${id}`)
}