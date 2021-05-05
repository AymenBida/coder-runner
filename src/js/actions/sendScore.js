const gameId = 'Sll7UCeqfTqPw1sufaRM';

export default async function fn(user, score) {
  try {
    const sendScore = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        score,
      }),
    });
    await sendScore.json();
  } catch (error) {
    throw new Error(error);
  }
}