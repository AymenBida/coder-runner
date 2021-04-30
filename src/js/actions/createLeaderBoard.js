export default function (data) {
  const body = document.querySelector('body');

  const h1 = document.createElement('h2');
  h1.textContent = 'Top 10 scores';
  h1.className = 'leaderBoard__title';
  body.appendChild(h1);

  const table = document.createElement('table');
  table.className = 'table leaderBoard';
  body.appendChild(table);

  const thead = document.createElement('thead');
  table.appendChild(thead);

  const tr = document.createElement('tr');
  thead.appendChild(tr);

  const rankTh = document.createElement('th');
  rankTh.textContent = 'Rank';
  rankTh.setAttribute('scope', 'col');
  tr.appendChild(rankTh);

  const nameTh = document.createElement('th');
  nameTh.textContent = 'Player';
  nameTh.setAttribute('scope', 'col');
  tr.appendChild(nameTh);

  const scoreTh = document.createElement('th');
  scoreTh.textContent = 'Score';
  scoreTh.setAttribute('scope', 'col');
  tr.appendChild(scoreTh);

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  data.forEach((element, index) => {
    const elementTr = document.createElement('tr');

    const elementRankTd = document.createElement('td');
    elementRankTd.textContent = `${index + 1}`;
    elementTr.appendChild(elementRankTd);

    const elementNameTd = document.createElement('td');
    elementNameTd.textContent = `${element.user}`;
    elementTr.appendChild(elementNameTd);

    const elementScoreTd = document.createElement('td');
    elementScoreTd.textContent = `${element.score}`;
    elementTr.appendChild(elementScoreTd);

    tbody.appendChild(elementTr);
  });

  const credits = document.createElement('p');
  credits.className = 'credits';
  credits.textContent = 'Created by Aymen Bida';
  body.appendChild(credits);
}