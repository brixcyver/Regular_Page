function openModal(image) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = image.src;
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; 
}

const modal = document.getElementById("imageModal");
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal(); 
    }
});
