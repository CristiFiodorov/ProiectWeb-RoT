function appendAdminCardButtons(cardButtons, currentSign, cardContainer, mainContainer) {
    cardButtons.innerHTML = `
        <a class="big-card__button" id="delete_sign" href="#">Șterge</a>
        <a class="big-card__button" href="sign_categories.html">Indicatoare</a>
        <a class="big-card__button" id="update_sign" href="#">Modifică</a>
    `;

    cardContainer.appendChild(cardButtons);
    mainContainer.appendChild(cardContainer);

    const deleteButton = document.getElementById("delete_sign");
    const updateButton = document.getElementById("update_sign");

    deleteButton.addEventListener('click', () => {
        deleteSign(currentSign._id)
        .then(() => {
            window.location.href = `signs_by_category.html?categoryID=${currentSign.parentId}`;
        })  
        .catch(error => {
            console.error(error);
        });
    });
}
