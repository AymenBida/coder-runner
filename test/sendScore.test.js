import 'regenerator-runtime';
import { expect, jest } from '@jest/globals';
import sendScore from '../src/js/actions/sendScore';

beforeEach(() => {
  fetch.resetMocks();
});

it('Send the score using the API', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ result: 'Leaderboard score created correctly.' }]));
  const onResponse = jest.fn();
  const onError = jest.fn();
  return sendScore('Player', '55')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
    });
});