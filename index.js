const BASE_URL = "http://localhost:3000/dishes/"

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("Food Smells Good")

    fetchDishes()
})

//get foods and render to the page

function fetchDishes() {
    fetch(BASE_URL)
    .then(resp => resp.json() )
    .then( dishesObject => {renderDishes(dishesObject)})
}

function renderDishes(dishes) {
    dishes.forEach(dish => {displayDish(dish)})
}

function displayDish(dish) {
    let foodCollection = document.getElementById("food-collection")


    let foodDiv = document.createElement('div')
    foodDiv.className = "food-card"

    let h2 = document.createElement('h2')
    h2.innerText = `${dish.name}`

    let image = document.createElement('img')
    image.className = "food-avatar"
    image.src = `${dish.image}`

    let p = document.createElement('p')
    p.innerHTML = `<u>Meal Description</u>: ${dish.description}`

    let h6 = document.createElement('h6')
    h6.innerText = `Key Ingredients: ${dish.main_ingredients}`

    let dltBtn = document.createElement('button')
    dltBtn.className = "delete-button"
    dltBtn.innerText = "Delete"
    dltBtn.dataset.id = dish.id

    dltBtn.addEventListener("click", (e) => {
        fetch(BASE_URL + dltBtn.dataset.id , {
               method: "DELETE"
             })
            .then(resp => resp.json() )
            .then(dltBtn.parentElement.remove()) 
      })

  
       

    foodCollection.append(foodDiv)
    foodDiv.append(h2, image, p, h6, dltBtn)
}


    // let dltDsh = document.querySelector('.delete-button')
    // console.log(dltDsh.dataset.id)

    // fetch(BASE_URL + dltDsh.dataset.id , {
    //     method: "DELETE"
    // })
    // .then(resp => resp.json() )


let newDishForm = document.querySelector('form.menuForm')

newDishForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.dir(e.target)

    let name = e.target[0].value
    let image = e.target[1].value
    let summary = e.target[2].value
    let ingredients = e.target[3].value

    let postRequest = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
         body: JSON.stringify({
             name: name,
             image: image,
             description: summary,
             main_ingredients: ingredients

         })
    }

    fetch(BASE_URL, postRequest)
    .then(resp => resp.json() )
    .then(newDish => { displayDish(newDish) } )

    newDishForm.reset()
})

//Delete Dish



   