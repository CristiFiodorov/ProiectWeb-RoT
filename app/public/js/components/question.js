import { getQuestionById, getTestById } from '../api-requests/questions.js'
import { baseURL } from '../api-requests/const.js';

function getNextChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
}

const id = new URLSearchParams(window.location.search).get('testID');

let right = 0;
let wrong = 0;
try {
    const response = await getTestById(id);
    console.log("AAAAA");
    console.log(response);
    createQuestion(0, response.questions);
} catch (error) {
    console.log(error);
}
async function createQuestion(questionIndex, questionArray) {
    const questionElement = document.getElementById("question");
    if (questionIndex >= questionArray.length) {
        let mesaj = "Promovat!";
        let punctaj = right;
        if (right < 22) {
            punctaj = -wrong;
            mesaj = "Nepromovat!";
        }
        console.log("UAAAIICAAAA");
        questionElement.innerHTML = `
        <h1 class="question__title" > Ai terminat testul!</h1>
        <h2> ${mesaj} cu ${right} intrebari corecte!</h2>
        <h3 id="info"></h3>
        <a href="teste.html">
        <button id="nextButton" class="question__btn"> Pagina de teste </button>
        </a>`;
        const token = localStorage.getItem('accessToken');
        try {
            // TODO move this in requests
            // TODO make treat existing test
            const response = await fetch(`${baseURL}/api/v1/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({score: punctaj})
            });
            let responseBody = await response.json();
            console.log(responseBody);
            const h3 = document.getElementById("info");
            if(responseBody?.success == true){
                console.log("utilizator logat");
                h3.innerHTML = "Scorul a fost actualizat!";
            }
            else{
                console.log("utilizator nelogat");
                h3.innerHTML = "Loghează-te pentru a-ți putea salva rezultatele și pentru a intra în clasament!";
            }
            console.log(responseBody);
        } catch (error) {
            console.log(error);
        }
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
        <div id="qr"> Întrebări corecte: ${right} </div>
        <div id="qw"> Întrebări greșite: ${wrong} </div>
        <h1 class="question__title" >${questionObj.question}</h1>
        ${img}
        <form id="form" class="question__form" action="">
        </form>
        <button id="nextButton" class="question__btn"> Submit </button>
        `;

        let letter = 'A';
        const buttonElement = document.getElementById("nextButton");
        buttonElement.addEventListener("click", () => {
            console.log("VECHI");
            validateQuestion(questionObj.answers, questionIndex + 1, questionArray);
            // createQuestion(questionIndex + 1, questionArray);
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

function validateQuestion(answers, questionIndex, questionArray) {
    const checkbox = [document.getElementById("qA"),
    document.getElementById("qB"),
    document.getElementById("qC")
    ];
    for (let i = 0; i < 3; i++) {
        let col = "#7ae377";
        if (answers[i].isValid == false) {
            let col = "#e34848";
        }
        checkbox[i].parentElement.style.backgroundColor = col;
    }

    const buttonElement = document.getElementById("nextButton");
    const clonedElement = buttonElement.cloneNode(true);

    buttonElement.parentNode.replaceChild(clonedElement, buttonElement);
    clonedElement.addEventListener("click", () => {
        console.log("NOU");
        createQuestion(questionIndex, questionArray);
    });


    for (let i = 0; i < 3; i++) {
        let col = "#7ae377";
        if (answers[i].isValid == false) {
            col = "#e34848";
        }
        checkbox[i].parentElement.style.backgroundColor = col;
    }
    for (let i = 0; i < 3; i++) {
        console.log(checkbox[i]);
        console.log(answers[i]);
        if (checkbox[i].checked != answers[i].isValid) {
            console.log("PROST");
            wrong++;
            update();
            return false;
        }
    }
    console.log("BUN");
    right++;
    update();
    return true;
}

function update() {
    document.getElementById("qr").innerHTML = `Întrebări corecte: ${right}`;
    document.getElementById("qw").innerHTML = `Întrebări greșite: ${wrong}`;
}