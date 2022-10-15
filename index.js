(function (w, m) {
  const choices = ['rock', 'papper', 'scissors'];

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
})(window, Math);
