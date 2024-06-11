/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: "20px",
        center: true,
        screens: {
          sm: "768px",
          md: "980px",
          lg: "1400px",
        },
      },
      colors: {
        buttonBrand: "#238636",
        glassBg: "rgba(255, 255, 255, 0.9)",
        layoutColor: "#001529",
        navbarHover: "rgba(0, 0, 0, 0.3)",
        greenActiveWorks: "#028A0F",
        mainBg: "#DCE9F9",
      },
      boxShadow: {
        navbarShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
        tableShadow: "0px 0px 4px 0px rgba(61,69,69,1)",
      },
    },
  },
  plugins: [],
};
