window.addEventListener("load", async () => {
    const words = await fetch('./public/words.json', {headers: {'Content-Type': 'application/json'}}).then(response => response.json())
    let wordLength = 5
    let tries = 4
    //let gameMatrix = Array(4).fill(null).map(x => Array(4).fill(null))
    let gameMatrix = Array(wordLength).fill(null).map(x => Array(tries).fill(null))
    let info = {line: 0, letter: 0, word: words[wordLength][Math.floor(Math.random() * words[wordLength].length)]}
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
            cellManager(info, gameMatrix)
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
    let charsWord = info.word.toLowerCase().split("");
    let charsUser = []
    console.log(charsWord)
    let wordUser = ""
    // Get writen by player
    for(let i = 0; i < gameMatrix.length; i++){
        const char = document.getElementById(`line-${info.line}-cell-${i}`).innerText.toLowerCase()
        charsUser.push(char)
        wordUser += char
    }
    console.log(charsUser)
    if(wordUser == info.word){
        for(let i = 0; i < gameMatrix.length; i++){
            document.getElementById(`line-${info.line}-cell-${i}`).classList.add('correct')
        }
        alert(`Has ganado en el intento ${info.line + 1}`)
    } else{
        for(let i = 0; i < gameMatrix.length; i++){
            if(!charsWord.includes(charsUser[i])){
                document.getElementById(`line-${info.line}-cell-${i}`).classList.add('wrong')
                charsUser[i] = null
            }
            for(let i = 0; i < gameMatrix.length; i++){
                if(charsWord[i] == charsUser[i]){
                    document.getElementById(`line-${info.line}-cell-${i}`).classList.add('correct')
                    charsWord[i] = null
                    charsUser[i] = null
                }
            }
        }
        let terminar = false
        let contador = 0
        console.log(charsWord)
        console.log(charsUser)
        while(!terminar){
            if(!fullNull(charsUser)){
                if(charsUser[contador] != null){
                    if(charsWord.includes(charsUser[contador])){
                        document.getElementById(`line-${info.line}-cell-${contador}`).classList.add('position')
                        let indice = charsWord.indexOf(charsUser[contador])
                        charsWord[indice] = null
                        charsUser[contador] = null
                    } else{
                        terminar = true
                    }
                }
            } else{
                terminar = true
            }
            contador++;
            contador = contador > (gameMatrix.length - 1) ? 0 : contador;
        }
        info.line++;
        info.letter = 0;
        if(info.line >= info.word.length){
            matchLost(info);
        }
    }
    
}

function fullNull(matrix){
    let maxCount = matrix.length
    let count = 0

    for(let i = 0; i < maxCount; i++){
        if(matrix[i] == null){
            count++
        }
    }
    return count == maxCount
}

/*function cellManager(info, gameMatrix){
    let charsWord = info.word.toLowerCase().split("");
    let charsUser = []
    console.log(charsWord)
    let wordUser = ""
    // Get writen by player
    for(let i = 0; i < gameMatrix.length; i++){
        const char = document.getElementById(`line-${info.line}-cell-${i}`).innerText.toLowerCase()
        charsUser.push(char)
        wordUser += char
    }
    console.log(charsUser)
    if(wordUser == info.word){
        for(let i = 0; i < gameMatrix.length; i++){
            document.getElementById(`line-${info.line}-cell-${i}`).classList.add('correct')
        }
        alert(`Has ganado en el intento ${info.line + 1}`)
    } else{
        for(let i = 0; i < gameMatrix.length; i++){
            if(!charsWord.includes(charsUser[i])){
                document.getElementById(`line-${info.line}-cell-${i}`).classList.add('wrong')
                charsWord[i] = null
                charsUser[i] = null
            }
        }
        for(let i = 0; i < gameMatrix.length; i++){
            if(charsWord[i] != null){
                if(charsWord[i] == charsUser[i]){
                    document.getElementById(`line-${info.line}-cell-${i}`).classList.add('correct')
                    charsWord[i] = null
                    charsUser[i] = null
                }
            }
        }
        console.log(charsWord)
        console.log(charsUser)
        for(let i = 0; i < gameMatrix.length; i++){
            if(charsUser[i] != null){
                charsWord[indexOf(charsUser[i])] = null
                charsUser[i] = null
                document.getElementById(`line-${info.line}-cell-${i}`).classList.add('position')
            }
        }
        for(let i = 0; i < gameMatrix.length; i++){
            if(charsUser[i] != null){
                document.getElementById(`line-${info.line}-cell-${i}`).classList.add('position')
            }
        }
        info.line++;
        info.letter = 0;
        if(info.line >= info.word.length){
            matchLost(info);
        }
    }
    
}*/

function containsLetterOtherPosition(letter, position, info, charsWord){
    let contains = -1
    for(let i = 0; i < info.word.length && contains < 0; i++){
        if(charsWord[i] == letter){
            contains = i
        }
        console.log(charsWord[i] + " - " + position)
    }
    return contains
}

function matchLost(info){
    alert("Has perdido 😭. La palabra era " + info.word)
}