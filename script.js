document.addEventListener("DOMContentLoaded", () => {
  const catalogGrid = document.getElementById("catalog-grid");
  const addItemForm = document.getElementById("add-item-form");
  const publishButton = document.getElementById("publish-button");

  const getItems = () => JSON.parse(localStorage.getItem("catalogItems")) || [];
  const setItems = (items) => localStorage.setItem("catalogItems", JSON.stringify(items));

  const renderCatalog = () => {
    catalogGrid.innerHTML = "";
    const items = getItems();

    items.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Fiyat: ${item.price}$</p>
        <button class="delete-button" data-index="${index}">Sil</button>
      `;
      catalogGrid.appendChild(itemDiv);
    });

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        deleteItem(index);
      });
    });
  };

  const addItem = (name, price, image) => {
    const items = getItems();
    items.push({ name, price, image });
    setItems(items);
    renderCatalog();
  };

  const deleteItem = (index) => {
    const items = getItems();
    items.splice(index, 1);
    setItems(items);
    renderCatalog();
  };

  addItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("item-name").value;
    const price = document.getElementById("item-price").value;
    const image = document.getElementById("item-image").value;

    addItem(name, price, image);
    addItemForm.reset();
  });

  publishButton.addEventListener("click", () => {
    const items = getItems();
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ürünler - Minicar Diecast</title>
        <style>
          /* Buraya product.html'in stilleri yerleştirilecek */
          /* Header */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 30px;
            background-color: #ffffff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .logo {
            display: flex;
            align-items: center;
        }
        .logo img {
            height: 130px;
            margin-right: 20px;
        }
        .logo h1 {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333333;
        }
        .nav-links {
            display: flex;
            gap: 20px;
        }
        .nav-links a {
            text-decoration: none;
            color: #555555;
            font-weight: 500;
            font-size: 1rem;
            transition: color 0.3s ease;
        }
        .nav-links a:hover {
            color: #ff7b00;
        }

          ${document.querySelector("style").innerHTML}
        </style>
      </head>
      <body>
    <!-- Header -->
    <header>
        <a href="#" class="logo">
            <img src="logo.png" alt="Minicar Diecast Logo">
            <h1>Minicar Diecast</h1>
        </a>
        <nav>
            <div class="nav-links">
                <a href="index.html">Ana Sayfa</a>

            </div>
        </nav>
    </header>

        <section class="catalog">
          <h2>Ürün Kataloğumuz</h2>
          <div class="catalog-grid">
            ${items
              .map(
                (item) => `
                <div class="item">
                  <img src="${item.image}" alt="${item.name}">
                  <h3>${item.name}</h3>
                  <p>Fiyat: ${item.price}$</p>
                </div>
              `
              )
              .join("")}
          </div>
        </section>
        <footer>
          <p>&copy; 2024 Minicar Diecast - Koleksiyonunuzu genişletin.</p>
        </footer>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "product.html";
    a.click();
  });

  renderCatalog();
});
