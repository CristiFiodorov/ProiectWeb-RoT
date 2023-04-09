import json from './mock_jsons/questions.json' assert { type : 'json'};

function createQuestion(questionID){
    const questionElement = document.getElementById("question");
    const questionObj = json.find(e => e.id == questionID);
    questionElement.innerHTML = `
    <h1 class="question__title" >${questionObj.question}</h1>
            <img class="question__image" src="${questionObj.img}">
        
            <form id="form" class="question__form" action="">
                <div>
                    <input type="checkbox" id="qA" name="qA" value="true">
                    <label for="qA"> circulația se desfășoară pe ambele benzi</label>
                </div>
                <div>
                    <input type="checkbox" id="qB" name="qB" value="true">
                    <label for="qB"> circulația se desfășoară pe ambele benzi</label>
                </div>
                <div>
                    <input type="checkbox" id="qC" name="qC" value="true">
                    <label for="qC"> selectarea circulaţiei pe direcţii de mers în apropierea unei intersecţii.</label>
                </div>
            </form>
            <button class="question__btn"> Submit </button>
    `;
}

createQuestion(1);