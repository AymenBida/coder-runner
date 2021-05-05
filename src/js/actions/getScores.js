const gameId = 'LQBfhB6zhSqtOnVmEX77';

export default async function fn() {
  try {
    const getScore = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
    return await getScore.json();
  } catch (error) {
    throw new Error(error);
  }
}
