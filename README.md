# Recipe Finder Demo App

A sleek and responsive recipe discovery application built with Next.js and Tailwind CSS. This app allows users to search for thousands of recipes, filter by category, and save their favorites for later. It's a modern, fast, and user-friendly web app perfect for finding your next culinary inspiration.

**Live Demo:** [recipe-finder-demo-chi.vercel.app](https://recipe-finder-demo-chi.vercel.app)

---

## ✨ Features

This application comes with a variety of features to enhance the user experience:

* **⚡ Dynamic Recipe Search:** Instantly search for recipes by name or ingredient.
* **❤️ Favorites System:** Save your favorite recipes directly in your browser using `localStorage`. No account needed!
* **📂 Filter by Category:** Easily browse and filter recipes through a comprehensive list of categories.
* **🎲 "Feeling Lucky?" Button:** Discover a new meal with a single click that fetches and displays a random recipe in a modal.
* **📱 Fully Responsive Design:** A mobile-first approach ensures a seamless experience on any device, from phones to desktops.
* ** skeleton UI states:** See loading and error messages for a better user experience.

---

## 🛠️ Tech Stack

The application is built using a modern, efficient, and scalable tech stack:

* **Framework:** [Next.js](https://nextjs.org/) (v13+ with App Router)
* **Language:** JavaScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **API:** [TheMealDB API](https://www.themealdb.com/api.php) for recipe data
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (version 18.x or higher) and npm installed on your machine.

```bash
node -v
npm -v
```

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [recipe-finder.git](https://github.com/markestella/recipe-finder.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

---

## 🌐 API Route

To keep the external API usage secure and organized, this project uses a Next.js API route as a proxy.

* **Endpoint:** `/api/recipes`
* **Functionality:** It receives a `searchTerm` from the client, forwards the request to TheMealDB API, and returns the response. This approach hides the external API endpoint from the client and allows for server-side logic or caching in the future.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
