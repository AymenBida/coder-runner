const gameId = 'FjYWSJ9EIym5ICtZImvy';

// const getScores = () => fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);

export default function () {
  return fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
}