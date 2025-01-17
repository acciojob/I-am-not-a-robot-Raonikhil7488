//your code here
let selectedImages = [];
let resetButton = document.getElementById("reset");
let verifyButton = document.getElementById("verify");
let para = document.getElementById("para");
let images = document.querySelectorAll("img");

function shuffleImages() {
    let imgArray = Array.from(images);
    let randomImageIndex = Math.floor(Math.random() * imgArray.length);
    
    // Randomly shuffle the images
    imgArray.sort(() => Math.random() - 0.5);

    // Repeat one of the images randomly
    imgArray[randomImageIndex].src = imgArray[randomImageIndex].src; // Random image repeat logic
}

function resetState() {
    selectedImages = [];
    para.textContent = "";
    document.getElementById("h").textContent = "Please click on the identical tiles to verify that you are not a robot.";
    resetButton.style.display = "none";
    verifyButton.style.display = "none";

    images.forEach(img => img.classList.remove("selected"));
}

function handleImageClick(event) {
    let clickedImage = event.target;

    if (!selectedImages.includes(clickedImage)) {
        selectedImages.push(clickedImage);
        clickedImage.classList.add("selected");

        if (selectedImages.length === 1) {
            resetButton.style.display = "inline-block";
        }

        if (selectedImages.length === 2) {
            verifyButton.style.display = "inline-block";
        }
    }

    if (selectedImages.length === 2) {
        verifyButton.addEventListener("click", verifySelection);
    }
}

function verifySelection() {
    let [img1, img2] = selectedImages;

    if (img1.src === img2.src) {
        para.textContent = "You are a human. Congratulations!";
    } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyButton.style.display = "none";
}

images.forEach(img => {
    img.addEventListener("click", handleImageClick);
});

shuffleImages();  // Shuffle images on initial load
