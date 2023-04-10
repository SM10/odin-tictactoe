//Start for start button
const GameplayManager = function(playerx, playero, container){
    let turnplayer;
    let board;
    let onTurnPlayerSwitched;
    let isGameStarted = false;

    const RandomFirst = () => {
        if (Math.random() * 100 % 2 == 0){
            return playerx;
        }else{
            return playero;
        }
    }

    const SetUpBoard = () =>{
        board = GameBoard();
        board.SetCellEventListener(CellPicked)
        container.append(board.GetBoard());
    }

    const Start = () => {
        Reset()
        SetTurnPlayer(RandomFirst())
        isGameStarted = true;
    }

    const SetTurnPlayer = (newturnplayer) => {
        if (newturnplayer === playerx || newturnplayer === playero){
            turnplayer = newturnplayer;
            onTurnPlayerSwitched(turnplayer.xoro)
        }
    }

    const SwitchTurnPlayer = () => {
        if(isGameStarted){
        if (turnplayer.xoro === 'x'){
            turnplayer = playero;
        } else if (turnplayer.xoro === 'o'){
            turnplayer = playerx;
        }
        
        if (onTurnPlayerSwitched != undefined){
            onTurnPlayerSwitched(turnplayer.xoro);
        }
    }
    }

    const SetTurnPlayerSwitchedFunction = (turnPlayerSwitchedFunction) => {
        onTurnPlayerSwitched = turnPlayerSwitchedFunction;
    }

    const CellPicked = (event) => {
        if(isGameStarted){
        if(event.target.className != "game-cell-image"){
            if(turnplayer.xoro ==="x"){
                board.SetCell(event.target, turnplayer.xoro, "./images/fencing.svg")
                SwitchTurnPlayer()
            }else if(turnplayer.xoro === "o"){
                board.SetCell(event.target, turnplayer.xoro, "./images/shield-outline.svg")
                SwitchTurnPlayer()
            }
        }
        CheckWinner();
    }
    }

    const Reset = () =>{ 
        board.ClearBoard();
        isGameStarted = false;
    }



    const CheckWinner = () =>{
        let isAllRowsFilled = true;
        let isColWin = {0:true, 1:true, 2:true};
        let isBackSlashWin = true;
        let backSlashVar = null;
        let isForwardSlashWin = true;
        let forwardSlashVar = null;
        let rowtop = {0:null, 1:null, 2:null};
        

        for(let y = 0; y < 3; y++){
            let colleft = null;
            let isRowWin = true;
            for(let x = 0; x < 3; x++){            
                let occupyplayer = board.GetCell(x, y).getAttribute("occupying-player")

                if(colleft == null){colleft = occupyplayer}
                if(colleft != occupyplayer || occupyplayer == null){isRowWin = false}

                if(rowtop[x] == null){rowtop[x] = occupyplayer}
                if (rowtop[x] != occupyplayer || occupyplayer == null){isColWin[x] = false}

                if((x === 0 && y === 0)||(x === 1 && y === 1)||(x === 2 && y === 2)){
                    if(backSlashVar == null){backSlashVar = occupyplayer}
                    if (backSlashVar != occupyplayer || occupyplayer == null){isBackSlashWin = false}
                }

                if((x === 2 && y === 0)||(x === 1 && y === 1)||(x === 0 && y === 2)){
                    if(forwardSlashVar == null){forwardSlashVar = occupyplayer}
                    if (forwardSlashVar != occupyplayer || occupyplayer == null){isForwardSlashWin = false}
                }

                if(occupyplayer == null) {isAllRowsFilled = false}
            }
            if(isRowWin){OnWinner(colleft); return;}
        }

        for(let i = 0; i < 3; i++){
            if(isColWin[i]){OnWinner(rowtop[i]); return;}
        }
        if(isBackSlashWin){OnWinner(backSlashVar); return;}
        if(isForwardSlashWin){OnWinner(forwardSlashVar); return;}
        if(isAllRowsFilled){OnDraw()}
    }

    const OnWinner = (winnerxoro) => {
        isGameStarted = false
        //board.style.opacity = "0.2"
        let winnerplayer
        if(winnerxoro == "x"){winnerplayer = playerx}
        if(winnerxoro == "o"){winnerplayer = playero}
        
        let winnermessage = document.createElement("div")
        winnermessage.textContent = "The winner is " + winnerplayer.name
        winnermessage.style.position = "relative"

        board.GetBoard().append(winnermessage)
    }

    const OnDraw = () =>{

    }

    return {Start, SetUpBoard, SetTurnPlayerSwitchedFunction, Reset}
}

