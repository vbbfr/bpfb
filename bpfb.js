const settings = {
  harderRolls: true
};
const field = [];
// base
const X = [20, 30, 40, 50, 60, 70, 80, 90, 100, 120];
//bonus
const Y = [0, 0, 0, 0 , 20, 25, 30, 35, 40, 2];

function setField () {
  for (i = 0; i < 5; i++) {
    field[i] = [];
    for (j = 0; j < 5; j++) {
      field[i][j] = 0;
    }
  }
}

function drawGame () {
  let playarea = '';

  playarea += '<table><tr>'
  for (i = 0; i < 5; i++) {
    playarea += `<td><h1>${i+1}</h1></td>`;
  }
  playarea += '</tr></table>';
  
  playarea += '<br>';
  
  playarea += '<table>';
  for (i = 0; i < 5; i++) {
    playarea += '<tr>';
    for (j = 0; j < 5; j++) {
      playarea += `<td id="${i}_${j}"">`;
    }
    playarea += '</tr>';
  }
  playarea += '</table>';

  document.getElementById('playarea').innerHTML = playarea;


  let left = `
    <table><tr><td>
      <div style="width:100px;height:100px;overflow:hidden;position:relative;">
      <h1 style="
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
        right:5px;
        margin:0;
      ">V</h1>
      <h1 style="
        position:absolute;
        bottom:0;
        left:50%;
        transform: translateX(-50%);
        margin:0;
      ">W</h1>
      </div>
    </td></tr></table><br>
  `;
  left += '<table>';
  for (i = 0; i < 5; i++) {
    left += `<tr><td><h1>${i+1}</h1></td></tr>`;
  }
  left += '</table>';
  document.getElementById('left').innerHTML = left;

  document.getElementById('harderRolls').checked = settings.harderRolls;
}

let thrustCount = 0;
let v = 0;
let w = 0;
let x = 0;
let y = 0;

function roll (n, harderRolls) {
  // x € [0, n]
  if (harderRolls) {
    // f(x) = x => F(x) = x^2 => x = Math.Sqrt(F)
    // R = x * n = Math.Sqrt(F) * n
    return Math.floor(Math.sqrt(Math.random()) * n);
  } else {
    // f(x) = 1 => F(x) = x => x = F
    // R = x * n = F * n
    return Math.floor(Math.random() * n)
  }
}

function rolling () {
  v = roll(5, false);
  document.getElementById('v').innerText = `V: ${v + 1}`;
  w =roll(5, false);
  document.getElementById('w').innerText = `W: ${w + 1}`;

  x = roll(10, settings.harderRolls);
  document.getElementById('x').innerText = `X: ${x + 1}`;
  x = X[x];
  document.getElementById('X').innerText = `Base Thrusts: ${x}`;
  y = roll(10, settings.harderRolls);
  document.getElementById('y').innerText = `Y: ${y + 1}`;
  if (y === 9) {
    y = x;
  } else {
    y = Y[y];
  }
  document.getElementById('Y').innerText = `Bonus Thrusts: ${y}`;
  document.getElementById('sumRound').innerHTML = `Do <u>${x + y}</u> Thrusts to continue!`;
  
  document.getElementById('rollBtn').setAttribute('disabled', true);
  document.getElementById('doneBtn').removeAttribute('disabled');

  field[v][w] = 1;

  document.getElementById(`${w}_${v}`).classList.add('active');
}

function done () {
  document.getElementById(`${w}_${v}`).classList.remove('active');
  document.getElementById(`${w}_${v}`).classList.add('done');
  document.getElementById(`${w}_${v}`).innerHTML = '<h1>X</h1>';

  document.getElementById('rollBtn').removeAttribute('disabled');
  document.getElementById('doneBtn').setAttribute('disabled', true);

  thrustCount += x + y;
  document.getElementById('total').innerHTML = `Your total amount of Thrusts so far: <u>${thrustCount}</u>`;

  if (isWon()) {
    document.getElementById('resetBtn').removeAttribute('disabled');
    setTimeout(() => alert(`Congratulations, you have won the Boipussy Fucking Bingo! You completed it in ${thrustCount} Thrusts. Be proud of yourself!`), 0);
  }
}

function isWon () {
  let won = false;
  // horizontals
  field.forEach(
    function (row) {
      if (row.reduce((acc, val) => acc + val) === 5) {
        won = true;
      }
    }
  );
  // verticals
  for (let i = 0; i < 5; i++) {
    if (field[0][i] + field[1][i] + field[2][i] + field[3][i] + field[4][i] === 5) {
      won = true;
    }
  }
  // diagonals
  if (
    field[0][0] + field[1][1] + field[2][2] + field[3][3] + field[4][4] === 5 ||
    field[0][4] + field[1][3] + field[2][2] + field[3][1] + field[4][0] === 5
    ) {
      won = true;
  }
  return won;
}

function toggleHarderRolls () {
  if (settings.harderRolls) {
    settings.harderRolls = false;
    document.getElementById('harderRolls').checked = false;
  } else {
    settings.harderRolls = true;
    document.getElementById('harderRolls').checked = true;
  }
}

function start () {
  setField();
  thrustCount = 0;
  drawGame();  document.getElementById('v').innerText = 'V:'
  document.getElementById('w').innerText = 'W:';
  document.getElementById('x').innerText = 'X:';
  document.getElementById('X').innerText = 'Base Thrusts:';
  document.getElementById('y').innerText = 'Y:';
  document.getElementById('Y').innerText = 'Bonus Thrusts:';
  document.getElementById('sumRound').innerHTML = `Do your Thrusts to continue!`;
  document.getElementById('total').innerHTML = `Your total amount of Thrusts so far: <u>0</u>`;
  document.getElementById('resetBtn').setAttribute('disabled', true);
}

start();
