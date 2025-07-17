# Aphrodite Scans - Manga Reader

![Demo Website](https://files.catbox.moe/7bw2a6.PNG)


A modern and responsive web application for reading manga, designed to fetch manga and chapter data from JSON files. This project provides a clean, dark-themed interface for browsing series and reading chapters seamlessly.

## ✨ Features

* **Homepage:** Displays a list of all available manga series with their covers, titles, authors, artists, and a brief description.
* **Series Page:** Detailed view for a selected manga, showing its cover, full description, author, artist, and a list of all chapters.
* **Manga Reader:** A dedicated page for reading manga chapters, displaying images sequentially.
* **Chapter Navigation:** Easy navigation between previous and next chapters directly from the reader.
* **Keyboard Navigation:** Use left/right arrow keys to navigate between manga pages/chapters.
* **Responsive Design:** Optimized for various screen sizes, from mobile to desktop.
* **Dark Mode:** A sleek, true dark mode theme for comfortable reading.
* **Social Links:** Integrated Discord and Ko-fi links in the header.

## 🚀 Live Demo

You can view the live application hosted on Cloudflare Pages here:
[https://YOUR-CLOUDFLARE-PAGES-URL.pages.dev](https://YOUR-CLOUDFLARE-PAGES-URL.pages.dev)
*(Remember to replace `YOUR-CLOUDFLARE-PAGES-URL` with your actual deployment URL)*

## 🛠️ Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
* **PostCSS:** A tool for transforming CSS with JavaScript plugins.
* **Font Awesome:** For various icons (Discord, Ko-fi, Play button).
* **Google Fonts (Inter):** For a clean and modern typography.

## 📦 Setup and Installation (Local Development)

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* **Node.js:** Ensure you have Node.js (v14 or higher recommended) and npm (or Yarn) installed.
    * Download Node.js: [https://nodejs.org/](https://nodejs.org/)
    * Verify installation: `node -v` and `npm -v`

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YOUR-USERNAME/manga-reader.git](https://github.com/YOUR-USERNAME/manga-reader.git)
    cd manga-reader
    ```
    *(Replace `YOUR-USERNAME` with your GitHub username)*

2.  **Install Dependencies:**
    ```bash
    npm install
    # or if you use Yarn:
    # yarn install
    ```

3.  **Install Tailwind CSS and PostCSS Dependencies:**
    ```bash
    npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
    ```
    If you haven't already, initialize Tailwind CSS:
    ```bash
    npx tailwindcss init -p
    ```

4.  **Configure Tailwind CSS (`tailwind.config.js`):**
    Open `tailwind.config.js` and ensure the `content` array is configured to scan your React components for classes:
    ```javascript
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        },
      },
      plugins: [],
    }
    ```

5.  **Configure PostCSS (`postcss.config.js`):**
    Open `postcss.config.js` and ensure it's set up correctly for Tailwind CSS:
    ```javascript
    // postcss.config.js
    module.exports = {
      plugins: {
        '@tailwindcss/postcss': {}, // Use the specific PostCSS plugin for Tailwind
        autoprefixer: {},
      },
    };
    ```

6.  **Add Tailwind Directives to your CSS (`src/index.css`):**
    Ensure your main CSS file (`src/index.css`) includes the Tailwind directives:
    ```css
    /* src/index.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* You can add any custom CSS here if needed */
    ```

7.  **Include CDN Links in `public/index.html`:**
    Open `public/index.html` and add the following `<link>` tags inside the `<head>` section, just before the `</head>` closing tag, for Font Awesome icons and the Inter font:
    ```html
    <!-- public/index.html -->
    <head>
      <!-- ... other head content ... -->
      <link rel="stylesheet" href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css)">
      <link href="[https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap)" rel="stylesheet">
    </head>
    ```

8.  **Copy `App.js` Content:**
    Replace the entire content of your `src/App.js` file with the React code provided in the previous responses.

9.  **Start the Development Server:**
    ```bash
    npm start
    # or if you use Yarn:
    # yarn start
    ```
    This will open the application in your browser at `http://localhost:3000`.

## ☁️ Deployment (Cloudflare Pages)

This application is set up for easy deployment with Cloudflare Pages.

1.  **Build your project:** Run `npm run build` to create the production-ready files in the `build` directory.
2.  **Connect to Cloudflare Pages:**
    * Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
    * Navigate to **Pages** and click "Create a project".
    * Connect your Git repository (GitHub, GitLab, or Bitbucket).
    * Use the following build settings:
        * **Build command:** `npm run build`
        * **Build output directory:** `build`
        * **Framework preset:** `Create React App` (or Custom, if not available)
3.  Cloudflare Pages will automatically deploy your site, and subsequent pushes to your connected branch will trigger new deployments.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