const Player = function(xoro, name = '', wins = 0){
    return{xoro, name, wins}
}

const GameBoard = function(){
    const entireboard = () => {
        const b = document.createElement("div");
        b.className = "game-board"
        
        const grid00 = document.createElement("div");
        grid00.className = "game-cell"
        
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                const cell = document.createElement("div");
                cell.className = "game-cell"
                cell.id = "game-cell-" + col + "-" + row;
                cell.setAttribute("grid-row", row);
                cell.setAttribute("grid-column", col)
                b.append(cell);
            }
        }

        return b;
    }
    let board = entireboard();
    const GetBoard = () => {
        return board;
    }
    
    const GetCell = (x, y) => {
        const cell = board.querySelector("#game-cell-" + x + "-" + y)
        return cell;
    }

    const SetCell = (cell, occupyingplayerxoro, imagesrc) => {
        if (cell.innerHTML === ''){
            const image = document.createElement("img")
            image.classList.add("game-cell-image")
            image.src = imagesrc
            cell.append(image);
            cell.setAttribute("occupying-player", occupyingplayerxoro)
        }
    }

    const ClearBoard = () =>{
        let cells = board.querySelectorAll(".game-cell")
        cells.forEach(cell =>{
            cell.innerHTML = '';
            cell.removeAttribute("occupying-player")
        })
    }

    const SetCellEventListener = (EventListener) => {
        let cells = board.querySelectorAll(".game-cell")
        cells.forEach(cell => {
            cell.addEventListener('click', EventListener, false)
        })
    }

    return {GetBoard, GetCell, SetCell, SetCellEventListener, ClearBoard}
}

let playerx = new Player("x", "Player X")
let playero = new Player("o", "Player O")
let gm = GameplayManager(playerx, playero, document.querySelector(".gameboard-area"))
gm.SetTurnPlayerSwitchedFunction((xoro) => {
    let playerxicon = document.querySelector(".x-icon.player-icon")
    let playeroicon = document.querySelector(".o-icon.player-icon")
    switch (xoro){
        case 'x':
            playerxicon.style.setProperty("visibility", "visible")
            playeroicon.style.setProperty("visibility", "hidden")
            break;
        case 'o':
            playerxicon.style.setProperty("visibility", "hidden")
            playeroicon.style.setProperty("visibility", "visible")
            break;
    }
})
gm.SetUpBoard();

let startButton = document.querySelector(".start-button")
startButton.addEventListener('click', gm.Start, false);

let resetButton = document.querySelector(".reset-button")
resetButton.addEventListener('click', () => {
    gm.Reset()
    let playerxicon = document.querySelector(".x-icon.player-icon")
    let playeroicon = document.querySelector(".o-icon.player-icon")
    playerxicon.style.setProperty("visibility", "visible")
    playeroicon.style.setProperty("visibility", "visible")
}, false)

let playerxchangename = document.querySelector("#player-x-name-button")
playerxchangename.addEventListener('click',() => {
    let newname = prompt("Enter new name for player x")
    playerx.name = newname
    document.querySelector("#player-x-name").textContent = playerx.name;
}, false)

let playerochangename = document.querySelector("#player-o-name-button")
playerochangename.addEventListener('click',() => {
    let newname = prompt("Enter new name for player o")
    playero.name = newname;
    document.querySelector("#player-o-name").textContent = playero.name;
}, false)