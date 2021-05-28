class BoggleGame {

  constructor(id){

      this.words = new Set();
      this.board = $(`#${id}`);
      this.score = 0;

      $("#form", this.board).on("submit", this.handleClick.bind(this));
  }

  showMessage(msg) {
    $("#msgsection").innerText = msg
  }

  showWord(word) {
    $("#wordsection").append(`<li>${word}</li>`)
  }

  async handleClick(evt){
      evt.preventDefault();
      
      const $guess = $('#guess', this.board)
      
      let guess = $guess.val()

      if (this.words.has(guess)) {
        this.showMessage("Word already guessed")
        return
      }

      const res = await axios.get("/check-word", {params: {word: guess}});
      if (res.data.result === "not-word") {
          this.showMessage(`${guess} is not in dictionary`);
        } else if (res.data.result === "not-on-board") {
          this.showMessage(`${guess} is not on this board`);
        } else {
          this.showWord(guess);
          this.score += word.length;
          // this.showScore();
          this.words.add(guess);
          this.showMessage(`${guess} added`);
    }
    $guess.val("");
  }

}


new BoggleGame("boggle");

// bind the form