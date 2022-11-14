import { faker } from '@faker-js/faker';

const mediaQueryReallySmallMobile = window.matchMedia('(max-width: 320px)').matches;
const mediaQuerySmallMobile = window.matchMedia('(max-width: 480px)').matches;
const mediaQueryMobile = window.matchMedia('(max-width: 768px)').matches;
const mediaQueryTablet = window.matchMedia('(max-width: 1024px)').matches;
const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)').matches;
const cellSize = (mediaQueryReallySmallMobile && 30) || (mediaQueryMobile && 40) || (mediaQueryTablet && 50) || (mediaQueryDesktop && 50);

export const GRID_WIDTH = 6;
export const GRID_HEIGHT = 8;
export const CELL_SIZE = cellSize;
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

export const numberFormatter = (num: number) => {
  // @ts-ignore
  return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k' : Math.sign(num) * Math.abs(num);
};

export const HOW_MANY = 1000000;
