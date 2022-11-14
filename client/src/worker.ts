import { faker } from '@faker-js/faker';

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

onmessage = (e) => {
  const randomWords = [
    ...Array.from({ length: 250000 }, (v, k) => faker.name.firstName()),
    ...Array.from({ length: 250000 }, (v, k) => capitalizeFirstLetter(faker.word.noun())),
    ...Array.from({ length: 250000 }, (v, k) => capitalizeFirstLetter(faker.word.adjective())),
    ...Array.from({ length: 250000 }, (v, k) => capitalizeFirstLetter(faker.address.country())),
  ];

  // Helper to try better distributing letters in the grid
  // Get random characters from random words in the random words array
  const _alphabet = randomWords.reduce((acc, word) => {
    const randomIndex = Math.floor(Math.random() * word.length);
    const randomCharacter = word[randomIndex];
    return acc + randomCharacter.toUpperCase();
  }, '');

  // Delete non words character from alphabet
  const alphabet = _alphabet.replace(/[^A-Z]/g, '');

  postMessage({ randomWords, alphabet });
};
