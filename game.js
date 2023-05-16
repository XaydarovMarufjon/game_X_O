

// avval o'yin uchun holat obyrktini yasab olamiz 
const game = {
    xTurn: true,// O'yindagi X ning boshlang'ich holati yani oyinni X boshlab beradi
    xState: [], // X ni katakdagi o'rinlarini yig'uvchi massiv
    oState: [], // Y ni katakdagi o'rinlarini yig'uvchi massiv
    winningStates: [  // Yutish mumkin bolgan barcha holatlar
        // qator
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // ustun
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

    const audio1 = new Audio('./sounds/Salom hurmatli foyda.mp3');
    audio1.play();


document.addEventListener('click', event => { /// document.addEventListner butun saxifaga hodisa qoshadi
    const target = event.target     // tanlab olingan katak yani sichqoncha bilan bosilgan
    const isCell = target.classList.contains('grid-cell') // tanlab olingan katakda shu class bor yoki yoqligi tekshiradi 
    const isDisabled = target.classList.contains('disabled')  // tanlab olingan katakda shu class bor yoki yoqligi tekshiradi 

    if (isCell && !isDisabled) { /// agar tanlab olingan katakdan classlar aniqlansa va true bolsa 
    const cellValue = target.dataset.value /// uning data-value attributidan qiymatini oladi 

    game.xTurn === true // boshlangich xolatda true kelgan boladi yani 
    ? game.xState.push(cellValue) // Yani xState massivga data-valuee qiymatni joylaydi
    : game.oState.push(cellValue) // yoki yStatega data-value qiymatni joylaydi

      target.classList.add('disabled')  // osha tanlangan classni qayta bosilmasligi uchun disabled clasini qoshadi
      target.classList.add(game.xTurn ? 'x' : 'o') // agar xTurn == true ga ekrandagi katakchaga X ni chiqaradi

      game.xTurn = !game.xTurn // xTurni holatini ozgartiradi yanni ture bo'lsa false , false bo'lsa Truega 
    }

    if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) { //  disabled clasi yoq .grid-cell  clasni sanaydi !true / bor yoki yoq / class qolmagan pyt truega aylanadi yani  !false
        
    document.querySelector('.game-over').classList.add('visible') // Har safar katakka belgi qo'shsak, uni o'chirib qo'yamiz
    document.querySelector('.game-over-text').textContent = 'O\'yin yakunlandi!'
    }
  
   game.winningStates.forEach(winningState => {
    const xWins = winningState.every(state => game.xState.includes(state)) // xWins massivini tekshiradi  true / false 
    const oWins = winningState.every(state => game.oState.includes(state))// yWins massivini tekshiradi   true / false 
    
    if (xWins || oWins) {  
        document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled')) // true holat kelganida oyin toxtaydi 
        document.querySelector('.game-over').classList.add('visible')        // toxtauvchi oyna ishga tushadi 
        document.querySelector('.game-over-text').textContent = xWins     // agar xwins  TRUE holatida kelgan bolsa 
            ? 'X g\'olib!'                                                   // Ekranga X lar g'olib dgan yozuv chiqadi Yoki
            : 'O g\'olib!'                                                   // Ekranga Y lar g'olib dgan yozuv chiqadi
    } 
    if (xWins) {
        const audio = new Audio('./sounds/Ikslar uyinda yutdi.mp3');
        audio.play();
    }
    if(oWins){
        const audio = new Audio('./sounds/no llar uyinda yutdi.mp3');
        audio.play();
    }

   })
})


document.querySelector('.restart').addEventListener('click', () => {     // restart tugmasi bosilganda Obyekt yangilanadi 
    const audio = new Audio('./sounds/uyinni Qayta boshlas.mp3');
        audio.play();
    document.querySelector('.game-over').classList.remove('visible')        // yakunlovchi oyna yopiladi 
    document.querySelectorAll('.grid-cell').forEach(cell => {            // .grid-cell  clasi bor hamma classni tanlaydi 
        cell.classList.remove('disabled', 'x', 'o')                    // x , o va disabled classlari olib tashlanadi 
    })

    game.xTurn = true          // x ni holati boshiga qaytadi
    game.xState = []  // xState massiv bosh holatga qaytadi 
    game.oState = []  // yState massiv bosh holatga qaytadi 
})

