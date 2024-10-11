
let occupied_cells=[];
 let playerACells=[];
 let playerBCells=[];
 let gamesPlayed=0;
 let playerAwins=0;
 let playerBwins=0;
 let playerAloss=0;
 let playerBloss=0;

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
        console.log("playerA:",winner)
        if (winner==true){

            playerAwins++;
            playerBloss++;

            alert("playerA has won")
        }

    }
    else if (nextPlayer===2){
        add_x_to_div(clickedDiv)
        playerBCells.push(clickedDiv.id)
        nextPlayer=1;
        let winner=check_winner(playerBCells)
        if (winner==true){

            playerBwins++;
            playerAloss++;
            alert("player B has won")

        }
        
    }
    
 document.getElementById("playerAScores").innerText="W"+playerAwins+"L"+playerAloss
 document.getElementById("playerBScores").innerText="W"+playerBwins+"L"+playerBloss

}






















        