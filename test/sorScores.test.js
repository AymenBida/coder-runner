import { expect, it } from '@jest/globals';
import sortScores from '../src/js/actions/sortScores';

const dataExample = [
  {
    user: 'Aymen',
    score: 10,
  },
  {
    user: 'Max',
    score: 60,
  },
];

it('sorts the array by alphabetical order if the scores are equal', () => {
  const sorted = sortScores(dataExample);
  expect(sorted[0].user).toEqual('Max');
});

const sameScore = [
  {
    user: 'Max',
    score: 60,
  },
  {
    user: 'Aymen',
    score: 60,
  },
];

it('sorts the array by alphabetical order if the scores are equal', () => {
  const sorted = sortScores(sameScore);
  expect(sorted[0].user).toEqual('Aymen');
});
