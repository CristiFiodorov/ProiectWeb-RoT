function createTestCard(testID)
{
    const main = document.getElementById("main");
    const a = document.createElement("a");
    a.href = `intrebare.html?testID=${testID}`;
    a.className = "card__link";
    a.innerHTML = `
    <div class="card card--gradient-orange">
      <img src="images/test.jpg" alt="Test auto" class="card__image" />
      <div class="card__title">
        Test de antrenament ${testID}<br />Punctaj: -/26
      </div>
    </div>
    `;

    main.appendChild(a);
}

tests.map(e => createTestCard(e.testID));
