module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // https://www.happyhues.co/palettes/17
      // sand: '#f3d2c1',
      // 'sand-light': '#fef6e4', // elements background
      // pink: '#f582ae', // elements button
      // navy: '#001858', // elements button text
      // 'navy-light': '#172c66', // elements paragraph
      // teal: '#8bd3dd', // illustration secondary 
      // white: '#fff', // white
      // --
      // https://www.happyhues.co/palettes/15
      sand: '#f3d2c1',
      'sand-light': '#faeee7', // elements background
      pink: '#FF3874', // elements button
      navy: '#33272a', // elements button text
      'navy-light': '#594a4e', // elements paragraph
      teal: '#ffc6c7', // illustration secondary 
      white: '#fffffe', // white
      green: '#c3f0ca', // tertiary highlight
    },
    fontFamily: {
      inter:
        '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'inter-var':
        '"Inter var", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      modernist:
        '"Modernist Bold", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      boxShadow: {
        outline: '0 0 0 2px #f582ae',
      },
      spacing: {
        '80': '20rem',
        '96': '24rem',
        '128': '32rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
