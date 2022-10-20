// Making random board whenever called(needed)
function makeRandomBoard(difficulty_level) {

    // This is one valid board
    final_board = "685329174971485326234761859362574981549618732718293465823946517197852643456137298";

    // Swapping appropriate pairs of rows randomly
    var row1_to_be_swapped = Math.floor(Math.random() * 3);
    var row2_to_be_swapped = Math.floor(Math.random() * 3);
    swapRows(row1_to_be_swapped, row2_to_be_swapped);
    row1_to_be_swapped = Math.floor(Math.random() * 3) + 3;
    row2_to_be_swapped = Math.floor(Math.random() * 3) + 3;
    swapRows(row1_to_be_swapped, row2_to_be_swapped);
    row1_to_be_swapped = Math.floor(Math.random() * 3) + 6;
    row2_to_be_swapped = Math.floor(Math.random() * 3) + 6;
    swapRows(row1_to_be_swapped, row2_to_be_swapped);

    // Swapping appropriate pairs of columns randomly
    var col1_to_be_swapped = Math.floor(Math.random() * 3);
    var col2_to_be_swapped = Math.floor(Math.random() * 3);
    swapCols(col1_to_be_swapped, col2_to_be_swapped);
    col1_to_be_swapped = Math.floor(Math.random() * 3) + 3;
    col2_to_be_swapped = Math.floor(Math.random() * 3) + 3;
    swapCols(col1_to_be_swapped, col2_to_be_swapped);
    col1_to_be_swapped = Math.floor(Math.random() * 3) + 6;
    col2_to_be_swapped = Math.floor(Math.random() * 3) + 6;
    swapCols(col1_to_be_swapped, col2_to_be_swapped);

    // Deleting some numbers based on difficulty
    if(difficulty_level == 1) {
        for(let i = 0; i < 81; i++) {
            if(Math.random()>0.5) {
                final_board = final_board.substring(0, i) + "-" + final_board.substring(i+1, 81);
            }
        }
    }
    else if(difficulty_level == 2) {
        for(let i = 0; i < 81; i++) {
            if(Math.random()>0.42) {
                final_board = final_board.substring(0, i) + "-" + final_board.substring(i+1, 81);
            }
        }
    }
    else {
        for(let i = 0; i < 81; i++) {
            if(Math.random()>0.35) {
                final_board = final_board.substring(0, i) + "-" + final_board.substring(i+1, 81);
            }
        }
    }

}

// Function to swap 2 rows
function swapRows(row1, row2) {
    let tmp_row1 = final_board.substring(row1 * 9, (row1 * 9) + 9);
    let tmp_row2 = final_board.substring(row2 * 9, (row2 * 9) + 9);
    if(row1 < row2) {
        final_board = final_board.substring(0, row1 * 9) + tmp_row2 + final_board.substring((row1 * 9) + 9, row2 * 9) + tmp_row1 + final_board.substring((row2 * 9) + 9, 81);
    }
    else if(row2 < row1) {
        final_board = final_board.substring(0, row2 * 9) + tmp_row1 + final_board.substring((row2 * 9) + 9, row1 * 9) + tmp_row2 + final_board.substring((row1 * 9) + 9, 81);
    }
}

// Function to swap 2 columns
function swapCols(col1, col2) {
    // col1 to be smaller than col2 if not already
    if(col1 > col2) {
        col1 = col1 + col2;
        col2 = col1 - col2;
        col1 = col1 - col2;
    }

    let tmp_col1 = "";
    let tmp_col2 = "";
    for(let i = col1; i < 81; i = i + 9) {
        
        tmp_col1 = tmp_col1 + final_board.substring(i, i+1);
    }
    for (let i = col2; i < 81; i = i + 9) {

        tmp_col2 = tmp_col2 + final_board.substring(i, i+1);
    }

    for(let i = col1; i < 81; i = i + 9) {

        final_board = final_board.substring(0, i) + tmp_col2.substring(Math.floor(i/9), Math.floor(i/9) + 1) + final_board.substring(i + 1, 81);
    }
    for(let i = col2; i < 81; i = i + 9) {

        final_board = final_board.substring(0, i) + tmp_col1.substring(Math.floor(i/9), Math.floor(i/9) + 1) + final_board.substring(i + 1, 81);
    }
}


// Creating variables
var timer;
var time_remaining;
var selected_num;
var selected_tile;
var disableSelect;

