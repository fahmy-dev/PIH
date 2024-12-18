document.addEventListener("DOMContentLoaded", function() {
    function renderPhoto() {
        const photoContainer = document.querySelector("#photos")
        return fetch('https://api.unsplash.com/photos/', {
            method: "GET",
            headers: {
                "Authorization": "Client-ID 2FK1yjWeVA6PX0YpAMH1LZh9823-4VOKbDMS67_-aEQ",
                "Accept-Version": "v1"
            },
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const div = document.createElement("div");
                div.innerHTML = `
                <img src="${photo.urls.regular} alt="${photo.alt_description}"">
                <p> ${photo.alt_description},<br> ${photo.user.name}</p>
                `
                likeButton(photoContainer);
                photoContainer.appendChild(div);               
            });    
            
        })
        .catch(error => {
            console.error("Error loading photo:", error);
        })
    };
    renderPhoto();

    function likeButton(container) {
        const photosContainer = document.querySelector("#photos")
        const heart = document.createElement("div")
        heart.id = "heart"
        heart.classList.add = "button"
        container.appendChild(heart);
        heart.addEventListener("click", function() {

        });

    }







});