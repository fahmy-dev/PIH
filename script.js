document.addEventListener("DOMContentLoaded", function() {
    function renderPhotos(container, photo){
        const photoCard = document.createElement("div");
        photoCard.classList.add("photo-card");
        photoCard.innerHTML = `
            <img src="${photo.urls.regular}" alt="${photo.alt_description}"">
            <p> ${photo.alt_description}</p>
            <a href="${photo.user.links.html}" target="_blank">${photo.user.name}</a>
            <input type="text" class="leave-comment" placeholder="Comment">
            <ul class="comments-list"></ul>
            `
        likeButton(photoCard);
        container.appendChild(photoCard);
    };
    
    function renderPage() {
        const photoContainer = document.querySelector("#photos")

            return fetch('https://api.unsplash.com/photos?per_page=30', {
                method: "GET",
                headers: {
                    "Authorization": "Client-ID 2FK1yjWeVA6PX0YpAMH1LZh9823-4VOKbDMS67_-aEQ",
                    "Accept-Version": "v1"
                },
            })
            .then(response => response.json())
            .then(data => {
                data.forEach(photo => {
                    renderPhotos(photoContainer, photo);
                })   
            })   
            .catch(error => {
                console.error("Error loading photo:", error);
            })
        };
    renderPage();

    function likeButton(container) {
        const heart = document.createElement("div")
        heart.id = "heart"
        heart.classList.add = "button"
        container.appendChild(heart);
        heart.addEventListener("click", function() {
            heart.classList.toggle("active");
        });

    };

    function submitSearch() {
        const submit = document.querySelector(".search-button")
        
        const photoContainer = document.querySelector("#photos")
        submit.addEventListener("click", function() {
            const search = document.querySelector(".search-input").value;
            photoContainer.innerHTML = "";
            fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${search}`, {
                method: "GET",
                headers: {
                    "Authorization": "Client-ID 2FK1yjWeVA6PX0YpAMH1LZh9823-4VOKbDMS67_-aEQ",
                    "Accept-Version": "v1"
                },
            })
            .then(response => response.json())
            .then(data => {
                data.results.forEach(result => {
                    renderPhotos(photoContainer, result);
                })
            })
            .catch(error => {
                console.error("Error fetching searched photos:", error);
            })
        })
        
    };

    submitSearch();

    function leaveComment() {
        const photoContainer = document.querySelector("#photos")

        photoContainer.addEventListener("keydown", function(event) {
            if (event.key === 'Enter') {
                const commentList = event.target.closest(".photo-card").querySelector(".comments-list");
                const li = document.createElement("li")
                const addedComment = event.target.value;
                li.textContent = addedComment;
                commentList.appendChild(li);

                event.target.value = "";
            }
        });
    };
    leaveComment();

});