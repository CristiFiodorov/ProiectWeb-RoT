function getNextChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
}

const id = new URLSearchParams(window.location.search).get('testID');
const currentTest = tests.find(e => e.testID == id);
const questionArray = currentTest.questions;
console.log(questionArray);

function createQuestion(questionIndex) {
    const questionElement = document.getElementById("question");
    if (questionIndex >= questionArray.length) {
        questionElement.innerHTML = `
        <h1 class="question__title" > Ai terminat testul!</h1>
        <a href="teste.html">
        <button id="nextButton" class="question__btn"> Pagina de teste </button>
        </a>`;
        return;
    }

    console.log(`Intrebarea ${questionIndex}`);
    const questionID = questionArray[questionIndex];
    const questionObj = questions.find(e => e.id == questionID);
    questionElement.innerHTML = `
    <h2> Întrebarea #${questionIndex + 1} </h2>
    <h1 class="question__title" >${questionObj.question}</h1>
    <img class="question__image" src="${questionObj.img}">
    <form id="form" class="question__form" action="">
    </form>
    <button id="nextButton" class="question__btn"> Submit </button>
    `;
    let letter = 'A';

    const buttonElement = document.getElementById("nextButton");

    buttonElement.addEventListener("click", () => createQuestion(questionIndex + 1));

    const formElement = document.getElementById("form");
    questionObj.answers.map(ans => {
        const div = document.createElement("div");
        console.log(letter);
        div.innerHTML = `
            <input type="checkbox" id="q${letter}" name="q${letter}" value="true">
            <label for="q${letter}">${letter}. ${ans.content}</label>
        `;
        formElement.appendChild(div);
        letter = getNextChar(letter);
    });
}

createQuestion(0);