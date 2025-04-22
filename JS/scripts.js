const searchInput = document.getElementById("search-input")

const recipes = [
    {
        recipeName: "Strogonoff",
        image: "../images/strogonoff.webp",
        link: "https://www.instagram.com/p/DIuO5JGJ8ZX/?img_index=1",
        ingredients: ["peito de frango", "cebola", "alho", "manteiga", "ketchup", "mostarda", "creme de leite", "sal", "pimenta do reino", "batata palha"]
    },
    {
        recipeName: "Risoto de Camarão",
        image: "../images/risoto de camarao.webp",
        link: "https://www.instagram.com/p/DIxItq3pN0D/?img_index=1",
        ingredients: ["camarão", "arroz para risoto", "alho poró", "cebola", "vinho branco", "caldo de camarão", "azeite", "óleo", "sal", "pimenta do reino"]
    },
    // {
    //     recipeName: "Lasanha de Berinjela",
    //     image: "../images/lasanha de berinjela.webp",
    //     link: "",
    //     ingredients: ["berinjela", "cebola", "alho", "molho de tomate", "azeitona", "mussarela", "presunto", "azeite", "requeijão", "sal", "pimenta do reino"]
    // },
    // {
    //     recipeName: "Macarrao com Espinafre",
    //     image: "../images/macarrao com molho de espinafre.webp",
    //     link: "",
    //     ingredients: ["macarrão", "alho", "espinafre", "creme de leite", "parmesão", "caldo de legumes", "sal", "pimenta calabresa"]
    // }
];

function createRecipe(list) {
    const container = document.querySelector("#recipe-container");
    container.innerHTML = "";

    list.forEach(recipe => {
        const card = document.createElement("article");
        card.classList.add("recipe-card");

        card.innerHTML = `
        <a href="${recipe.link}" class="tutorial-video">
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