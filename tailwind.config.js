/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx,mdx}", // Adjust if needed
      "./public/index.html",
    ],
    darkMode: "class", // optional, for dark mode toggle
    theme: {
      extend: {
        // You can extend theme here
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      // for prose class
    //   require('@tailwindcss/forms'),
    //   require('@tailwindcss/aspect-ratio'),
    ],
  };
  