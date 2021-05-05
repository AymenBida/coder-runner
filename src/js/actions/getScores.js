const gameId = 'Sll7UCeqfTqPw1sufaRM';

export default async function () {
  try {
    const getScore = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
    return await getScore.json();
  } catch (error) {
    throw new Error(error);
  }
}
