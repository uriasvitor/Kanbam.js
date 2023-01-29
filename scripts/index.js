
(function(){
    const today = document.querySelector('.container').classList[1]
 
    const getContent = document.querySelector(`.cards-section-${today}`)
    const add_Card =  document.querySelector(`.open-form-${today}`)
    const cardForm = document.querySelector(`.add-new-card-${today}`)
    const getNewCardBtn = document.querySelector(`.add-card-${today}`)
    const backBtn = document.querySelector(`.back-${today}`)
    const removeAllCards = document.querySelector(`.remove-all-${today}`)
    const cardsFinishes = document.querySelector(`.card-finish-${today}`)
    let cardId = 1;
    let cardCompleted = 0;


    toggleCardForm = ()=>{
        cardForm.classList.toggle("active")
        add_Card.classList.toggle("disabled")
        backBtn.classList.toggle("disabled")
    }

    createCard = ()=>{
        const titleValue = document.querySelector(`#title-${today}`).value
        const descriptionValue = document.querySelector(`#description-${today}`).value
        const cardBox = document.createElement("div")
        const titleCard = document.createElement("div")
        const descriptionCard = document.createElement("div")
        const timeCard = document.createElement("div")
        let currentHourNow = dateHour();

        cardId++
        
        cardBox.classList.add("card-task-" + cardId + '-' + today)

        titleCard.classList.add("title-task-" + today)
        titleCard.innerHTML = ` <p>${titleValue}</p>`

        descriptionCard.classList.add("description-" + today)
        descriptionCard.innerHTML = `${descriptionValue}`

        timeCard.classList.add("timeNow-" + today)
        timeCard.innerHTML = `${currentHourNow}`
        getContent.appendChild(cardBox, cardId).appendChild(titleCard)
        cardBox.appendChild(descriptionCard)
        cardBox.appendChild(timeCard)
        
        cardControl(cardId)
        toggleCardForm()
        
        saveCard(cardId,titleValue,descriptionValue,currentHourNow,0)

    }

    function cardControl(index) {
        cardNumber = `.card-task-${index}-${today}`
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
        controlDiv.classList.add("card-control-" + today)
        return controlDiv;
    }
    
    function createRemoveControlDiv(index) {
        const removeControlDiv = document.createElement("div")
        removeControlDiv.classList.add(`remove-${index}-${today}`)
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
        const cardNumber = `.card-task-${index}-${today}`

        const card = document.querySelector(cardNumber)

        card.classList.toggle("closed")

        if(card.classList.contains("closed")){
            cardCompleted++;
            cardStoraged(index,'closed')
        }else{
            cardCompleted-- ;
            cardStoraged(index)
        }
        console.log(cardCompleted)
        cardsFinished(cardCompleted)

    }

    function cardsFinished(number){
        console.log(number)
        cardsFinishes.innerHTML = number
        
        if(number == null || undefined)return

        localStorage.setItem("cardsFinished",number)
    }

    function removeCard(index){
        const cardNumber = `.card-task-${index}-${today}`
        const card = document.querySelector(cardNumber)

        card.remove()

        if(card.classList.contains('closed')){
            cardCompleted -= 1
            cardsFinished(cardCompleted)
        }

        deleteCard(index)
    }

    const removeAll = ()=>{
        const allCards = document.querySelector(".cards-section-" + today)

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
    
    function saveCard(cardId, titleValue,descriptionValue,currentHourNow,status){

        const card = {
            id:cardId,
            title:titleValue,
            description: descriptionValue,
            time: currentHourNow,
            status:status,
        }

        let cards = JSON.parse(localStorage.getItem('cards-'+ today)) || []
        cards.push(card)

        localStorage.setItem('cards-'+ today, JSON.stringify(cards))
    }

    function displaySavedCards() {
        
        cardsFinished(localStorage.getItem('cardsFinished'))

        numeration = localStorage.getItem("cardsFinished")
        cardCompleted = numeration;
        
        let cards = JSON.parse(localStorage.getItem('cards-' + today)) || []

        for (let card of cards) {
            const cardBox = document.createElement("div")
            const titleCard = document.createElement("div")
            const descriptionCard = document.createElement("div")
            const timeCard = document.createElement("div")
            
            cardId++
            
            cardBox.classList.add("card-task-" + card.id + '-' + today, card.status)
            
            titleCard.classList.add("title-task-" + today)
            titleCard.innerHTML = ` <p>${card.title}</p>`
    
            descriptionCard.classList.add("description-" + today)
            descriptionCard.innerHTML = `${card.description}`
    
            timeCard.classList.add("timeNow-" + today)
            timeCard.innerHTML = `${card.time}`
    
            cardBox.appendChild(titleCard)
            cardBox.appendChild(descriptionCard)
            cardBox.appendChild(timeCard)
    
            getContent.appendChild(cardBox)

            cardControl(card.id)
        }
    }

    function cardStoraged(id,state){
        const cards =  JSON.parse(localStorage.getItem("cards-" + today))
        const getId = cards.find((obj)=>{
            return obj.id == id
        })

        getId.status = state

        localStorage.setItem("cards-" + today, JSON.stringify(cards))
        
    }

    function deleteCard(id) {
        const cards = JSON.parse(localStorage.getItem("cards-" + today))
        const updatedCards = cards.filter((obj) => {
            return obj.id != id
        })
        
        localStorage.setItem("cards-" + today, JSON.stringify(updatedCards))

    }


    displaySavedCards()

    removeAllCards.addEventListener("click", removeAll)
    add_Card.addEventListener("click", toggleCardForm)
    getNewCardBtn.addEventListener("click", createCard)
    backBtn.addEventListener("click", toggleCardForm)
})()