function addModalBundles() {
    const openModalButtons = document.querySelectorAll(".modal-open");
    const modalWindowOverlay = document.getElementById("modal-overlay")

    const openDeleteModalButtons = document.querySelectorAll(".delete-modal-open");
    const deleteModalWindowOverlay = document.getElementById("delete-modal-overlay");
    
    // Create normal modal windows (usually with forms as content)
    const createModalWindow = () => {
        modalWindowOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    // Create delete modal windows (usually with a simple message as content)
    const createDeleteModalWindow = () => {
        deleteModalWindowOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    openModalButtons.forEach(button => {
        button.addEventListener("click", createModalWindow);
    });

    openDeleteModalButtons.forEach(button => {
        button.addEventListener("click", createDeleteModalWindow);
    });

    const closeModalWindow = () => {
        modalWindowOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    const closeDeleteModalWindow = () => {
        deleteModalWindowOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    const modalCloseButton = document.getElementById("close-modal");
    modalCloseButton.addEventListener("click", closeModalWindow);

    const deleteModalCloseButton = document.getElementById("close-delete-modal");
    deleteModalCloseButton.addEventListener("click", closeDeleteModalWindow);
}