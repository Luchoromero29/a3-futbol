tailwind.config = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ajusta según la estructura de tu proyecto
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        green: 'rgb(62, 177, 110)',
        'dark-green': 'rgb(44, 125, 78)',
        'light-green': 'rgb(216, 240, 226)',
        'gray-bg': 'rgb(197, 197, 197)',
        'dark-gray-bg':'rgb(102, 102, 102)',
        black: 'rgb(48, 48, 48)',
        'light-gray-bg': 'rgb(244, 245, 246)',
        'lines-color': 'rgb(230, 230, 230)'
      },
      zIndex: {
        '100': '100', // Añadir zIndex con valor 100
      },
    }
  }
}