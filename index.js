(function (d, w, m) {
  const choices = ['rock', 'papper', 'scissors'];
  const emojis = {
    'rock': '✊',
    'papper': '✋',
    'scissors': '✌'
  };

  function generateRandomInteger(max) {
    return m.floor(m.random() * max);
  }

  function getComputerChoice() {
    return choices[generateRandomInteger(3)]
  }

  function getPlayerChoice() {
    let choice = '';
    while (!choices.includes(choice)) {
      choice = w.prompt('✊, ✋ or ✌').toLowerCase();
    }

    return choice;
  }

  function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      return 'It\'s a tie!';
    } else if((playerSelection === 'rock' && computerSelection === 'scissors')
      || (playerSelection === 'scissors' && computerSelection === 'papper')
      || (playerSelection === 'papper' && computerSelection === 'rock')) {
      return 'You won!';
    } else {
      return 'You lost!';
    }
  }

  function playerChoiceListener(element) {
    const gameData = w['gameData'];
    const elementResult = d.getElementById('result');

    if (gameData.round <= 5) {
      const playerSelection = this.value;
      const computerSelection = getComputerChoice();
      const result = playRound(playerSelection, computerSelection);
      
      d.querySelector('#player .current').innerHTML = emojis[playerSelection];
      d.querySelector('#computer .current').innerHTML = emojis[computerSelection];

      if (result === 'You won!') {
        gameData.win++;
        d.querySelector('#player .counter').innerHTML = gameData.win;
        elementResult.innerHTML = `<strong>${result}</strong> ${playerSelection} beats  ${computerSelection}`;
      } else if (result === 'You lost!') {
        gameData.lost++;
        d.querySelector('#computer .counter').innerHTML = gameData.lost;
        elementResult.innerHTML = `<strong>${result}</strong> ${playerSelection} is beaten by ${computerSelection}`;
      } else {
        elementResult.innerHTML = `<strong>${result}</strong> ${playerSelection} ties with ${computerSelection}`;
      }

      if (gameData.round < 5 && gameData.win !== 3 && gameData.lost !== 3) { 
        d.getElementById('round').innerHTML = gameData.round + 1;
      }
 
      gameData.round++;
    }
    
    

    if (gameData.round >= 5 || gameData.win === 3 || gameData.lost === 3) {
      gameData.round = 6;
      if (gameData.win > gameData.lost) {
        elementResult.innerHTML = 'You are winner!';
      } else if (gameData.win < gameData.lost) {
        elementResult.innerHTML ='You are loser!';
      } else {
        elementResult.innerHTML = 'Game tie!';
      }
      elementResult.classList.add('title');
      elementResult.classList.remove('subtitle');
      elementResult.nextElementSibling.classList.add('subtitle');
      elementResult.nextElementSibling.classList.remove('title');

      for (const button of d.querySelectorAll('.btn')) {
        button.setAttribute('disabled', '');
      }
    }
  }

  function testPlayRound() {
    const data = [
      ['rock', 'rock', 'It\'s a tie!'],
      ['rock', 'scissors', 'You won!'],
      ['rock', 'papper', 'You lost!'],
      ['scissors', 'rock', 'You lost!'],
      ['scissors', 'scissors', 'It\'s a tie!'],
      ['scissors', 'papper', 'You won!'],
      ['papper', 'rock', 'You won!'],
      ['papper', 'scissors', 'You lost!'],
      ['papper', 'papper', 'It\'s a tie!'],
    ];
    let output = '';

    data.forEach((d) => {
      output += playRound(d[0], d[1]) === d[2] ? '.' : 'F'
    });

    console.log(output);
  }
  
  function consoleGame() {
    let win = 0;
    let lost = 0;

    for (let i = 0; i < 5; i++) {
      const playerSelection = getPlayerChoice();
      const computerSelection = getComputerChoice();
      const result = playRound(playerSelection, computerSelection);
      
      console.log(result);
      if (result === 'You won!') {
        win++;
        console.log(`${playerSelection} beats  ${computerSelection}`);
      } else if (result === 'You lost!') {
        lost++;
        console.log(`${playerSelection} is beaten by ${computerSelection}`);
      } else {
        console.log(`${playerSelection} ties with ${computerSelection}`);
      }

      if (win === 3 || lost === 3) {
        break;
      }
    }

    if (win > lost) {
      console.log('You are winner!');
    } else if (win < lost) {
      console.log('You are loser!');
    } else {
      console.log('Game tie!');
    }
  }

  function webGame() {
    w['gameData'] = {
      round: 1,
      win: 0,
      lost: 0,
    }
    
    Array.from(d.querySelectorAll('.btn')).map((element) => {
      element.addEventListener('click', playerChoiceListener);
    });
  }
  
  // Disable console game
  // consoleGame();
  // Enable web game
  webGame();
})(document, window, Math);
