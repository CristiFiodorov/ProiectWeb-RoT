/** 
 * Used for modals that have a form as modal-content. It will create an error message that will be displayed exactly before the form. 
 **/
function addErrorMessageElement(errorMessage) {
    document.querySelector('.error-message')?.remove();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    form.insertBefore(errorContainer, form.firstChild);
}

function addModalBundles() {
    const openModalButtons = document.querySelectorAll(".modal-open");
    const modalWindowOverlay = document.getElementById("modal-overlay")

    const openDeleteModalButtons = document.querySelectorAll(".delete-modal-open");
    const deleteModalWindowOverlay = document.getElementById("delete-modal-overlay");

    console.log(openDeleteModalButtons);
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

    if (openModalButtons) {
        openModalButtons.forEach(button => {
            button.addEventListener("click", createModalWindow);
        });
    }

    if (openDeleteModalButtons) {
        openDeleteModalButtons.forEach(button => {
            button.addEventListener("click", createDeleteModalWindow);
        });
    }

    const closeModalWindow = () => {
        modalWindowOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    const closeDeleteModalWindow = () => {
        deleteModalWindowOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    const modalCloseButton = document.getElementById("close-modal");
    if (modalCloseButton) {
        modalCloseButton.addEventListener("click", closeModalWindow);
    }

    const deleteModalCloseButton = document.getElementById("close-delete-modal");
    if (deleteModalCloseButton) {
        deleteModalCloseButton.addEventListener("click", closeDeleteModalWindow);
    }
}