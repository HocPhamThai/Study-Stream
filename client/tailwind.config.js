/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%)',
        'custom-gradient-blue':
          'linear-gradient(98.63deg, #24e4f0 0%, #358ff9 100%)',
      },
    },
  },
  plugins: [],
}
