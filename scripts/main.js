window.addEventListener("load", async () => {
    const words = await fetch('./public/words.json', {headers: {'Content-Type': 'application/json'}}).then(response => response.json())
    let gameMatrix = Array(4).fill(null).map(x => Array(4).fill(null))
    let info = {line: 0, letter: 0, word: words[4][Math.floor(Math.random() * words[4].length)]}
    console.log(info.word)

    window.addEventListener("keydown", (e) => {
        if(info.line > gameMatrix - 1){
            alert("nanay")
        } else{
            handleKeys(e, info, gameMatrix)
        }
    })

    drawBoard(gameMatrix);
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
    let unnaccepted = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", " ", "Tab", "Alt", "Control", "Shift", "CapsLock", "AltGraph", "Meta", "ContextMenu", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", ".", "-", ";", ":", "_", "`", "+", "´", "ç", "^", "*", "¨", "Ç", "[", "]", "{", "}", "ç", "Ç"]
    if(!unnaccepted.includes(e.key)){
        let cell = document.getElementById(`line-${info.line}-cell-${info.letter}`)
        if(e.key == "Backspace"){
            cell = document.getElementById(`line-${info.line}-cell-${info.letter}`)
            cell.innerText = ""
            info.letter = info.letter - 1 < 0 ? 0 : info.letter - 1
            let classes = cell.classList
            if(classes.value.includes("filled")){
                cell.classList.remove("filled")
            }
        } else if(e.key == "Enter"){
            cellManager(info,gameMatrix)
        } else{
            if(info.letter <= gameMatrix.length - 1){
                cell.innerText = e.key
                let classes = cell.classList
                if(!classes.value.includes("filled")){
                    cell.classList.add("filled")
                }
                info.letter = info.letter + 1 > gameMatrix.length - 1 ? info.letter = gameMatrix.length - 1 : info.letter + 1
            } else{
                info.letter = gameMatrix.length - 1
                let classes = cell.classList
                if(!classes.value.includes("filled")){
                    cell.classList.add("filled")
                }
            }
        }
    }
}

function cellManager(info, gameMatrix){
    const charsWord = info.word.toLowerCase().split("");
    let charsUser = []
    let wordUser = ""
    for(let i = 0; i < gameMatrix.length; i++){
        const char = document.getElementById(`line-${info.line}-cell-${i}`).innerText.toLowerCase()
        charsUser.push(char)
        wordUser += char
    }
    if(wordUser == info.word){
        alert(`Has ganado en el intento ${info.line + 1}`)
        for(let i = 0; i < gameMatrix.length; i++){
            document.getElementById(`line-${info.line}-cell-${i}`).classList.add('correct')
        }
    } else{
        for(let i = 0; i < gameMatrix.length; i++){
            if(charsWord[i] == charsUser[i]){
                document.getElementById(`line-${info.line}-cell-${i}`).classList.add('correct')
                console.log(charsWord[i] + " es igual a " + charsUser[i] + "  -  " + i)
            } else if(containsLetterOtherPosition(charsUser[i], i, info, charsWord) >= 0){
                document.getElementById(`line-${info.line}-cell-${i}`).classList.add('position')
                console.log(charsUser[i] + " está en otra posición " + "  -  " + i)
            } else{
                document.getElementById(`line-${info.line}-cell-${i}`).classList.add('wrong')
                console.log("mal" + "  -  " + i)
            }
        }
        info.line++;
        info.letter = 0;
        if(info.line >= info.word.length){
            matchLost();
        }
    }
}

function containsLetterOtherPosition(letter, position, info, charsWord){
    let contains = -1
    for(let i = 0; i < info.word.length && contains < 0; i++){
        if(charsWord[i] == letter){
            //contains = i
            console.log("Contiene en: " + i)
            contains = i
        }
        console.log(charsWord[i] + " - " + position)
    }
    return contains
}

function matchLost(){
    alert("Has perdido la partida :C")
}