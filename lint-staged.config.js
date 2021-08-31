/* eslint-disable no-undef */
module.exports = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '*.{js,jsx,ts,tsx,md,html,css}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
};
