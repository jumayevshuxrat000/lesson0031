const titleEl = document.querySelector(".title")
const items = document.querySelectorAll(".item")
const collectionEl = document.querySelector(".collection")


// items.forEach(li => {
//     li.addEventListener("click", e => {
//         titleEl.textContent = e.target.textContent
//     })
// })

collectionEl.addEventListener("click", e=> {
    if(e.target.tagName === "LI" && e.target.className === "item"){
        titleEl.textContent = e.target.textContent
    }
})

