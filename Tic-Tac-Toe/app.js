let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rst-btn");
let newgameBtn = document.querySelector("#new-btn");
let msgConatiner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0; //in case of draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgConatiner.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

         let isWinner = checkWinner();
          
         if(count === 9 && !isWinner) {
            gameDraw();
         }
    });
});

const gameDraw = () => {
    msg.innerText = `The game was a draw.`;
    msgConatiner.classList.remove("hide");
    disableBoxes();  
}

const disableBoxes = () => {  //cannot access any box.
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congrats the winner is: ${winner}`;
    msgConatiner.classList.remove("hide");  //will display
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
};

newgameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);