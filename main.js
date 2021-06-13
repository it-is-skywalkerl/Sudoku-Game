// Loading boards
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

// Creating variables
var timer;
var time_remaining;
var selected_num;
var selected_tile;
var disableSelect;

window.onload = function() {
    // Run startgame function when start game button is clicked
    id("start-button").addEventListener("click", startGame);
    // Adding event listener to the number containers
    for(let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].addEventListener("click", function() {
            if(disableSelect == false) {
                if(this.classList.contains("selected")) {
                    this.classList.remove("selected");
                    selected_num = null;
                }
                else {
                    for(let i = 0; i < id("number-container").children.length; i++) {
                        id("number-container").children[i].classList.remove("selected");
                    }
                    this.classList.add("selected");
                    selected_num = this;
                    updateMove();
                }
            }
        })
    }
}

function startGame() {
    //Choosing by board difficulty
    let board;
    if (id("diff1").selected) board = easy[0];
    else if (id("diff2").selected) board = medium[0];
    else board = hard[0];
    disableSelect = false

    //Generating Board
    generateBoard(board);

    // Start timer
    startTimer();

}

function startTimer() {
    // Set remaining time
    if(id("time1").selected) time_remaining = 180;
    else if(id("time2").selected) time_remaining = 300;
    else time_remaining = 420
    id("timer").classList.remove("red");

    id("timer").textContent = timeConversion(time_remaining);

    timer = setInterval(function() {
        time_remaining--;

        if(time_remaining<=30) {
            id("timer").classList.add("red");
        }

        if(time_remaining==0) {
            disableSelect = true;
            clearTimeout(timer);
            endGame();
        }

        id("timer").textContent = timeConversion(time_remaining);
    }, 1000)
}

function timeConversion(time) {
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    if(seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function generateBoard(board) {
    // Clearing any previous board
    clearPrev();
    // 
    let idCount = 0;

    for(let i=0; i<81 ; i++) {
        let tile = document.createElement("p");
        if(board.charAt(i) != '-') {
            tile.textContent = board.charAt(i);
        }
        else {
            tile.addEventListener("click", function() {
                if(disableSelect == false) {
                    if (tile.classList.contains("selected")) {
                        tile.classList.remove("selected");
                        selected_tile = null;
                    }
                    else {
                        for(let i = 0; i < 81; i++) {
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        tile.classList.add("selected");
                        selected_tile = tile;
                        updateMove();
                    }
                }
            })
        }
        // Assingning tile IDs
        tile.id = idCount;
        idCount++;

        // Adding appropriate classes
        tile.classList.add("tile");
        if((tile.id>=18 && tile.id<=26) || (tile.id>=45 && tile.id<=53) || (tile.id>=72 && tile.id<=80)) {
            tile.classList.add("bottomBorder");
        }
        if(tile.id%9==2 || tile.id%9==5 || tile.id%9==8) {
            tile.classList.add("rightBorder");
        }
        if(tile.id%9==0) {
            tile.classList.add("leftBorder");
        }
        if(tile.id>=0 && tile.id<=8) {
            tile.classList.add("topBorder");
        }

        // Adding tiles to the board
        id("board").appendChild(tile);
    }
}

function clearPrev() {
    // Removing each tile
    let tiles = qsa(".tile");
    for(let i = 0; i < tiles.length; i++)
    {
        tiles[i].remove();
    }

    // Clear timer
    if(timer) clearTimeout(timer);

    // Removing win-loss status
    id("win_loss").classList.add("hidden");

    // Deselect numbers
    for(let i = 0; i < id("number-container").children.length; i++)
    {
        id("number-container").children[i].classList.remove("selected");
    }

    selected_num = null;
    selected_tile = null;
}

function updateMove() {
    if(selected_tile && selected_num) {
        selected_tile.textContent = selected_num.textContent;

        if(checkIfValidPosition(selected_tile)) {
            selected_tile.classList.remove("incorrect");
            selected_tile.classList.remove("selected");
            selected_tile = null;
        }
        else {
            selected_tile.classList.add("incorrect");
        }

        if(allCorrect()) {
            endGame();
        }
    }
}

function allCorrect() {
    let tiles = qsa(".tile");
    for(let tmp = 0; tmp < 81; tmp++) {
        if(tiles[tmp].textContent==0) return false;
        if(!checkIfValidPosition(tiles[tmp])) return false;
    }
    return true;
}

function checkIfValidPosition(tile) {
    let tiles = qsa(".tile");

    for(let i = Math.floor(tile.id/9) * 9; i < (Math.floor(tile.id/9) * 9) + 9 ; i++) {
        if(tile.textContent == tiles[i].textContent && i != tile.id) {
            return false;
        }
    }
    
    for(let i = tile.id%9; i < 81 ;i=i+9) {
        if(tile.textContent == tiles[i].textContent && i != tile.id) {
            return false;
        }
    }
    // for(let i = tile.id+9; ; i=i+9) {
    //     if(i>80) break;
    //     if(tile.textContent == tiles[i].textContent) {
    //         return false;
    //     }
    //     if(Math.floor(i/9) == 8) break;
    // }

    let big_row;
    let big_col;
    if(tile.id/9 < 3) big_row = 0;
    else if(tile.id/9 < 6) big_row = 3;
    else big_row = 6;

    if(tile.id%9 <= 2) big_col = 0;
    else if(tile.id%9 <= 5) big_col = 3;
    else big_col = 6;

    for(let i = 9*big_row; i < (9*big_row)+27; i=i+9) {
        for(let j = i + big_col; j < (i + big_col)+3; j++) {
            if(tile.textContent == tiles[j].textContent && j != tile.id) {
                return false;
            }
        }
    }

    return true;
}

function endGame() {
    id("win_loss").classList.remove("hidden");
    if(time_remaining > 0) {
        id("win_loss_status").textContent = "You won :)";
        clearTimeout(timer);
    }
    else {
        id("win_loss_status").textContent = "You lost :|";
    }
}


// Helper Functions
function id(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}