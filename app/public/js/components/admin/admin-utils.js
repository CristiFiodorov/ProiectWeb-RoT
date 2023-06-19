/**
 * Given a container, the title of the card, the image source of the card,
 * a flag that indicates whether clicking the card pops up a modal or not,
 * and a 'click' event handler for the card, it will create a special admin card 
 * Used for sign and advices admin cards, usually when more than one card should pe included in mainContainer
 * 
 *   mainContainer.append(..
 *   <a href="#" class="card__link">
 *       <div class="card card--gradient-orange $modalType">
 *           <img src="$imgSrc" alt="$title" class="card__image">
 *           <h3 class="card__title">$title</h3>
 *       </div>
 *   </a>
 *   ..)
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

/**
 * Given a container, the title of the card, the image source of the card,
 * a flag that indicates whether clicking the card pops up a modal or not,
 * and a 'click' event handler for the card, it will create a special admin card 
 * used for COURSE cards, ONLY when ONE card is included in the mainContainer
 * 
 */
function addAdminCourseSpecificButton(mainContainer, title, description, imgSrc, modalType, clickHandler) {
    mainContainer.innerHTML = `
        <a href="#" class="course-card-link ${modalType}">
            <div class="course-card course-card--gradient-orange">
                <h3 class="course-card__title">${title}</h3>
                <img src="${imgSrc}" alt="${title}" class="course-card__image">
                <h3 class="course-card__description">${description}</h3>
            </div>
    `
    mainContainer.querySelector("a").addEventListener("click", clickHandler);
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