const themableColors = ["bannerPrimary","bannerFi","bannerSecondary","contentPrimaryBg","contentPrimaryFi","contentSecondaryBg","contentSecondaryFi","accentBg","accentFi","selectedBg","hyperlink"];
const staticColors = ["blue","red","yellowGreen","gold","skyBlue","profiseeGreen","coolGray","seaGreen","workspace"];
const paletteScale = [ "100", "200", "300", "400", "500", "600", "700", "800", "900"]

function withOpactity(variableName) {
  return ({opacityValue}) => {
    if(opacityValue !== undefined) {
      return `rgba(var(--${variableName}), ${opacityValue})`;
    }
    return `rgba(var(--${variableName}))`;
  }
}

var twGeneratedStatic = {};
staticColors.forEach((color) => {
  paletteScale.forEach((scale) => {
    twGeneratedStatic[`${color}${scale}`] = withOpactity(`${color}${scale}`);
  })
})

var twGeneratedThemable = {};
themableColors.forEach((color) => {
  paletteScale.forEach((scale) => {
    twGeneratedThemable[`${color}${scale}`] = withOpactity(`${color}${scale}`);
  })
})

module.exports = {
  purge: [
    // './public/**/*.html',
    // './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...twGeneratedStatic,
        ...twGeneratedThemable,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
