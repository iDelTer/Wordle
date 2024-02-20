window.addEventListener("load", async () => {
    const words = await fetch('./public/words.json', {headers: {'Content-Type': 'application/json'}}).then(response => response.json())
    let word = words[1 + 3][Math.floor(Math.random(words[1 + 3].length))]
    console.log(word)
    let gameMatrix = Array(4).fill(null).map(x => Array(4).fill(null))
    let info = {line: 0, letter: 0}

    window.addEventListener("keydown", (e) => {
        handleKeys(e, info, gameMatrix)
        console.log(info.letter)
    })

    drawBoard(gameMatrix);
    setInterval(() => {
        //updateBoard();
    }, 100)
    console.log(words)
})

function drawBoard(gameMatrix){
    const gameBoard = document.getElementById("game")
    let text = ``
    for(let i = 0; i < gameMatrix.length; i++){
        text += `<div id='line-${i}' class='row'>`
        for(let j = 0; j < gameMatrix.length; j++){
            text += `<div id='line-${i}-cell-${j}' class='cell'></div>`
        }
        text += `</div>`
    }
    gameBoard.innerHTML = text
}

function handleKeys(e, info, gameMatrix){
    console.log(e)
    let cell = document.getElementById(`line-${info.line}-cell-${info.letter}`)
    if(e.key == "Backspace"){
        cell = document.getElementById(`line-${info.line}-cell-${info.letter - 1}`)
        cell.innerText = ""
        info.letter = info.letter - 1 < 0 ? 0 : info.letter - 1
        let classes = cell.classList
        if(classes.value.includes("filled")){
            cell.classList.remove("filled")
        }
    } else{
        if(info.letter <= gameMatrix.length - 1){
            cell.innerText = e.key
            let classes = cell.classList
            if(!classes.value.includes("filled")){
                cell.classList.add("filled")
            }
            info.letter = info.letter > gameMatrix.length - 1 ? info.letter = gameMatrix.length - 1 : info.letter + 1
        } else{
            info.letter = gameMatrix.length - 1
            let classes = cell.classList
            if(!classes.value.includes("filled")){
                cell.classList.add("filled")
            }
        }
    }
    
}