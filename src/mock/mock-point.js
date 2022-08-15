export const generatePoint = () => ({
  // description: generateDescription(),
  dueDate: null,
  repeating: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  color: 'black',
  isArchive: false,
  isFavorite: false,
});
