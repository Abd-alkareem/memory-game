// heading for the game
let gameName = "Memory game-003";
document.title = gameName; 

// elements from the document
let mainHolder = document.querySelector(".holder");
let startBtn = document.querySelector(".start-btn");
let nameSpan = document.querySelector(".p-name");
let trys = document.querySelector(".trys");
let boardBt = document.querySelector("header .board-btn");
let cards = [];
// data for the game
let wTrys = 0;
let items = [
    {
        tecnologyName:"html5",
        tecnologyIcon:"html5",
        color:"e34c26",
    },
    {
        tecnologyName:"css3",
        tecnologyIcon:"css3",
        color:"008ed4",
    },
    {
        tecnologyName:"js",
        tecnologyIcon:"js",
        color:"f89820",
    },
    {
        tecnologyName:"sass",
        tecnologyIcon:"sass",
        color:"cc6699",
    },
    {
        tecnologyName:"bootstrap",
        tecnologyIcon:"bootstrap",
        color:"563d7c",
    },
    {
        tecnologyName:"react",
        tecnologyIcon:"react",
        color:"61dbfb",
    },

]
let numberOfItems = items.length;
let orderRange = [];
let playerName = '';


// wrong trys
trys.innerHTML = `wrong trys: ${wTrys}`;

// sitting option
let musicSt = true;
let timer = [minute = 0 ,second = 0];
let timerInt;

// sound btn
document.querySelector(".music-btn").addEventListener("click",()=>{
    document.querySelector(".music-btn").classList.toggle("miuted");
    if(musicSt){
        musicSt = false;
        document.querySelector(".background-m").pause();
    }else{
        musicSt = true;
        document.querySelector(".background-m").play();
    }
})

// satrting the game function's
startBtn.addEventListener("click",()=>{
    // starting game sound 
    if(musicSt)  document.querySelector(".audio .start-m").play();
    // insert player name
    let Name = window.prompt("Player Name","Unknown");
    nameSpan.innerHTML = Name.toUpperCase();
    playerName = Name;
    // generating cards
    generatingCards();
    // remove the layout 
    document.querySelector(".lay-out").classList.add("not-active");
    //shuffleing cards
    shuffleRange(orderRange);
    cards.forEach((ele,ind)=>{
        ele.style.order = `${orderRange[ind]}`;
    })
    // starting background music
    setTimeout(()=>{
        document.querySelector(".background-m").play();
    },1500)
    // timer function
    document.querySelector(".time .minute").innerHTML = `0${minute}`;
    document.querySelector(".time .second").innerHTML = `0${second}`;
     timerInt = setInterval(()=>{
        second++;
        (second % 60 > 9) ? document.querySelector(".time .second").innerHTML = `${second % 60}` : document.querySelector(".time .second").innerHTML = `0${second % 60}`;;
        document.querySelector(".time .minute").innerHTML = `0${Math.floor(second / 60)}`;
    },1000)
})


// board function
boardBt.addEventListener("click",()=>{
    boardBt.classList.toggle("open");
})

// generating cards function
function generatingCards(){
    for(let i = 0 ; i<numberOfItems * 2;i++){
        // creatign elements
        let card = document.createElement("div");
        let frontF = document.createElement("div");
        let backF = document.createElement("div");
        let itemImg = document.createElement("img");
        let backI = document.createElement("i");
        // addign calsses
        card.className = "card";
        frontF.className = "front-face face";
        backF.className = "back-face face";
        itemImg.className = "item-image";
        backI.className = "back-face-i";
        // appending elements to each other
        backF.appendChild(backI)
        card.appendChild(frontF);
        card.appendChild(backF);

        // appending the new card to main container
        mainHolder.appendChild(card);
    }   
    // adding data to the cards
    cards = mainHolder.querySelectorAll(".card");
     let j = 0
    for (let i = 1; i<= numberOfItems * 2;i++ ){
        // adding the icon to the back face
        mainHolder.querySelectorAll(".back-face-i")[i - 1].classList.add(`fab`);
        mainHolder.querySelectorAll(".back-face-i")[i - 1].classList.add(`fa-${items[j].tecnologyIcon}`);
        mainHolder.querySelectorAll(".back-face-i")[i - 1].style.color = `#${items[j].color}`;
        // adding data-tecknologe to the card
        cards[i - 1].setAttribute("data-tecknologe",items[j].tecnologyName); 
        if(i % 2 == 0  ) j++;
    }
    orderRange = [...Array.from(cards.keys())];
    // flib block function
    let flibbedCardds = [];
    let matchedCards = [];
    cards.forEach((e)=>{
        e.addEventListener("click",()=>{
            // make the card flib
            e.classList.add("flibbed");
            // all flibbed cards
            flibbedCardds = mainHolder.querySelectorAll(".flibbed");
            if(flibbedCardds.length == 2){
                cards.forEach((e)=>{
                    // stop flibbing cards to match flibbed cards
                    e.classList.add("stop-flibbing");
                })
                if(flibbedCardds[0].getAttribute("data-tecknologe") === flibbedCardds[1].getAttribute("data-tecknologe")){
                    // cards is matched
                    flibbedCardds.forEach((e)=>{
                        e.classList.add("matched");
                    });
                    // matched card audio
                    if (musicSt) document.querySelector(".audio .matched-m").play();
                    // check if the game is finished -- all card matched
                    matchedCards = document.querySelectorAll(".card.matched");
                    if(matchedCards.length  == numberOfItems * 2){
                        // rnd game message 
                        setTimeout(()=>{
                            clearInterval(timerInt);
                            document.querySelectorAll(".win-message span")[0].innerHTML = `Good Job '${playerName}'  , You did it and win.`;
                            document.querySelectorAll(".win-message span")[1].innerHTML = `- '${wTrys}' wrong trys.`;
                            document.querySelectorAll(".win-message span")[2].innerHTML = `- '${minute}:${(second > 9) ? second  : `0${second}` }' s.`;
                            mainHolder.classList.add("done");
                            document.querySelector(".win-message").classList.add("active");
                        },300)
                        // stoping background music
                        document.querySelector(".background-m").pause();
                        // win game audio
                        if (musicSt) document.querySelector(".audio .win-m").play();
                    }
                }else{
                    // wrong card audio
                    if (musicSt) document.querySelector(".audio .wrong-m").play();
                    // cards is not matched 
                    wTrys++;
                    trys.innerHTML = `wrong trys: ${wTrys}`;
                }
                setTimeout(()=>{
                cards.forEach((e)=>{
                    // now we can click and flib cards
                    e.classList.remove("stop-flibbing");
                });
                flibbedCardds.forEach((e)=>{
                    // return the flibbed cards to the front face -- in case cards not matched
                    e.classList.remove("flibbed");
                });

                },1700)
            }
        })
    })
    
}


// shuffleing the order Range
function shuffleRange(Arr){
    let current = Arr.length;
    let temp,random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = Arr[current];
        Arr[current] = Arr[random];
        Arr[random] = Arr[temp];
    }
    return Arr;
}





