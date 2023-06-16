import { getQuestionById, getTestById } from '../api-requests/questions.js'

function getNextChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
}

const id = new URLSearchParams(window.location.search).get('testID');

try {
    const response = await getTestById(id);
    console.log("AAAAA");
    console.log(response);
    createQuestion(0, response.questions);
} catch (error) {
    console.log(error);
}
let right = 0;
let wrong = 0;
async function createQuestion(questionIndex, questionArray) {
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
    try {
        const questionObj = await getQuestionById(questionID);
        console.log(questionObj);
        let img = ``;
        if (questionObj.image_url != null) {
            img = `<img class="question__image" src="${questionObj.image_url}">`;
        }
        questionElement.innerHTML = `
        <h2> Întrebarea #${questionIndex + 1} </h2>
        <div> Întrebări corecte: ${right} </div>
        <div> Întrebări greșite: ${wrong} </div>
        <h1 class="question__title" >${questionObj.question}</h1>
        ${img}
        <form id="form" class="question__form" action="">
        </form>
        <button id="nextButton" class="question__btn"> Submit </button>
        `;
        //TODO daca ramane validat intrebare + punctaj in timp real
        let letter = 'A';
        const buttonElement = document.getElementById("nextButton");
        buttonElement.addEventListener("click", () => {
            if(validateQuestion(questionObj.answers)){
                right++;
            } else{
                wrong++;
            }
            createQuestion(questionIndex + 1, questionArray);
        });

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
    } catch (error) {
        console.log(error);
        return;
    }
}

function validateQuestion(answers) {
    const checkbox = [document.getElementById("qA"),
    document.getElementById("qB"),
    document.getElementById("qC")
    ];
    for (let i = 0; i < 3; i++) {
        console.log(checkbox[i]);
        console.log(answers[i]);
        if (checkbox[i].checked != answers[i].isValid) {
            console.log("PROST");
            return false;
        }
    }
    console.log("BUN");
    return true;
}