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

        const card = {
            id:cardId,
            title:titleValue,
            description: descriptionValue,
            time: currentHourNow,
        }

        let cards = JSON.parse(localStorage.getItem('cards')) || []

        cards.push(card)

        localStorage.setItem('cards', JSON.stringify(cards))

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
        const doneBtnNumber = `.done-${index}`

        const doneBtn = document.querySelector(doneBtnNumber)
        const card = document.querySelector(cardNumber)

        card.classList.add("closed")
        doneBtn.classList.toggle("selected")

        if(doneBtn.classList.contains("selected")){
            cardCompleted += 1;
        }else{
            card.classList.remove("closed")
            cardCompleted -= 1;
        }

        cardsFinished(cardCompleted)

    }

    function cardsFinished(number){
        cardsFinishes.innerHTML = number
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

        localStorage.removeItem("cards")
        cardsFinished(cardCompleted)
    }

    function dateHour(currentHourNow){
        let currentTime = new Date();
        let currentHour = currentTime.getHours();
        let currentMinutes = currentTime.getMinutes().toString().padStart(2, "0");
        let ampm = currentHour < 12 ? "AM" : "PM";
        currentHour = currentHour % 12 || 12;
        return currentHour + ":" + currentMinutes + " " + ampm
    }

    function displayCards() {
        let cards = JSON.parse(localStorage.getItem('cards')) || []
    
        for (let card of cards) {
            const cardBox = document.createElement("div")
            const titleCard = document.createElement("div")
            const descriptionCard = document.createElement("div")
            const timeCard = document.createElement("div")
            cardId++

            cardBox.classList.add("card-task-" + card.id)
    
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

    displayCards()

    removeAllCards.addEventListener("click", removeAll)
    add_Card.addEventListener("click", openCardForm)
    getNewCardBtn.addEventListener("click", createCard)
    backBtn.addEventListener("click", closeCardForm)
})()