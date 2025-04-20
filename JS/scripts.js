const searchInput = document.getElementById("search-input")

const recipes = [
    {
        recipeName: "teste",
        image: "./images/template.webp",
        ingredients: ["teste", "teste", "teste"]
    }
];

function createRecipe(list) {
    const container = document.querySelector("#recipe-container");
    container.innerHTML = "";

    list.forEach(recipe => {
        const card = document.createElement("article");
        card.classList.add("recipe-card");

        card.innerHTML = `
        <a href="" class="tutorial-video">
          <img src="${recipe.image}" alt="resultado final da receita">
        </a>
        <div class="recipe-container">
          <h2 class="recipe-name">${recipe.recipeName}</h2>
          <ul class="ingredient-list">
            ${recipe.ingredients.map(ing => `<li class="ingredient">${ing}</li>`).join("")}
          </ul>
        </div>
      `;

        container.appendChild(card);
    });
}

function filterRecipes(search) {
    const cards = document.querySelectorAll(".recipe-card");
    const termoNormalizado = removeAccents(search.toLowerCase())
        .split(" ")
        .filter(t => t.length > 0);

    cards.forEach(card => {
        const nome = removeAccents(card.querySelector(".recipe-name").textContent.toLowerCase());
        const ingredientes = Array.from(card.querySelectorAll(".ingredient"))
            .map(el => removeAccents(el.textContent.toLowerCase()))
            .join(" ");

        const textoCompleto = `${nome} ${ingredientes}`;

        const visivel = termoNormalizado.every(termo => textoCompleto.includes(termo));

        card.style.display = visivel ? "grid" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    createRecipe(recipes);
});

searchInput.addEventListener("input", () => {
    filterRecipes(searchInput.value);
});

function removeAccents(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ç/g, "c")
        .replace(/Ç/g, "C");
}