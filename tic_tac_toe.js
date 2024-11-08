// New
let occupied_cells=[];
let yourId;

let lastConnection;
 let playerACells=[];
 let playerBCells=[];
 let gamesPlayed=0;
 let playerAwins=0;
 let playerBwins=0;
 let playerAloss=0;
 let playerBloss=0;

 let playerAPlay=document.getElementById("playerAsound")
 let playerBplay=document.getElementById("playerBsound")

let winning_commbination=[
    ["c1", "c2", "c3"],
    ["c4", "c5", "c6"],
    ["c7", "c8", "c9"],
    ["c7", "c5", "c3"],
    ["c1", "c5", "c9"],
    ["c7", "c4", "c1"],
    ["c8", "c5", "c2"],
    ["c9", "c6", "c3"],
    ["c3", "c5", "c7"],
]

   function permutate(items, count) {
    const results = []

    req([])

    return results

    function req(array)  {
        if (array.length == count) {
            results.push(array)
            return
        }
        for (const item of items)  {
            req(array.concat(item))
        }
    }
}
        
     
    function check_winner(playerCells){
        

        let allPossibleArrangement=permutate(playerCells, 3);
        // console.log("Possible",permutate(playerCells, 3))
        
        let matching=false;
        allPossibleArrangement.forEach((arrangement) => {
        
        
            winning_commbination.forEach((combination)=>{
        
        if (JSON.stringify(combination)==JSON.stringify(arrangement)){
        
        
            matching=true;
            return true
        }
        
        
        })
        
        if (matching==true){
            return
        }
        
        })
        
            return matching;
        
        
        }
        
        let nextPlayer=1;
        function add_circle_to_div(divElement){
            let divId=divElement.id;
            if (!occupied_cells.includes(divId)){
        let o_symbol=document.createElement("img")
        o_symbol.src="./images/circle-ring.png"
        o_symbol.style.width="100%"
        o_symbol.style.height="100%"
        
        divElement.appendChild(o_symbol)
        occupied_cells.push(divId)
        }
        }
        
            
        function add_x_to_div(divElement){
            let divId=divElement.id;
            if (!occupied_cells.includes(divId)){
                let o_symbol=document.createElement("img")
o_symbol.src="./images/x-symbol.png"
o_symbol.style.width="100%"
o_symbol.style.height="100%"

divElement.appendChild(o_symbol)
occupied_cells.push(divId)
console.log(occupied_cells)
}


}





    setInterval(keepTime, 1000);
    let secondsTaken=0;
function keepTime(){
let timeParagraph=document.getElementById("timer")
secondsTaken=secondsTaken+1;

timeParagraph.innerText=secondsTaken+"s";
// 10s or 10 s
}



function resetGame(sendReset=false){

  
    console.log(sendReset)

    if (lastConnection && sendReset){
        client.publish(lastConnection+"/reset", "reset game")
        console.log("Sent reset")
    }
      
    let gameCells=document.getElementsByClassName("cell")

    for(let index=0;index<gameCells.length; index++){
        let element=gameCells[index]

        while(element.firstChild){
            console.log(element.id)
            element.removeChild(element.firstChild);
        }


        
    }
    playerACells=[];
    playerBCells=[];
    occupied_cells=[];
    secondsTaken=0;
    document.getElementById('id01').style.display='none'




}

function play( clickedDiv){
    if (nextPlayer===1){
        add_circle_to_div(clickedDiv)
        playerACells.push(clickedDiv.id)
        nextPlayer=2;
        let winner=check_winner(playerACells)
        console.log("playerA:",winner)
        // sound.pause();

        playerAPlay.currentTime = 0;
        playerAPlay.play();
        if (winner==true){

            playerAwins++;
            playerBloss++;

            // document.getElementById("playerAW").style.display="block";

            
            modalHeading.innerText="Player A Has Won";
            document.getElementById('id01').style.display='block'
            document.getElementById("playerAmoves").innerText=playerACells.length
            document.getElementById("playerBmoves").innerText=playerBCells.length
        }

    }
    else if (nextPlayer===2){
        add_x_to_div(clickedDiv)
        playerBCells.push(clickedDiv.id)
        nextPlayer=1;
        let winner=check_winner(playerBCells)
        playerBplay.currentTime = 0;
        playerBplay.play();
        if (winner==true){

            playerBwins++;
            playerAloss++;
           
           modalHeading.innerText="Player B Has Won";
            document.getElementById('id01').style.display='block'
            document.getElementById("playerBmoves").innerText=playerBCells.length
            document.getElementById("playerAmoves").innerText=playerACells.length

        }
        
    }
}

let modalHeading=document.getElementById("winning_header")
function cellClicked(clickedDiv){

    if (lastConnection){
        client.publish(lastConnection+"/play", clickedDiv.id)
    }

play(clickedDiv);
    
    
 document.getElementById("playerAScores").innerText="W"+playerAwins+"L"+playerAloss
 document.getElementById("playerBScores").innerText="W"+playerBwins+"L"+playerBloss

}






function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

yourId=makeid(6);

let yourIdDisplay=document.getElementById("yourId")
yourIdDisplay.innerText=yourId



const url = 'wss://broker.emqx.io:8084/mqtt'

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: yourId,
  username: 'emqx_test',
  password: 'emqx_test',
}
const client  = mqtt.connect(url, options)
client.on('connect', function () {
  console.log('Connected')
  // Subscribe to a topic
  client.subscribe(yourId+"/#", function (err) {
    if (!err) {
      // Publish a message to a topic
      client.publish(yourId+"/test", 'Connection test')
    }
  })
})


// Receive messages
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  console.log(topic)

  let action=topic.split('/')[1]
  console.log(action)

  if (action==="connect"){

if (!lastConnection){
    client.publish(message.toString()+"/connect", yourId)
    lastConnection=message.toString();
    let partneridDisplay=document.getElementById("partnerId")
partneridDisplay.innerText=message.toString()

console.log("Connecting to "+message.toString())
}

  }

  if(action=="play"){
    let div_id = message.toString()
    console.log(div_id)
    let clickedDiv=document.getElementById(div_id)
    play(clickedDiv);
  }

  if (action=="message"){

    let messageDisplay=document.getElementById("messageDisplay")
    let newP=document.createElement("p")
    newP.innerText=message
    newP.classList.add("partner")
    messageDisplay.appendChild(newP);

  }

  if(action=="reset"){
    resetGame();
    console.log("Resetting game")
  }

//   client.end()
})

function connectWithPartner(){
let connectionPartner=document.getElementById("connectionId").value
let topic=connectionPartner+"/connect"

client.publish(topic, yourId)
console.log(topic)



}

function sendMessage(){
let message= document.getElementById("messageInput").value
if (message==""){
    alert("Provide a valid message")
}
else{
    if (!lastConnection){
        alert("You are not connected to anyone")
    }
    else{
        let messageDisplay=document.getElementById("messageDisplay")
        let newP=document.createElement("p")
        newP.innerText=message
        newP.classList.add("me")
        messageDisplay.appendChild(newP);
        client.publish(lastConnection+"/message", message)
    }
}



}













        
