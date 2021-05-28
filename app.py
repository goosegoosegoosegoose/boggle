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

    return render_template('board.html')

@app.route('/check-word')
def check_word():
    """Check if guess is on board using check_valid_word, pass in board and word, find if guess is a valid word"""
    
    word = request.args['guess']
    board = session['board']
    res = boggle_game.check_valid_word(board, word)

    return jsonify({'result': res})
    #don't remember jsonify being taught



    
