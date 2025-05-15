// parâmetros utilizados nas listas
const data = []
let perPage = 5

//Preenchendo o data
for(let i=0; i<100; i++){
    data.push(`Item${(i+1)}`)
}

const state = {
    page:1,
    perPage,
    totalPages: Math.ceil(data.length / perPage),
    maxVisibleButtons: 3
}


//-------------------FUNÇÕES AUXILIARES-----------------------
const html = {
    get(element){
        return document.querySelector(element)
    }
}
function update(){
    buttons.update()
    list.update()
}

//---------------CRIAÇÃO DOS CAMPOS DE LISTA-------------------
const controls = {
    next(){
        state.page++
        const lastPage = state.page > state.totalPages
        if(lastPage){
            state.page--
        }
    },
    
    prev(){
        state.page--
        if(state.page < 1){
            state.page++
        }
    },
    goTo(page){
        state.page = +page
        if(page>state.totalPages){
            state.page = state.totalPages
        }
        else if(page < 1){
            page = 1
        }
    },

    createListeners(){
        html.get('#paginate .first').addEventListener("click", ()=>{
            controls.goTo(1)
            update()
        })
        html.get('#paginate .last').addEventListener("click", ()=>{
            controls.goTo(state.totalPages)
            update()
        })
        html.get('#paginate .next').addEventListener("click", ()=>{
            controls.next()
            update()
        })
        html.get('#paginate .prev').addEventListener("click", ()=>{
            controls.prev()
            update()
        })
    }
}
const list={
    create(item){
        const div = document.createElement("div")
        div.classList.add("item")
        div.innerHTML = item
        html.get(".list").appendChild(div)
        
    },
    update(){
        html.get(".list").innerHTML = ''
        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage
        const paginatedItems = data.slice(start, end)
        paginatedItems.forEach(list.create)
    }
}
const buttons={
    elements: html.get(".controls .numbers"),
    create(number){
        const button = document.createElement("div")
        button.innerHTML = number

        if(state.page == number){
            button.classList.add("active")
        }

        button.addEventListener("click", (event)=>{
            const page = event.target.innerText
            controls.goTo(page)
            update()
        })
        buttons.elements.appendChild(button)
    },
    update(){
        buttons.elements.innerHTML = ''
        const {maxLeft, maxRight} = buttons.calculateMaxVisible()
        
        for(let page = maxLeft; page <= maxRight; page++){
            buttons.create(page)
        }

    },
    calculateMaxVisible(){
        const {maxVisibleButtons} = state
        let maxLeft = (state.page - Math.floor(maxVisibleButtons/2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons/2))
        
        if(maxLeft < 1){
            maxLeft = 1
            maxRight = maxVisibleButtons
        }
        if(maxRight > state.totalPages){
            maxLeft = state.totalPages - (maxVisibleButtons - 1)
            maxRight = state.totalPages
            if(maxLeft < 1){
                maxLeft = 1
            }
        }
        return {maxLeft, maxRight}
    }
}

//-------------------------------------------------------------
function init(){
    update()
    controls.createListeners()
}
init()