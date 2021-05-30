class BoggleGame {

  constructor(id){

      this.words = new Set();
      this.board = $(`#${id}`);
      this.score = 0;

      this.handleClick = this.handleClick.bind(this);

      // $("#form", this.board).on("submit", this.handleClick.bind(this));
      // bind event handlers
  }

  showMessage(msg) {
    $("#msgsection").innerText = msg
  }

  showWord(word) {
    $("#wordsection").append(`<li>${word}</li>`)
  }

  async handleClick(evt){
      evt.preventDefault();
      
      const $guess = $('#guess', this.board);
      
      let guess = $guess.val();

      if (this.words.has(guess)) {
        this.showMessage("Word already guessed");
        return;
      }

      const res = await axios.get("/check-word", {params: {guess: guess}});
      if (res.data.result === "not-word") {
          this.showMessage(`${guess} is not in dictionary`);
        } else if (res.data.result === "not-on-board") {
          this.showMessage(`${guess} is not on this board`);
        } else {
          this.showWord(guess);
          this.score += guess.length;
          // this.showScore();
          this.words.add(guess);
          this.showMessage(`${guess} added`);
    }
    $guess.val("");
  }

}

let boggle = new BoggleGame("bog");

$("#form").on("submit", boggle.handleClick.bind(boggle));
// what the heck