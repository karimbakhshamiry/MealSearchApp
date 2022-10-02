const ingredient = document.querySelector("#ingredient");
const searchBtn = document.querySelector(".search");
const resultDiv = document.querySelector(".recipes");

function searchForRecipes() {
  if (ingredient.value.length > 0) {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient.value}&apiKey=4999d77d3638422984ad323e4348fc68`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const recipeHtml = data.map((element) => {
            const missedIngredientsHtml = element.missedIngredients
              .map((item) => {
                return `<li>${item.original}</li>`;
              })
              .join("");

            const usedIngredientsHtml = element.usedIngredients
              .map((item) => {
                return `<li>${item.original}</li>`;
              })
              .join("");

            const ordersHtml = [
              missedIngredientsHtml,
              usedIngredientsHtml,
            ].join("");
            // console.log(ordersHtml);
            return `
              <div class="recipe">
                <h4 class="food">${element.title}</h4>
                <div class='image_container'>
                  <img
                  src="${element.image}"
                  alt="${element.image} Picture"
                  />
                </div>
                <div class='orders'>
                  <h5>Ingredients</h5>
                  <ul>
                    ${ordersHtml}
                  </ul>
                </div>
              </div>
            `;
          });

          resultDiv.innerHTML = recipeHtml;
        } else {
          resultDiv.innerHTML = "<span class='confused emoji'>🤔</span>";
          const notFoundH1Element = document.createElement("h1");
          notFoundH1Element.className = "not_found";
          notFoundH1Element.textContent = `No Result Found for ${ingredient.value}`;

          resultDiv.append(notFoundH1Element);
        }

        ingredient.value = "";
      });
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchForRecipes();
});

ingredient.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchForRecipes();
  }
});
