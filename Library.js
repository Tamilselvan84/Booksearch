let search = document.getElementById("searchInput")

let result = document.getElementById("searchResults")

let loading = document.getElementById("spinner")

search.addEventListener("keydown", function(event) {
    result.textContent = ""

    let title = document.createElement("h1")
    title.textContent = "Popular Books"
    title.classList.add("d-none", "text-center")

    let Noresult = document.createElement("h1")
    Noresult.textContent = "No Results Found"
    Noresult.classList.add("d-none", "text-center")

    result.appendChild(title)
    result.appendChild(Noresult)

    if (event.target.value !== "" && event.key === "Enter") {
        let url = "https://apis.ccbp.in/book-store?title=" + event.target.value
        loading.classList.remove("d-none")
        fetch(url)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsondata) {
                loading.classList.add("d-none")
                console.log(jsondata)
                let container = document.createElement("div")
                container.classList.add("text-center")
                for (let item of jsondata["search_results"]) {
                    if (item.title.toLowerCase().includes(event.target.value.toLowerCase())) {
                        let cards = document.createElement("div")
                        cards.classList.add("d-flex", "flex-row", "justify-content-center", "p-4")

                        let bookTitle = document.createElement("h1")
                        bookTitle.textContent = "TITLE: " + item.title
                        bookTitle.classList.add("titles", "p-4")

                        let image = document.createElement("img")
                        image.src = item.imageLink
                        image.classList.add("w-30")

                        let author = document.createElement("p")
                        author.textContent = "AUTHOR: " + item.author
                        author.classList.add("titles", "p-4")

                        cards.appendChild(bookTitle)
                        cards.appendChild(image)
                        cards.appendChild(author)

                        container.appendChild(cards)


                    }
                }
                result.appendChild(container)
                if (container.innerHTML === "") {
                    Noresult.classList.remove("d-none")
                    title.classList.add("d-none")
                } else {
                    Noresult.classList.add("d-none")
                    title.classList.remove("d-none")
                }

            })
    }
})