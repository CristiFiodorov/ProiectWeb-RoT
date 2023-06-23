import { baseURL } from '../api-requests/const.js';
import { getAllTests } from '../api-requests/tests.js';


function createTestCard(testID, userTests) {

  const main = document.getElementById("main");
  const a = document.createElement("a");
  let punctaj = "-";

  const testObj = userTests.find(e => e.testId == testID);
  console.log(testObj);
  if(testObj != undefined){
    punctaj = testObj.score;
  }
  a.href = `intrebare.html?testID=${testID}`;
  a.className = "card__link";
  a.innerHTML = `
    <div class="card card--gradient-orange">
      <img src="../public/images/test.jpg" alt="Test auto" class="card__image" />
      <div class="card__title">
        Test de antrenament ${testID}<br />Punctaj: ${punctaj}/26
      </div>
    </div>
    `;

  main.appendChild(a);
}

try {
  const response = await getAllTests();
  let userTest = [];
  const token = localStorage.getItem('accessToken');
  if (token) {
    const requestTest = await fetch(`${baseURL}/api/v1/user/tests`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  });
    const responseTest = await requestTest.json();
    if(responseTest?.success == true){
      userTest = responseTest?.data;
    }
  }
  console.log(response);
  console.log(userTest);
  response.forEach(e => {
    createTestCard(e.testId, userTest);
  });
} catch (error) {
  console.log(error);
}
