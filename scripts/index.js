(function(){
    const getContent = document.querySelector(".cards-section")
    const add_Card =  document.querySelector(".add")
    const cardForm = document.querySelector(".add-new-card")
    const getNewCardBtn = document.querySelector(".add-card")
    const backBtn = document.querySelector(".back")
    const removeAllCards = document.querySelector(".remove-all")
    const cardsFinishes = document.querySelector(".card-finish")
    let cardId = 1;
    let cardCompleted = 0;
    
    openCardForm = ()=>{
        cardForm.classList.toggle("active")
        add_Card.classList.toggle("disabled")
        backBtn.classList.toggle("disabled")
    }


    closeCardForm = ()=>{
        cardForm.classList.toggle("active")
        add_Card.classList.toggle("disabled")
        backBtn.classList.toggle("disabled")
    }

    createCard = ()=>{
        const titleValue = document.querySelector("#title").value
        const descriptionValue = document.querySelector("#description").value
        const cardBox = document.createElement("div")
        const titleCard = document.createElement("div")
        const descriptionCard = document.createElement("div")
        const timeCard = document.createElement("div")
        let currentHourNow = dateHour();

        cardId++
        
        cardBox.classList.add("card-task-" + cardId)

        titleCard.classList.add("title-task")
        titleCard.innerHTML = ` <p>${titleValue}</p>`

        descriptionCard.classList.add("description")
        descriptionCard.innerHTML = `${descriptionValue}`

        timeCard.classList.add("timeNow")
        timeCard.innerHTML = `${currentHourNow}`
        getContent.appendChild(cardBox, cardId).appendChild(titleCard)
        cardBox.appendChild(descriptionCard)
        cardBox.appendChild(timeCard)
        
        cardControl(cardId)
        closeCardForm()
        
        saveCard(cardId,titleValue,descriptionValue,currentHourNow,0)

    }

    function cardControl(index) {
        cardNumber = `.card-task-${index}`
        const allCards = document.querySelector(cardNumber)
    
        const controlDiv = createControlDiv();
        const removeControlDiv = createRemoveControlDiv(index);
        const doneControlDiv = createDoneControlDiv(index);
    
        allCards.appendChild(controlDiv).appendChild(removeControlDiv)
        controlDiv.append(doneControlDiv)
        
        doneControlDiv.addEventListener("click", () => {
            doneCard(index)
        })
        removeControlDiv.addEventListener("click", () => {
            removeCard(index)
        })
    }
    
    function createControlDiv() {
        const controlDiv = document.createElement("div")
        controlDiv.classList.add("card-control")
        return controlDiv;
    }
    
    function createRemoveControlDiv(index) {
        const removeControlDiv = document.createElement("div")
        removeControlDiv.classList.add(`remove-${index}`)
        removeControlDiv.innerHTML = "-"
        return removeControlDiv
    }
    
    function createDoneControlDiv(index) {
        const doneControlDiv = document.createElement("div")
        doneControlDiv.classList.add(`done-${index}`)
        doneControlDiv.innerHTML = "Feito"
        return doneControlDiv
    }

    function doneCard(index){
        const cardNumber = `.card-task-${index}`

        const card = document.querySelector(cardNumber)

        card.classList.toggle("closed")

        if(card.classList.contains("closed")){
            cardCompleted += 1;
            cardStoraged(index,'closed')
        }else{
            cardCompleted-- ;
            cardStoraged(index)
        }

        cardsFinished(cardCompleted)

    }

    function cardsFinished(number){
        cardsFinishes.innerHTML = number
        
        if(!number)return

        localStorage.setItem("cardsFinished",number)
    }

    function removeCard(index){
        const cardNumber = `.card-task-${index}`
        const card = document.querySelector(cardNumber)

        card.remove()

        if(card.classList.contains('closed')){
            cardCompleted -= 1
            cardsFinished(cardCompleted)
        }
    }

    const removeAll = ()=>{
        const allCards = document.querySelector(".cards-section")

        while(allCards.firstChild){
            allCards.removeChild(allCards.firstChild)
        }
        
        cardId = 1;
        cardCompleted = 0;
        
        localStorage.clear();
        cardsFinished(cardCompleted)
    }
    
    function dateHour(currentHourNow){
        let currentTime = new Date().toLocaleString();
        return currentTime
    }
    
    function saveCard(cardId, titleValue,descriptionValue,currentHourNow,status,btnStatus){

        const card = {
            id:cardId,
            title:titleValue,
            description: descriptionValue,
            time: currentHourNow,
            status:status,
        }

        let cards = JSON.parse(localStorage.getItem('cards')) || []
        cards.push(card)

        localStorage.setItem('cards', JSON.stringify(cards))
    }

    function displaySavedCards() {
        
        cardsFinished(localStorage.getItem('cardsFinished'))

        numeration = localStorage.getItem("cardsFinished")
        cardCompleted = numeration;
        
        let cards = JSON.parse(localStorage.getItem('cards')) || []
        console.log(cards)

        for (let card of cards) {
            const cardBox = document.createElement("div")
            const titleCard = document.createElement("div")
            const descriptionCard = document.createElement("div")
            const timeCard = document.createElement("div")
            
            cardId++
            
            cardBox.classList.add("card-task-" + card.id, card.status)
            
            titleCard.classList.add("title-task")
            titleCard.innerHTML = ` <p>${card.title}</p>`
    
            descriptionCard.classList.add("description")
            descriptionCard.innerHTML = `${card.description}`
    
            timeCard.classList.add("timeNow")
            timeCard.innerHTML = `${card.time}`
    
            cardBox.appendChild(titleCard)
            cardBox.appendChild(descriptionCard)
            cardBox.appendChild(timeCard)
    
            getContent.appendChild(cardBox)

            cardControl(card.id)
        }
    }

    function cardStoraged(id,state){
        const cards =  JSON.parse(localStorage.getItem("cards"))
        const getId = cards.find((obj)=>{
            return obj.id == id
        })

        getId.status = state

        localStorage.setItem("cards", JSON.stringify(cards))
        console.log(localStorage.getItem("cards"))
        
    }


    displaySavedCards()

    removeAllCards.addEventListener("click", removeAll)
    add_Card.addEventListener("click", openCardForm)
    getNewCardBtn.addEventListener("click", createCard)
    backBtn.addEventListener("click", closeCardForm)
})()