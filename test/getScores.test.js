import 'regenerator-runtime';
import { expect } from '@jest/globals';
import getScores from '../src/js/actions/getScores';

beforeEach(() => {
  fetch.resetMocks();
});

it('Get the scores from the API', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    result: [
      {
        user: 'Aymen Bida',
        score: 77,
      }],
  }));
  const result = await getScores();
  expect(result).toEqual({ result: [{ score: 77, user: 'Aymen Bida' }] });
  expect(fetch.mock.calls.length).toEqual(1);
});