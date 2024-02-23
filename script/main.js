const bg = document.querySelector(".background")
const wrap = document.querySelector(".wrap")

const settings = {
    'xPath': './images/X.png',
    'oPath': './images/O.png',
    'countSquares': 9,
    'flag': false,
    'store': [],
    'winX':  [],
    'winO':  [],
    'once': true,
    'winComb': [
        [1,2,3],
        [1,4,7],
        [1,5,9],
        [2,5,8],
        [3,5,7],
        [3,6,9],
        [4,5,6],
        [7,8,9]
    ]
                                                                                                                                                                                                                                                                   
}

const createElement = (tag, classElem, append) => {
    const element = document.createElement(tag)
    element.classList.add(classElem)
    append.append(element)
} 

const startGame = () => {
    for(let i = 0; i < settings.countSquares; i++){
        createElement('div','square',wrap)
    }

    createElement('span','turn-text',bg)
    createElement('span','win-text',bg)
    createElement('span','restart-button',bg)

}

startGame()

const winner = () => {
    const winText = document.querySelector('.win-text')
    const x =settings.winX 
    const o = settings.winO              
    if (settings.countSquares === 0){
        winText.innerHTML= 'It`s tie!!!'
        return
    } 
    for(let i = 0; i < settings.winComb.length; i++){
        let win = settings.winComb[i]

        if(x.includes(win[0]) && x.includes(win[1]) && x.includes(win[2])){
            winText.innerHTML = 'X` s win the game!'
        }else if (o.includes(win[0]) && o.includes(win[1]) && o.includes(win[2])){
            winText.innerHTML = 'O` s win the game!'
        }
    }
}
    

const playerTurn = (player, flagP, img) =>{
    img.setAttribute('src', player)
    settings.flag = flagP

}
const square = document.querySelectorAll(".square") 

square.forEach((elem,index) => {
    elem.addEventListener('click',function (e) {

        const check = elem.classList.contains(".square")
        const img = document.createElement("img")


        if(!check){
            settings.store[index] = settings.flag
            if(!settings.flag){
                playerTurn(settings.xPath,true,img)
                settings.winX.push(index + 1)
            } else {
                playerTurn(settings.oPath,false,img)
                settings.winO.push(index + 1)

            }
            elem.append(img)
            settings.countSquares -= 1
            winner()
        }

    },{'once': settings.ones})
}) 

const restart = document.querySelector(".restart-button")
restart.innerHTML="Restart"
restart.addEventListener('click',(e) => {
    window.location.reload()
})