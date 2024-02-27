const api_url = "http://localhost:8000/api/scrape";

const initialSearch = "javascript";
const form = document.querySelector(".search");
const input = document.querySelector(".search input");
const loader = document.querySelector(".loader");
const cardWrapper = document.querySelector(".card-wrapper");
const errorMessage = document.querySelector(".error-message");

const noResultsErrorMessage =
  "Sorry, we couldn't find any products that match your search :(";
const networkErrorMessage =
  "Oops, something went wrong! Please try again in a few moments.";
const noKeywordErrorMessage = "Please provide a keyword for your search.";

// Create the html for each product
function productTemplate(product) {
  return `
    <div class="card">
        <img
        class="card-img"
        alt="${product.title}"
        src="${product.image}"
        />
        <div class="card-container">
        <h2 class="card-title">
            ${product.title}
        </h2>
        <div class="card-rating">
            <img
            class="card-rating-icon"
            src="./assets/images/rating-icon.png"
            alt="rating"
            />
            ${product.rating || "No ratings"}
        </div>
        <div class="card-review">
            <img
            class="card-review-icon"
            src="./assets/images/review-icon.png"
            alt="rating"
            />
            ${product.reviewCount || "No reviews"}
        </div>
        </div>
    </div>
  `;
}

function displayErrorMessage(message) {
  errorMessage.classList.remove("hidden");
  errorMessage.textContent = message;
}

async function fetchData(keyword) {
  try {
    errorMessage.classList.add("hidden");
    cardWrapper.innerHTML = "";
    if (!keyword) {
      return displayErrorMessage(noKeywordErrorMessage);
    }
    loader.classList.remove("hidden");
    const result = await fetch(
      api_url +
        "?" +
        new URLSearchParams({
          keyword,
        })
    );
    if (result.status === 400) {
      return displayErrorMessage(noKeywordErrorMessage);
    }
    if (result.status !== 200) {
      return displayErrorMessage(networkErrorMessage);
    }

    const products = await result.json();

    if (products.length === 0) {
      return displayErrorMessage(noResultsErrorMessage);
    }
    let html = "";

    products.forEach((product) => {
      html += productTemplate(product);
    });

    cardWrapper.innerHTML = html;
  } catch (err) {
    return displayErrorMessage(networkErrorMessage);
  } finally {
    loader.classList.add("hidden");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetchData(input.value.trim());
});

window.addEventListener("load", () => {
  input.value = initialSearch;
  fetchData(initialSearch);
});