window.onload = function() {
    // Run startgame function when start game button is clicked
    id("start-button").addEventListener("click", startGame);

    // Theme toggling(and ofcourse adding event listener to the theme toggle icon)
    id("theme-toggle").addEventListener("click", function() {
        if(this.classList.contains("text-dark")) { //if current theme is light
            this.classList.remove("text-dark");
            this.classList.add("text-white");
            id("body").classList.add("dark");
            id("header").classList.add("dark");
            tiles = qsa(".tile");
            for(let i = 0; i < tiles.length; i++) {
                tiles[i].classList.add("tileWhite");
            }
            tiles_with_right_border = qsa(".rightBorder");
            for(let i = 0; i < tiles_with_right_border.length; i++) {
                tiles_with_right_border[i].classList.add("rightBorderWhite");
            }
            tiles_with_left_border = qsa(".leftBorder");
            for(let i = 0; i < tiles_with_left_border.length; i++) {
                tiles_with_left_border[i].classList.add("leftBorderWhite");
            }
            tiles_with_bottom_border = qsa(".bottomBorder");
            for(let i = 0; i < tiles_with_bottom_border.length; i++) {
                tiles_with_bottom_border[i].classList.add("bottomBorderWhite");
            }
            tiles_with_top_border = qsa(".topBorder");
            for(let i = 0; i < tiles_with_top_border.length; i++) {
                tiles_with_top_border[i].classList.add("topBorderWhite");
            }
        }
        else { //if current theme is dark
            this.classList.remove("text-white");
            this.classList.add("text-dark");
            id("body").classList.remove("dark");
            id("header").classList.remove("dark");
            tiles = qsa(".tileWhite");
            for(let i = 0; i < tiles.length; i++) {
                tiles[i].classList.remove("tileWhite");
            }
            tiles_with_right_border = qsa(".rightBorderWhite");
            for(let i = 0; i < tiles_with_right_border.length; i++) {
                tiles_with_right_border[i].classList.remove("rightBorderWhite");
            }
            tiles_with_left_border = qsa(".leftBorderWhite");
            for(let i = 0; i < tiles_with_left_border.length; i++) {
                tiles_with_left_border[i].classList.remove("leftBorderWhite");
            }
            tiles_with_bottom_border = qsa(".bottomBorderWhite");
            for(let i = 0; i < tiles_with_bottom_border.length; i++) {
                tiles_with_bottom_border[i].classList.remove("bottomBorderWhite");
            }
            tiles_with_top_border = qsa(".topBorderWhite");
            for(let i = 0; i < tiles_with_top_border.length; i++) {
                tiles_with_top_border[i].classList.remove("topBorderWhite");
            }
        }
    })

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
    
    if (id("diff1").selected) {
        makeRandomBoard(1);
        board = final_board;
    }
    else if (id("diff2").selected) {
        makeRandomBoard(2);
        board = final_board;
    }
    else {
        makeRandomBoard(3);
        board = final_board;
    }
    disableSelect = false

    //Generating Board
    generateBoard(board);
    // If the dark theme was active when new game button is clicked, then all borders are made white because by default it will be black
    if(id("theme-toggle").classList.contains("text-white")) {
        tiles = qsa(".tile");
        for(let i = 0; i < tiles.length; i++) {
            tiles[i].classList.add("tileWhite");
        }
        tiles_with_right_border = qsa(".rightBorder");
        for(let i = 0; i < tiles_with_right_border.length; i++) {
            tiles_with_right_border[i].classList.add("rightBorderWhite");
        }
        tiles_with_left_border = qsa(".leftBorder");
        for(let i = 0; i < tiles_with_left_border.length; i++) {
            tiles_with_left_border[i].classList.add("leftBorderWhite");
        }
        tiles_with_bottom_border = qsa(".bottomBorder");
        for(let i = 0; i < tiles_with_bottom_border.length; i++) {
            tiles_with_bottom_border[i].classList.add("bottomBorderWhite");
        }
        tiles_with_top_border = qsa(".topBorder");
        for(let i = 0; i < tiles_with_top_border.length; i++) {
            tiles_with_top_border[i].classList.add("topBorderWhite");
        }
    }

    // Start timer
    startTimer();

}

function startTimer() {
    // Set remaining time
    if(id("time1").selected) time_remaining = 300;
    else if(id("time2").selected) time_remaining = 420;
    else time_remaining = 600
    id("timer").classList.remove("red");

    id("timer").textContent = timeConversion(time_remaining);

    // updates every 1000ms (1 second)
    timer = setInterval(function() {
        time_remaining--;

        // Turns time remaining to red as warning to the player that very less time is remaining
        if(time_remaining<=30) {
            id("timer").classList.add("red");
        }

        // Disable selection and end game if time is up
        if(time_remaining==0) {
            disableSelect = true;
            clearTimeout(timer);
            endGame();
        }

        id("timer").textContent = timeConversion(time_remaining);
    }, 1000)
}

// Function to convert seconds to minutes and seconds 
function timeConversion(time) {
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    if(seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function generateBoard(board) {
    // Clearing any previous board
    clearPrev();

    let idCount = 0;

    // Creating all 81 tiles and filling them appropriately
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

        // Function by which tiles can be assigned incorrect/mightbecorrect classes
        if(checkIfValidPosition(selected_tile)) {
            selected_tile.classList.remove("incorrect");
            selected_tile.classList.add("mightbecorrect");
            selected_tile.classList.remove("selected");
            selected_tile = null;
        }
        else {
            selected_tile.classList.remove("mightbecorrect");
            selected_tile.classList.add("incorrect");
        }

        // Check if all tiles are filled correctly and end the game if true
        if(allCorrect()) {
            disableSelect = true;
            endGame();
        }
    }
}

// Function to check if all tiles are filled and follow all rules of Sudoku
function allCorrect() {
    
    let tiles = qsa(".tile");
    for(let tmp = 0; tmp < 81; tmp++) {
        if(tiles[tmp].textContent==0) return false;
        if(!checkIfValidPosition(tiles[tmp])) return false;
    }
    return true;
}

// Function to check if the number in tile satisfies all rules of Sudoku
function checkIfValidPosition(tile) {
    let tiles = qsa(".tile");

    // To check the row in which tile is present
    for(let i = Math.floor(tile.id/9) * 9; i < (Math.floor(tile.id/9) * 9) + 9 ; i++) {
        if(tile.textContent == tiles[i].textContent && i != tile.id) {
            return false;
        }
    }
    
    // To check the column in which tile is present
    for(let i = tile.id%9; i < 81 ;i=i+9) {
        if(tile.textContent == tiles[i].textContent && i != tile.id) {
            return false;
        }
    }

    // To check the 3*3 block in which tile is present
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

// Function to end current game
function endGame() {

    // Win/Loss message to be shown
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