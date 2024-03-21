/***********************************************
 *
 *      Title: Simple Word Game (Words falling from the sky)
 *      Created by: John
 *      Place: Coding Dojo Project Demo (San Jose)
 *      Date: August 2018
 *
 **********************************************/

function Playground(selector, selector_word, selector_score) {
    this.canvas = document.getElementById(selector);
    this.selector_word = selector_word;     // stores the id of the input where the user can type the word
    this.selector_score = selector_score;   // stores the id of the div element where the score is displayed

    console.log(this.canvas);
    this.words = [];
    this.score = 0;                         // stores the score of the player
    this.counter = 0;                       // counts the number of words created

    this.playGame = function () {
        this.fallWords();                   // make the words fall from the sky
        this.createWord();                 // create a new word
        this.updateWordPosition();          // update where the words are displayed
    };

    // check whether any of the words matched the typed word by the user
    this.checkWord = function (typed) {
        console.log(typed);
        var ini_score = this.score;
        for (var i in this.words) {
            console.log(i);
            if (this.words[i].word == typed) {
                console.log('#word_' + this.words[i].id);
                $('#word_' + this.words[i].id).remove();
                this.score = this.score + 50;
            }
        }

        if (ini_score != this.score) {
            $('#' + this.selector_word).val('');
            $('#' + this.selector_score).text(this.score);
        }
    };


    //  create a new word and add the word to the canvas
    this.createWord = function () {
        this.counter++;

        // create a new word between 0 and max_x
        var newWord = new Word(this.counter);
        newWord.createRandomWordsBetween(0, 500);

        // store this new word into words array
        this.words.push(newWord);

        // insert this new word into the HTML
        this.canvas.innerHTML = this.canvas.innerHTML + "<div id='word_" + (newWord.id) + "'><div style='position: absolute; left: " + newWord.x + "px; top: " + newWord.y + "px;'>" + newWord.word + "</div></div>";
    };

    this.fallWords = function () {
        for (var i = this.words.length - 1; i >= 0; i--) {
            this.words[i].y = this.words[i].y + 15; // y falling distance of the word

            if (this.words[i].y > 385) { // remove words when they reach the bottom of the canvas
                $('#word_' + this.words[i].id).remove();    // remove the word from the HTML

                if (this.words[i].word != '') {
                    // penalize the user but only if the word is not empty
                    this.score = this.score - 100;

                    $('#' + this.selector_score).text(this.score);
                    this.words.shift(); // remove the first word in the array
                }

            }
        }

        this.updateWordPosition = function () {
            for (var i in this.words) {
                var loc = document.getElementById('word_' + this.words[i].id);
                if (loc) loc.innerHTML = "<div style='position: absolute; left: " + this.words[i].x + "px; top: " + this.words[i].y + "px;'>" + this.words[i].word + "</div>";
            }
        };
    };

    function Word(id) {
        var words = ['coding', 'dojo', 'awesome', 'rocks', 'ninja', 'pepper', 'pizza', 'python', 'ruby', 'java'];
        this.x = 0;
        this.y = 0;
        this.id = id;

        this.createRandomWordsBetween = function (x_min, x_max) {
            var random_index = Math.floor(Math.random() * words.length);
            this.word = words[random_index];
            var random_x_index = parseInt(Math.random() * (x_max - x_min - words.length * 15));
            this.x = x_min + random_x_index;
        };
    }

}