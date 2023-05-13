const white = 'white';
const grey93 = 'hsl(0, 0%, 93%)';
const grey97 = 'hsl(216, 38%, 97%)';
const grey90 = 'hsl(216, 4%, 90%)';
const grey55 = 'hsl(216, 4%, 55%)';
const grey30 = 'hsl(216, 4%, 30%)';
const grey20 = 'hsl(216, 4%, 20%)';
const grey15 = 'hsl(216, 4%, 15%)';
const grey10 = 'hsl(216, 4%, 10%)';
const grey8 = 'hsl(216, 4%, 8%)';
const lightBlue = 'hsl(215, 81%, 72%)';
const lightBlueHover = 'hsl(215, 81%, 60%)';
const darkBlue = 'hsl(228, 53%, 52%)';
const darkBlueHover = 'hsl(228, 53%, 62%)';
const error = 'hsl(0, 51%, 54%)';

const lightTheme = {
  bg: grey93,
  bgShadow: grey90,
  dropZoneBg: grey97,
  primary: lightBlue,
  btnHover: lightBlueHover,
  btnDisabled: grey55,
  btnSecBg: white,
  btnSecHover: grey90,
  containerBg: white,
  text: grey10,
  textSec: grey30,
  codeBg: grey90,
  loadingBar: grey90,
  link: darkBlue,
  error,
};

const darkTheme = {
  bg: grey10,
  bgShadow: grey8,
  dropZoneBg: grey20,
  primary: darkBlue,
  btnHover: darkBlueHover,
  btnSecBg: grey20,
  btnSecHover: grey30,
  containerBg: grey15,
  text: white,
  textSec: grey55,
  codeBg: grey30,
  loadingBar: grey30,
  link: lightBlue,
  error,
};

export { lightTheme, darkTheme };
