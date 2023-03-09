export const modeToPost = {
  name: 'Dorian',
};

export const modeOne = {
  name: 'Dorian b2',
};

export const modeTwo = {
  name: 'Lydian Dominant',
};

export const modePostResponse = {
  message: 'Success',
  mode: { ...modeToPost },
};

export const modeGetAllResponse = {
  message: 'Success',
  modes: [modeOne, modeTwo],
};
