<!DOCTYPE html>
<html>
<head>
    <title>Tic-Tac-Toe Game</title>

<style>
    .row{
        display: flex;
    }


.cell{
    width: 200px;
    height: 200px;
    border-style: solid;
}
#c1{
    border-color: aqua; 
    border-left: 0px;
    border-top: 0px;
}
#c2{
    border-color: aqua;
    border-top: 0px;
}
#c3{
    border-color: aqua;
    border-right: 0px;
    border-top: 0px;
}

#c4{
    border-color: aqua;
    border-left: 0px;
}
#c5{
    border-color: aqua;
}
#c6{
    border-color: aqua;
    border-right: 0px;
}
#c7{
    border-color: aqua;
    border-left: 0px;
    border-bottom: 0px;
}
#c8{
    border-color: aqua;
    border-bottom: 0px;
}
#c9{
    border-color: aqua;
    border-bottom: 0px;
    border-right: 0px;
}
#timer{
    padding: 10px;
    border-top: 5cm;
    border-bottom: 5cm;
    border-right: 5cm;
    border-left: 5cm;
}   

#time-container{
        border-style: solid;
        width: fit-content;

        display: flex;
}
#style{
    border-color: aqua;
    border-style: solid;
    width:fit-content;
    display: flex;
    margin-top: 2cm;
    padding: 20px;
    background-color: aqua;
    margin-left: 10px;
    border-radius: 20px;
    font-size: medium;
}

</style>
</head>
<body>
<!-- From here -->
<div>
<div id="time-container" >
<h2>Timer: </h2> <p id="timer"></p>

</div>
<div id="Scores">
    <h2>Scores</h2>
    <p>PlayerA: <span id="playerAScores">2W 1L</span></p>
    <p>PlayerB: <span id="playerBScores">2W 1L</span></p>
</div>



</div>


<div id="Game">

    <!-- Here -->

<div class="row" >

    <div class="cell" id="c1" onclick="cellClicked(this)">
  
    </div>
    <div class="cell" id="c2" onclick="cellClicked(this)">
       
    </div>
    <div class="cell" id="c3" onclick="cellClicked(this)">

    </div>
</div>





<div class="row">
<div class="cell" id="c4" onclick="cellClicked(this)">

</div>
<div class="cell" id="c5" onclick="cellClicked(this)">

</div>
<div class="cell" id="c6" onclick="cellClicked(this)">

</div>

</div>






<div class="row">
<div class="cell" id="c7" onclick="cellClicked(this)">

</div>
<div class="cell" id="c8" onclick="cellClicked(this)">

</div>
<div class="cell" id="c9" onclick="cellClicked(this )">

</div>
</div>



</div>


<div>

    <button id="style" onclick="resetGame(true)">Reload</button>

</div>

<script>

    let occupied_cells=[];
    let playerACells=[]
    let playerBCells=[]
    let gamesPlayed=0;
    let playerAwins=0;
    let playerBwins=0;
    let playerAloss=0;
    let playerBloss=0
    document.getElementById("playerAScores").innerText="W"+playerAwins+" L"+playerAloss
    document.getElementById("playerBScores").innerText="W"+playerBwins+" L"+playerBloss


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

  function req(array) {
    if (array.length == count) {
      results.push(array)
      return
    }
    for (const item of items) {
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





// Stop here
function resetGame(){


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

}


function cellClicked(clickedDiv){
    if (nextPlayer===1){

add_circle_to_div(clickedDiv)
playerACells.push(clickedDiv.id)
nextPlayer=2;
let winner=check_winner(playerACells)
console.log("player A:",winner)
if (winner==true){

    alert("Player A has won")
}

}
else if (nextPlayer===2){
add_x_to_div(clickedDiv)
playerBCells.push(clickedDiv.id)
nextPlayer=1;
let winner=check_winner(playerBCells)
console.log("player B:",winner)
if (winner==true){

    alert("Player B has won")
}
}
}
</script>

</body>


</html>
