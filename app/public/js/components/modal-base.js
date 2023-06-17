function addModalBundles() {
    const openModalButtons = document.querySelectorAll(".modal-open");
    const modalWindowOverlay = document.getElementById("modal-overlay")

    const createModalWindow = () => {
        modalWindowOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    openModalButtons.forEach(button => {
        button.addEventListener("click", createModalWindow);
    });

    const closeModalWindow = () => {
        modalWindowOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    const modalCloseButton = document.getElementById("close-modal");
    modalCloseButton.addEventListener("click", closeModalWindow);
}