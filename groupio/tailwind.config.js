/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1877f2',
        'primary-hover': '#166fe5',
        secondary: '#e4e6eb',
        'secondary-hover': '#d8dadf',
        danger: '#e41e3f',
        'text-primary': '#1c1e21',
        'text-secondary': '#65676b',
        'bg-primary': '#f0f2f5',
      },
    },
  },
  plugins: [],
}
