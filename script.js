
//Start for start button
const GameplayManager = function(playerx, playero){
    let turnplayer;
    let board;
    let onTurnPlayerSwitched;

    const RandomFirst = () => {
        if (Math.random() * 100 % 2 === 0){
            return playerx;
        }else{
            return playero;
        }
    }

    const SetUpBoard = (container) =>{
        board = GameBoard();
        board.SetCellEventListener(CellPicked)
        container.append(board.GetBoard());
    }

    const Start = (container) => {
        SetUpBoard(container)
        
        SetTurnPlayer(RandomFirst())
    }

    const SetTurnPlayer = (newturnplayer) => {
        if (newturnplayer === playerx || newturnplayer === playero){
            turnplayer = newturnplayer;
            onTurnPlayerSwitched(turnplayer.xoro)
        }
    }

    const SwitchTurnPlayer = () => {
        if (turnplayer.xoro === 'x'){
            turnplayer = playero;
        } else if (turnplayer.xoro === 'o'){
            turnplayer = playerx;
        }
        
        if (onTurnPlayerSwitched != undefined){
            onTurnPlayerSwitched(turnplayer.xoro);
        }
    }

    const SetTurnPlayerSwitchedFunction = (turnPlayerSwitchedFunction) => {
        onTurnPlayerSwitched = turnPlayerSwitchedFunction;
    }

    const CellPicked = (event) => {
        if(!event.target.className != "game-cell-image"){
            if(turnplayer.xoro ==="x"){
                board.SetCell(event.target, "./images/fencing.svg")
                SwitchTurnPlayer()
            }else if(turnplayer.xoro === "o"){
                board.SetCell(event.target, "./images/shield-outline.svg")
                SwitchTurnPlayer()
            }
        }
    }

    return {Start, SetTurnPlayerSwitchedFunction}
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
                cell.id = "game-cell-" + row + "-" + col;
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

    const SetCell = (cell, imagesrc) => {
        if (cell.innerHTML === ''){
            const image = document.createElement("img")
            image.classList.add("game-cell-image")
            image.src = imagesrc
            cell.append(image);
        }
    }

    const SetCellEventListener = (EventListener) => {
        let cells = board.querySelectorAll(".game-cell")
        cells.forEach(cell => {
            cell.addEventListener('click', EventListener, false)
        })
    }

    return {GetBoard, GetCell, SetCell, SetCellEventListener}
}

let playerx = new Player("x", "Player X")
let playero = new Player("o", "Player O")
let gm = GameplayManager(playerx, playero)
gm.SetTurnPlayerSwitchedFunction((xoro) => {
    let playerxicon = document.querySelector(".x-icon.player-icon")
    let playeroicon = document.querySelector(".o-icon.player-icon")
    switch (xoro){
        case 'x':
            playerxicon.setAttribute("visibility", "visible")
            playeroicon.setAttribute("visibility", "hidden")
            console.log("x visible")
            break;
        case 'o':
            playerxicon.setAttribute("visibility", "hidden")
            playeroicon.setAttribute("visibility", "visible")
            console.log("o visible")
            break;
    }
})

gm.Start(document.querySelector(".gameboard-area"));
