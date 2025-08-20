// Favorites page renderer
(function() {
  const favoritesContainer = document.getElementById('favoritesList');
  const emptyState = document.getElementById('favoritesEmpty');

  // Reuse the products list from script.js if present; otherwise, define a minimal fallback
  let productsData = window.products || [];
  if (!productsData || productsData.length === 0) {
    try {
      // Optional: attempt to read from localStorage if you chose to store products there
      const stored = localStorage.getItem('allProductsData');
      if (stored) productsData = JSON.parse(stored);
    } catch(e) {}
  }
  // Final fallback: embed the catalog here to keep page functional standalone
  if (!productsData || productsData.length === 0) {
    productsData = [
      { id: 1, title: "Dell G15-5520", category: "Labtop", color: "Black", price: "36870", salePrice: "36270", imageURL: "images/Labtop1.jpg" },
      { id: 2, title: "Lenovo V15", category: "Labtop", color: "gray", price: "13333", salePrice: "13011", imageURL: "images/Labtop2.jpg" },
      { id: 3, title: "HP Victus", category: "Labtop", color: "Black", price: "47699", salePrice: "47438", imageURL: "images/Labtop3.jpg" },
      { id: 4, title: "Dell Vostro", category: "Labtop", color: "Black", price: "29660", salePrice: "29320", imageURL: "images/Labtop4.jpg" },
      { id: 5, title: "R50i", category: "Earbuds", color: "Black", price: "1699", salePrice: "1399", imageURL: "images/Earbuds1.jpg" },
      { id: 6, title: "R100", category: "Earbuds", color: "White", price: "1600", salePrice: "1499", imageURL: "images/Earbuds.jpg" },
      { id: 7, title: "Life P2", category: "Earbuds", color: "Black", price: "2899", salePrice: "2699", imageURL: "images/Earbuds3.jpg" },
      { id: 8, title: "Life Note E", category: "Earbuds", color: "Black", price: "2485", salePrice: "1600", imageURL: "images/Earbuds4.jpg" },
      { id: 8, title: "Generic", category: "Over Ear", color: "Blue", price: "215", salePrice: "185", imageURL: "images/Over Ear1.jpg" },
      { id: 9, title: "Panduo", category: "smart watch", color: "Green", price: "450", salePrice: "375", imageURL: "images/smartwatch1.jpg" },
      { id: 10, title: "Muktrics", category: "smart watch", color: "Black", price: "400", salePrice: "350", imageURL: "images/smartwatch2.jpg" },
      { id: 11, title: "BigPlayer", category: "smart watch", color: "Brown", price: "730", salePrice: "650", imageURL: "images/smartwatch3.jpg" },
      { id: 12, title: "Samsung Galaxy A34", category: "phone", color: "Awesome Silver", price: "11286", salePrice: "10400", imageURL: "images/phone1.jpg" },
      { id: 13, title: "A24", category: "phone", color: "Black", price: "49900", salePrice: "38090", imageURL: "images/phone2.jpg" },
      { id: 14, title: "Oppo Reno 8T", category: "phone", Gold: "gray", price: "12793", salePrice: "12.445", imageURL: "images/phone3.jpg" },
      { id: 15, title: "Galaxy S22", category: "phone", color: "Green", price: "24299", salePrice: "24899", imageURL: "images/phone4.jpg" },
      { id: 16, title: "Galaxy S22 Ultra", category: "phone", color: "Phantom Black", price: "32800", salePrice: "33400", imageURL: "images/phone5.jpg" },
      { id: 17, title: "Galaxy S21", category: "phone", color: "Light Green", price: "21990", salePrice: "19299", imageURL: "images/phone6.jpg" },
      { id: 18, title: "Galaxy Z Fold5", category: "phone", color: "\tLight blue", price: "73930", salePrice: "66000", imageURL: "images/phone7.jpg" }
    ];
  }

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch(e) {
      return [];
    }
  }

  function isUserLoggedIn() {
    return !!localStorage.getItem('currentUser') || !!localStorage.getItem('userName');
  }

  function renderFavorites() {
    const favIds = getFavorites();

    if (!favIds.length) {
      if (emptyState) emptyState.style.display = 'block';
      if (favoritesContainer) favoritesContainer.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const cards = favIds.map((id) => {
      const item = productsData.find(p => p.id === id);
      if (!item) return '';

      let heightImage = '200px';
      if (item.category === 'phone') heightImage = '330px';
      else if (item.category === 'smart watch') heightImage = '240px';
      const color = item.color || item.Gold || 'N/A';

      return `
        <div class="product-item col-12 col-sm-6 col-md-4 mb-4 p-4">
          <div class="card pt-3">
            <img class="product-item-img card-img-top m-auto" src="${item.imageURL}" alt="${item.title}" style="width:80%; height:${heightImage};">
            <div class="product-itm-desc card-body pb-0 pl-4">
              <p class="card-title">Product: ${item.title}.</p>
              <p class="card-text">Category: ${item.category}.</p>
              <p class="color">Color: ${color}.</p>
              <p class="card-price">Price: <span> <del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
            </div>
            <div class="product-item-action d-flex justify-content-between pr-4 pl-4">
              <div class="actions-left">
                <button class="AddToCartBtn btn btn-primary mb-2" data-id="${item.id}">Add</button>
                <button class="RemoveFromCartBtn btn btn-primary mb-2" data-id="${item.id}">Remove</button>
              </div>
              <i class="fas fa-heart" data-fav-id="${item.id}"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (favoritesContainer) favoritesContainer.innerHTML = cards;

    // Wire up events
    wireEvents();
  }

  function wireEvents() {
    // Add to cart
    document.querySelectorAll('.AddToCartBtn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        if (!isUserLoggedIn()) {
          window.location = 'login.html';
          return;
        }
        if (typeof window.addTOCartEvent === 'function') {
          window.addTOCartEvent(id);
        } else {
          // Fallback: minimal add-to-cart using localStorage same keys as script.js
          const products = productsData;
          let addItemStorage = JSON.parse(localStorage.getItem('proudectInCart') || '[]');
          const item = products.find(p => p.id === id);
          if (!item) return;
          if (!addItemStorage.find(p => p.id === id)) {
            addItemStorage.push(item);
            localStorage.setItem('proudectInCart', JSON.stringify(addItemStorage));
          }
        }
      });
    });

    // Remove from favorites
    document.querySelectorAll('[data-fav-id]').forEach(icon => {
      icon.addEventListener('click', () => {
        const id = Number(icon.getAttribute('data-fav-id'));
        let favs = getFavorites();
        favs = favs.filter(fid => fid !== id);
        localStorage.setItem('favorites', JSON.stringify(favs));
        renderFavorites();
      });
    });
  }

  // Initial render
  renderFavorites();
})();


