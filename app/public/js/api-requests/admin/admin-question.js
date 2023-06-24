export function submitAddQuestion(event) {
    event.preventDefault();
    const question = document.getElementById("form_question").value;
    let img = document.getElementById("form_img").files[0];
    const answer1 = document.getElementById("form_answer_1").value;
    const isValid1 = document.getElementById("answer1").checked;
    const answer2 = document.getElementById("form_answer_2").value;
    const isValid2 = document.getElementById("answer2").checked;
    const answer3 = document.getElementById("form_answer_3").value;
    const isValid3 = document.getElementById("answer3").checked;

    if (!question) {
        addErrorMessageElement("Întrebarea nu trebuie să fie nulă.");
        return;
    }


    if(!answer1 || !answer2 || !answer3) {
        addErrorMessageElement("Toate variantele de răspuns trebuie completate.");
        return;
    }
    console.log(question);
    console.log(answer1);
    console.log(isValid1);
    console.log(answer2);
    console.log(answer3);
    const formData = new FormData();
    console.log(img);
    if(img == undefined){
        img = null;
    }
    formData.append('file', img);
    formData.append('question', question);
    formData.append('answers', JSON.stringify([
        {content: answer1, isValid: isValid1},
        {content: answer2, isValid: isValid2},
        {content: answer3, isValid: isValid3},
    ]));
    console.log(formData);
    fetch(`${config.apiAddress}/api/v1/upload/questions`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            window.location.href = 'teste.html';
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
}