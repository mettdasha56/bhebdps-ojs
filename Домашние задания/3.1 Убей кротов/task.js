let dead = 0;
let lost = 0;

const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

function resetScore() {
  dead = 0;
  lost = 0;
  deadCounter.textContent = dead;
  lostCounter.textContent = lost;
}

for (let i = 1; i <= 9; i++) {
  const hole = getHole(i);

  hole.addEventListener('click', function () {
    if (hole.classList.contains('hole_has-mole')) {
      dead++;
      hole.classList.remove('hole_has-mole');
    } else {
      lost++;
    }

    deadCounter.textContent = dead;
    lostCounter.textContent = lost;

    if (dead === 10) {
      alert('Победа! Ты поймала 10 кротов!');
      resetScore();
    } else if (lost === 5) {
      alert('Игра окончена! Ты промахнулась 5 раз.');
      resetScore();
    }
  });
}
