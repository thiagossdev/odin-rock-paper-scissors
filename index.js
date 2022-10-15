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
})(window, Math);
