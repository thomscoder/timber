import { faker } from '@faker-js/faker';

export const alphabet = Array.from({ length: 26 }, (v, k) => String.fromCharCode(k + 65));

export const arrayWithFixedLength = (length: number) => {
  let array = new Array();
  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }
    // @ts-ignore
    return Array.prototype.push.apply(this, arguments);
  };
  return array;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const randomWords = [
  ...Array.from({ length: 1000000 }, (v, k) => faker.name.firstName()),
  ...Array.from({ length: 1000000 }, (v, k) => capitalizeFirstLetter(faker.word.noun())),
  ...Array.from({ length: 1000000 }, (v, k) => capitalizeFirstLetter(faker.word.adjective())),
  ...Array.from({ length: 1000000 }, (v, k) => capitalizeFirstLetter(faker.address.country())),
];
