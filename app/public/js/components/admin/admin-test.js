import { submitAddQuestion } from "../../api-requests/admin/admin-question.js";

function addSingleAdvicePopUpHandler() {
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Adaugă Întrebare";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_question" name="form_question" placeholder="Întrebare"/>
        <input type="file" id="form_img" name="form_img" title = "Incărcați poza sfatului" accept="image/*"/>
        
        <div style="flex-direction: row;">
        <input type="text" id="form_answer_1" name="form_answer_1" placeholder="Answer1"></input>
        <input type="checkbox" id="answer1" name="answer1" value="1">
        </div>
        
        <div style="flex-direction: row;">
        <input type="text" id="form_answer_2" name="form_answer_2" placeholder="Answer2"></input>
        <input type="checkbox" id="answer2" name="answer2" value="2">
        </div>
        
        <div style="flex-direction: row;">
            <input type="text" id="form_answer_3" name="form_answer_3" placeholder="Answer3"></input>
            <input type="checkbox" id="answer3" name="answer3" value="3">
        </div>
    `;
    

    document.getElementById("save-modal").addEventListener("click", submitAddQuestion);
    form.addEventListener("submit", submitAddQuestion);
    document.getElementById("modal-content").appendChild(form);
};

function addAdminButton() {
    const main = document.getElementById("main");

    // Adding add button for admin
    addAdminSpecificButton(main, "Adaugă Întrebare", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_add_img.png", "modal-open", addSingleAdvicePopUpHandler);

    // Asociate modal event handlers for each button that will pop up a modal window
    addModalBundles();
}


if(userIsAdmin()) {
    addAdminButton();
}