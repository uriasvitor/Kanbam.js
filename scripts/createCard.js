let spel = '';

(function(){
    const getContainer = document.querySelector('.container')

    function createCardDay(){
        getContainer.classList.add(spel)

        createCard = document.createElement("div")
        createCard.classList.add("card-day-" + spel)

        createCardTitle = document.createElement("div")
        createCardTitle.classList.add("title-" + spel)
        createCardTitle.innerHTML = day

        createCardInfo = document.createElement("div")
        createCardInfo.classList.add("card-info-" + spel)
        createCardInfo.innerHTML = `Cards feitos: <p class="card-finish-${spel}"></p>`
        
        createCardContent = document.createElement("div")
        createCardContent.classList.add("content-" + spel)
        createCardContent.innerHTML = `
            <div class="cards-section-${spel}"></div>`

        createCardControls = document.createElement("div")
        createCardControls.classList.add("controls-"+ spel)
        createCardControls.innerHTML = `
            <div class="remove-all-${spel}">Remove All</div>
            <div class="open-form-${spel}"> + </div>
            <div class="back-${spel} disabled "> X </div>
        `

        createCardNewCard = document.createElement("div")
        createCardNewCard.classList.add("add-new-card-" + spel)
        createCardNewCard.innerHTML = `
            <label for="title-${spel}">Titulo</label>
            <input id="title-${spel}" type="text">

            <label for="description-${spel}">Discrição</label>
            <input id="description-${spel}" type="text">

            <div class="add-card-${spel}"> + </div>
        `

        getContainer.appendChild(createCard).appendChild(createCardTitle)

        createCard.append(createCardInfo)
        createCard.append(createCardContent)
        createCard.append(createCardControls)
        createCard.append(createCardNewCard)
         
    }


    function getDayWeek(day){
        let today = new Date().getDay();

            switch (today) {
                case 0:
                    day = "Domingo";
                    spel = "do"
                    break;
                case 1:
                    day = "Segunda-feira";
                    spel = "se"
                    break;
                case 2:
                    day = "Terça-feira";
                    spel = "te"
                    break;
                case 3:
                    day = "Quarta-feira";
                    spel = "qa"
                    break;
                case 4:
                    day = "Quinta-feira";
                    spel = "qu"
                    break;
                case 5:
                    day = "Sexta-feira";
                    spel = "se"
                    break;
                case 6:
                    day = "Sábado";
                    spel = "sa"
                    break;
                default:
                    day = "Dia inválido";
            }
        
        return day
    }

    const day = getDayWeek();

    createCardDay()
    console.log(day)
    console.log(spel)

})()
