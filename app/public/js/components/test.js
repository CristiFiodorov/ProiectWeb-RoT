import { getAllTests } from '../api-requests/tests.js';

function createTestCard(testID)
{
    const main = document.getElementById("main");
    const a = document.createElement("a");
    a.href = `intrebare.html?testID=${testID}`;
    a.className = "card__link";
    a.innerHTML = `
    <div class="card card--gradient-orange">
      <img src="../public/images/test.jpg" alt="Test auto" class="card__image" />
      <div class="card__title">
        Test de antrenament ${testID}<br />Punctaj: -/26
      </div>
    </div>
    `;

    main.appendChild(a);
}

try{
  const response = await getAllTests();
  console.log(response);
  response.forEach(e => {
    createTestCard(e.testId);
  });
} catch(error){
  console.log(error);
}
// tests.map(e => createTestCard(e.testID));
