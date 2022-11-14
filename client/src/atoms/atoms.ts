import { atom } from 'recoil';

export const gameDifficultyState = atom({
  key: 'gameDifficultyState',
  default: 'easy',
});

export const scoreToWinState = atom({
  key: 'scoreToWinState',
  default: 10,
});

export const playAgainState = atom({
  key: 'playAgainState',
  default: false,
});
