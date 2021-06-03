from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "whatnow"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def show_board():
    """Show board"""

    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get('highscore', 0)
    reps = session.get('reps', 0)

    return render_template('board.html', reps = reps, highscore = highscore)

@app.route('/check-word')
def check_word():
    """Check if guess is on board using check_valid_word, pass in board and word, find if guess is a valid word"""
    
    word = request.args["guess"]
    board = session["board"]
    res = boggle_game.check_valid_word(board, word)

    return jsonify({'result': res})
    #don't remember jsonify being taught

# i want to submit form, get form answer, post answer to server via ajax, 

@app.route('/past-games', methods=["POST"])
def past_games():
    """Receive scores and keep track of times played"""

    score = request.json['score']
    reps = session.get('reps', 0)
    highscore = session.get('highscore', 0)
    session['reps'] = reps + 1

    
    if score >= highscore:
        session['highscore'] = score
        return jsonify({'score': highscore, 'reps': reps})
    elif highscore > score:
        return jsonify({'score': highscore, 'reps': reps})


# second parameter in session.get is a default value if value isn't set
# axios posts and gets are more of a conversation? Once axios gets called in java, python runs, then the next line in java runs
# even post requests have access to response.data