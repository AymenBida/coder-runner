const gameId = 'Sll7UCeqfTqPw1sufaRM';

const getScores = () => fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);

const sortScores = (data) => data.sort((a, b) => {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score === b.score) {
    if (a.name < b.name) {
      return 1;
    }
    return -1;
  }
  return -1;
});

export default function fn() {
  return getScores()
    .then((response) => response.json())
    .then((data) => {
      const sorted = sortScores(data.result);
      const top10 = sorted.slice(0, 10);
      return top10;
    });
}