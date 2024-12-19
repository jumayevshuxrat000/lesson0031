const wrapperEl = document.querySelector(".wrapper")
const loadingEl = document.querySelector(".loading")
const btnSeemore = document.querySelector(".btn__seemore")
const collectionEl = document.querySelector(".collection")
const categoryLoadingEl = document.querySelector(".category__loading")
const searchInputEl = document.querySelector(".search input")
const searchDropEl = document.querySelector(".search__drop")

const BASE_URL = "https://dummyjson.com"

const perPageCount = 10
let offset = 0
let productEndpoint = "/products"

// PRODUCT FETCH
async function fetchData(endpoint){
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
        .json()
        .then((res)=> {
            createCard(res)
            if(res.total <= perPageCount + (offset * perPageCount)){
                btnSeemore.style.display = "none"
            }else{
                btnSeemore.style.display = "block"
            }
        })
        .catch((err) => console.log(err))
        .finally(()=> {
            loadingEl.style.display = "none"
        })
}

// SAYT YUKLANGANDA ISHLAYDI
window.addEventListener("load", ()=>{
    collectionEl.style.display = "none"
    createLoading(perPageCount)
    fetchData(`${productEndpoint}?limit=${perPageCount}`)
    fetchCategory("/products/category-list")
})

// LOADING CREATOR
function createLoading(n){
    loadingEl.style.display = "grid"
    loadingEl.innerHTML = null
    Array(n).fill().forEach(()=>{
        const div = document.createElement("div")
        div.className = "loading__item"
        div.innerHTML = `
            <div class="loading__image to-left"></div>
            <div class="loading__title to-left"></div>
            <div class="loading__title to-left"></div>
        `
        loadingEl.appendChild(div)
    })
}

// CARD CREATOR
function createCard(data){
    // while(wrapperEl.firstChild){
    //     wrapperEl.firstChild.remove()
    // }
    data.products.forEach(product=> {
        const divEl = document.createElement("div")
        divEl.className = "card"
        divEl.innerHTML = `
            <img data-id=${product.id} src=${product.thumbnail} alt="rasm">
            <h3>${product.title}</h3>
            <p>${product.price} USD</p>
        `
        wrapperEl.appendChild(divEl)    
    })
}


// CATEGORY FETCH
async function fetchCategory(endpoint){
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
        .json()
        .then(res => {
            createCategory(res);
        })
        .catch()
        .finally(()=>{
            categoryLoadingEl.style.display = "none"
            collectionEl.style.display = "flex"
        })
}




// DETAIL PAGE
wrapperEl.addEventListener("click", e => {
    if(e.target.tagName === "IMG"){
        // BOM
        open(`/pages/product.html?id=${e.target.dataset.id}`, "_self")
    }
    
})



// searchInputEl.addEventListener("focus", ()=>{
//     searchDropEl.style.display = "block"
// })

// searchInputEl.addEventListener("blur", ()=>{
//     searchDropEl.style.display = "none"
// })


// SEARCH
searchInputEl.addEventListener("keyup", async (e)=>{
    const value = e.target.value.trim()
    if(value){
        searchDropEl.style.display = "block"
        const response = await fetch(`${BASE_URL}/products/search?q=${value}&limit=5`)
        response
            .json()
            .then(res => {
                searchDropEl.innerHTML = null
                res.products.forEach((item)=>{
                    const divEl = document.createElement("div")
                    divEl.className = "search__item"
                    divEl.dataset.id = item.id
                    divEl.innerHTML = `
                    <img src=${item.thumbnail} alt="">
                    <div>
                         <p>${item.title}</p>
                    </div>
                    `
                    searchDropEl.appendChild(divEl)
                })
            })
            .catch(err => console.log(err))
    }else{
        searchDropEl.style.display = "none"
    }
})

// DETAIL PAGE BY SEARCH
searchDropEl.addEventListener("click", e => {
    if(e.target.closest(".search__item")?.className === "search__item"){
        const id = e.target.closest(".search__item").dataset.id
        open(`/pages/product.html?id=${id}`, "_self")
        searchInputEl.value = ""
    }
})

console.log(document.querySelector(".search input"));
