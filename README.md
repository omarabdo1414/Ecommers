# E-Commerce Pure JavaScript Project

A modern, responsive e-commerce website built with vanilla JavaScript, HTML5, and CSS3. This project features a complete shopping experience with user authentication, product catalog, shopping cart, favorites system, and search functionality.

## 🚀 Features

### Core Functionality
- **User Authentication System**
  - User registration and login
  - Session management with localStorage
  - Protected routes and features

- **Product Catalog**
  - Dynamic product display with categories
  - Product images, descriptions, and pricing
  - Sale price display with original price strikethrough

- **Shopping Cart System**
  - Add/remove products from cart
  - Quantity management (increase/decrease)
  - Real-time cart counter badge
  - Cart dropdown with item list
  - Total price calculation
  - Persistent cart data (localStorage)

- **Favorites System**
  - Add/remove products to favorites
  - Heart icon toggle functionality
  - Favorites page with carousel display

- **Search & Filter**
  - Search by product title
  - Search by product category
  - Real-time search results
  - Dynamic product filtering

- **Responsive Design**
  - Mobile-friendly interface
  - Bootstrap 4 integration
  - Modern UI with smooth animations

## 📁 Project Structure

```
E-Commerce pure js/
├── index.html              # Main homepage
├── login.html              # User login page
├── register.html           # User registration page
├── cartProudcts.html       # Cart and favorites page
├── favorite.html           # Favorites display page
├── css/
│   ├── all.css            # Font Awesome icons
│   └── style.css          # Custom styles
├── js/
│   ├── script.js          # Main application logic
│   ├── user.js            # User authentication
│   ├── login.js           # Login functionality
│   ├── register.js        # Registration functionality
│   ├── cartProudcts.js    # Cart page logic
│   └── favorites.js       # Favorites functionality
├── images/                # Product images and assets
└── webfonts/             # Font Awesome font files
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **UI Framework**: Bootstrap 4.6.2
- **Icons**: Font Awesome
- **Data Storage**: localStorage (client-side)
- **HTTP Server**: Any local server (Python, Node.js, etc.)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd "E-Commerce pure js"
   ```

2. **Start a local server** (choose one option):

   **Option 1: Python (Recommended)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Node.js**
   ```bash
   npx http-server
   ```

   **Option 3: Live Server (VS Code Extension)**
   - Install Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open your browser**
   - Navigate to `http://localhost:8000` (or the port shown by your server)
   - The application should load and be ready to use

## 📖 Usage Guide

### For Users

#### 1. **Registration & Login**
- Click "Create New Account" to register
- Fill in your details and create an account
- Use your credentials to log in
- Once logged in, you'll see your username and logout option

#### 2. **Browsing Products**
- View products on the homepage
- Use the search bar to find specific products
- Filter by title or category using the dropdown
- Click the heart icon to add/remove from favorites

#### 3. **Shopping Cart**
- Click "Add To Cart" to add products
- The cart counter badge will show the number of items
- Click the cart icon to view your cart
- Use +/- buttons to adjust quantities
- Click "Remove From Cart" to remove items

#### 4. **Favorites**
- Click the heart icon on any product to add to favorites
- View your favorites on the favorites page
- Remove items from favorites by clicking the heart again

### For Developers

#### Key JavaScript Files

**`script.js`** - Main application logic
- Product data management
- Cart functionality
- Search and filtering
- UI interactions

**`user.js`** - User authentication
- Login/logout functionality
- Session management
- Header UI updates

**`login.js` & `register.js`** - Authentication pages
- Form validation
- User registration
- Login processing

## 🔧 Configuration

### Adding New Products

To add new products, edit the `products` array in `js/script.js`:

```javascript
let products = [
    {
        id: 19,                                    // Unique ID
        title: "Product Name",                     // Product title
        category: "Category",                      // Product category
        color: "Color",                           // Product color
        price: "Original Price",                  // Original price (string)
        salePrice: "Sale Price",                  // Sale price (string)
        imageURL: "images/product-image.jpg"      // Image path
    },
    // ... more products
];
```

### Customizing Styles

Edit `css/style.css` to customize:
- Color scheme
- Layout spacing
- Typography
- Responsive breakpoints

### Modifying Cart Behavior

Key functions in `script.js`:
- `addTOCartEvent(id)` - Add product to cart
- `removeFromCart(id)` - Remove product from cart
- `drawBuyProudect(item)` - Render cart items
- `openCart()` - Toggle cart dropdown

## 🎨 Customization

### Changing Colors
The main color scheme can be modified in `css/style.css`:

```css
:root {
    --primary-color: #007bff;      /* Main brand color */
    --secondary-color: #6c757d;    /* Secondary color */
    --success-color: #28a745;      /* Success/positive actions */
    --danger-color: #dc3545;       /* Danger/delete actions */
}
```

### Adding New Categories
1. Add products with new categories to the products array
2. The search functionality will automatically include new categories
3. Update category-specific styling if needed

## 🔒 Security Considerations

- This is a client-side only application
- User data is stored in localStorage (not secure for production)
- No server-side validation
- For production use, implement:
  - Server-side authentication
  - Database storage
  - Input validation
  - HTTPS encryption

## 🐛 Troubleshooting

### Common Issues

**1. Cart not working**
- Ensure you're logged in
- Check browser console for JavaScript errors
- Clear localStorage and try again

**2. Images not loading**
- Verify image paths in the products array
- Check if images exist in the `images/` folder
- Ensure proper file permissions

**3. Search not working**
- Check if the search input has the correct ID
- Verify the search function is properly connected
- Clear browser cache

**4. Styling issues**
- Ensure all CSS files are loaded
- Check for CSS conflicts
- Verify Bootstrap is properly included

### Debug Mode

Enable console logging by uncommenting console.log statements in the JavaScript files.

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a training project for learning vanilla JavaScript e-commerce development.

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added search and filtering
- **v1.2.0** - Improved cart functionality and UI
- **v1.3.0** - Added favorites system and responsive design

---

**Note**: This is a training/demo project. For production use, implement proper security measures and server-side functionality.
