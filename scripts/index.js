(function(){
    const getContent = document.querySelector(".content")
    const add_Card =  document.querySelector(".add")
    const cardForm = document.querySelector(".add-new-card")
    const getNewCardBtn = document.querySelector(".add-card")
    const backBtn = document.querySelector(".back")
    const removeAllCards = document.querySelector(".remove-all")
    const finishCard = document.querySelectorAll(".done")
    const cardsFinished = []

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
        
        cardBox.classList.add("card-task")

        titleCard.classList.add("title-task")
        titleCard.innerHTML = ` <p>${titleValue}</p>`

        descriptionCard.classList.add("description")
        descriptionCard.innerHTML = `${descriptionValue}`

        console.log(titleCard)
        getContent.appendChild(cardBox).appendChild(titleCard)
        cardBox.appendChild(descriptionCard)
        
        cardControl()
        closeCardForm()
    }

    function cardControl(){
        const allCards = document.querySelectorAll(".card-task")
        const controlDiv = document.createElement("div")
        const removeControlDiv = document.createElement("div")
        const doneControlDiv = document.createElement("div")
        controlDiv.classList.add("card-control")

        removeControlDiv.classList.add("remove")
        removeControlDiv.innerHTML = "-"

        doneControlDiv.classList.add("done")
        doneControlDiv.innerHTML = "done"

        for(let i = 0; max = allCards.length, i < max; i+= 1){
            allCards[i]
                .appendChild(controlDiv)
                .appendChild(removeControlDiv)

            controlDiv.append(doneControlDiv)

        }
    }

    const doneCard = ()=>{
        for(let i = 0; max = finishCard.length, i < max; i+= 1){
            console.log(finishCard[i])
        }
    }

    const removeAll = ()=>{
        const allCards = document.querySelectorAll(".card-task")

        for(let i = 0; max = allCards.length, i < max; i+= 1){
            allCards[i].remove()
        }
    }

    // finishCard.addEventListener("click", doneCard)
    removeAllCards.addEventListener("click", removeAll)
    add_Card.addEventListener("click", openCardForm)
    getNewCardBtn.addEventListener("click", createCard)
    backBtn.addEventListener("click", closeCardForm)
})()