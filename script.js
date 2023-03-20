

let gameplayobject;

//Start for start button
const GenGameplay = function(playerx, playero){
    let turnplayer;
    let board;

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
        if (turnplayer === playerx || turnplayer === playero){
            turnplayer = newturnplayer;
        }
    }

    const SwitchTurnPlayer = () => {
        if (turnplayer === playerx){
            turnplayer = playero;
        } else if (turnplayer === playero){
            turnplayer = playerx;
        }
    }

    const CellPicked = (event) => {
        if(event.target.innerHTML === ''){
            board.SetCell(event.target, turnplayer.xory)
            SwitchTurnPlayer();
        }
    }

    return {Start}
}

const Player = function(xory, name = '', wins = 0){
    return{xory, name, wins}
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

    const SetCell = (cell, xoro) => {
        if (cell.innerHTML === ''){
            const image = document.createElement("div")
            image.classList.add("game-cell-image")
                switch (xoro.toString().toLowerCase()){
                    case 'x':
                        image.src = "./images/fencing.svg"                        
                        image.classList.add("x-icon")
                        break;
                    case 'o':
                        image.src = "./images/shield-outline.svg"                        
                        image.classList.add("o-icon")
                        break;
                }
            cell.append(image);
        }
    }

    const SetCellEventListener = (EventListener) => {
        let cells = board.querySelectorAll(".game-cell")
        cells.forEach(cell => {
            cell.addEventListener('click', EventListener, false)
        })
    }

    return {GetBoard, GetCell, SetCell}
}