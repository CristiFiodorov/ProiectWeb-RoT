/**
 * Given a container, the title of the card, the image source of the card,
 * a flag that indicates whether clicking the card pops up a modal or not,
 * and a 'click' event handler for the card, it will create a special admin card 
 */
function addAdminSpecificButton(mainContainer, title, imgSrc, modalType, clickHandler) {
    const specificButton = document.createElement("a");
    specificButton.className = "card__link " + modalType;
    specificButton.href = '#';
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "card card--gradient-orange";

    const cardTitle = document.createElement("h3");
    cardTitle.className = "card__title";
    cardTitle.innerHTML = title;
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = title;
    img.className = "card__image";

    buttonWrapper.appendChild(img);
    buttonWrapper.appendChild(cardTitle);

    specificButton.appendChild(buttonWrapper);
    specificButton.addEventListener("click", clickHandler);
    mainContainer.appendChild(specificButton);
}


function extractPayloadFromJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function userIsAdmin() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return false;
    }
    const payload = extractPayloadFromJwt(token);
    return payload.isAdmin;
}