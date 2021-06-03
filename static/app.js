class BoggleGame {

  constructor(id){

      this.words = new Set();
      this.board = $(`#${id}`);
      this.score = 0;
      this.count = 60

      this.handleClick = this.handleClick.bind(this);

      // $("#form", this.board).on("submit", this.handleClick.bind(this));
      // bind event handlers
  }

  showMessage(msg) {
    $("#msgsection", this.board).text(msg);
  }

  showWord(word) {
    $("#wordsection", this.board).append(`<li>${word}</li>`);
  }

  showScore() {
    $("#scoresection", this.board).text(`Score: ${this.score}`);
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
          this.showScore();
          this.words.add(guess);
          this.showMessage(`${guess} added`);
    }
    $guess.val("");
  }

  showCountdown(){
    $("#countdown", this.board).text(`Timer: ${this.count}`);
  }

  async countdown() {

    this.count -= 1;
    this.showCountdown();
    if (this.count <= 0){
      clearInterval(counter);
      $("#guess", this.board).prop('disabled', true);
      $("#countdown", this.board).text("Time is up");
      await this.saveScore();
      return;
    }
  }

  async saveScore(){

    const res = await axios.post("/past-games", {score: this.score});
    
    if (this.score > res.data.score) {
      $("#msgsection", this.board).text(`${this.score} is your new highscore! You have played ${res.data.reps} times`)
    }
    else {
      $("#msgsection", this.board).text(`Your current highscore is ${res.data.score}. You have played ${res.data.reps} times`)
    }
  }
}

let boggle = new BoggleGame("bog");

$("#form").on("submit", boggle.handleClick.bind(boggle));
// what the heck boggle.handleClick.bind(boggle)

let counter = setInterval(boggle.countdown.bind(boggle), 1000);