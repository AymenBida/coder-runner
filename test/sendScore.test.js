// eslint-disable-next-line import/no-unresolved
import 'regenerator-runtime';
// eslint-disable-next-line import/no-unresolved
import { expect, jest } from '@jest/globals';
import sendScore from '../src/js/actions/sendScore';

beforeEach(() => {
  fetch.resetMocks();
});

it('Send the score using the API', async () => {
  fetch.mockResponseOnce(JSON.stringify(''));
  const onResponse = jest.fn();
  const onError = jest.fn();
  return sendScore('55')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
    });
});