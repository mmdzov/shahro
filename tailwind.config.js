module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        'from-red-600 to-red-400',
        'from-blue-600 to-blue-400',
        'from-purple-600 to-purple-400',
        'from-green-600 to-green-400',
        'from-pink-600 to-pink-400',
        'from-purple-600 to-pink-400',
        'from-gray-600 to-gray-400',
        'from-red-600 to-yellow-400',
        'from-purple-600 to-blue-300',
        'from-green-600 to-blue-400',
        'from-pink-600 to-red-400',
        'from-blue-600 to-purple-400',
        'font-bold',
        'mb-1',
        'mb-3',
        '-mt-12',
        '-ml-3',
        'text-right',
        'mr-2',
        'text-green-500',
        'text-red-500',
        '-ml-4',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      // padding: '2rem',
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
