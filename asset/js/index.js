const ingredient = document.querySelector("#ingredient");
const searchBtn = document.querySelector(".search");
const resultDiv = document.querySelector(".recipes");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (ingredient.value.length > 0) {
    fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?i=${ingredient.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.meals !== null) {
          const recipeHtml = data.meals.map((element) => {
            return `
              <div class="recipe">
                <h3 class="food">${element.strMeal}</h3>
                <img
                  src="${element.strMealThumb}"
                  alt="${element.strMeal} Picture"
                />
              </div>
            `;
          });

          resultDiv.innerHTML = recipeHtml;
        } else {
          resultDiv.innerHTML = `<h1 class='not_found'><span class='confused emoji'>🤔</span> No Result Found for ${ingredient.value}</h1>`;
        }

        ingredient.value = "";
      });
  }
});
