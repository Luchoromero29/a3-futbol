tailwind.config = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ajusta según la estructura de tu proyecto
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        green: 'rgb(62, 177, 110)',
        darkGreen: 'rgb(44, 125, 78)',
        lightGreen: 'rgb(216, 240, 226)',
        grayBg: 'rgb(153, 153, 153)',
        darkGrayBg:'rgb(102, 102, 102)',
        black: 'rgb(48, 48, 48)',
        lightGrayBg: 'rgb(244, 245, 246)',
        linesColor: 'rgb(230, 230, 230)'
      }
    }
  }
}