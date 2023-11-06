/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                basketball: ["basketball"],
                montserrat: ["Inspiration"],
            },
            animation: {
              'custom-spin': 'spin 1s cubic-bezier(0.6, 0, 0.4, 1) infinite'
            }
        },
    },
    plugins: [],
};
