var frequencyTable = [
    "a", "a", "a", "a", "a", "a", "a", "a", "b", "b", "c", "c", "c", "d", "d", "d",
    "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "f", "f", "g",
    "g", "h", "h", "h", "h", "h", "h", "i", "i", "i", "i", "i", "i", "i", "j",
    "k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "o", "o",
    "o", "o", "o", "o", "o", "o", "p", "p", "q", "q", "q", "q", "q", "q", "r",
    "r", "r", "r", "r", "r", "s", "s", "s", "s", "s", "s", "s", "s", "t", "t",
    "t", "u", "u", "v", "v", "w", "x", "y", "z"
];

onload = function(){

    //reference all tiles
    var letters = document.getElementById('letterbox').getElementsByTagName('a');

    //Each tile gets random letter and click listener
    for (var i = 0; i < letters.length; i++) {
        var letter = letters[i];
        letter.className = letter.className + ' l' + frequencyTable[randomLetter()];
        letter.addEventListener('click', appendLetter);
    }

    //reference submit btn and add click listener
    var submitBtn = document.getElementById('submit').firstChild;
    while(submitBtn.nodeName != 'A') submitBtn = submitBtn.nextSibling;
    submitBtn.addEventListener('click', isWord);

}

function isWord(){
    //reference currentWord
    var currentWordDiv = document.getElementById('currentWord');
    var currentWord = currentWordDiv.innerHTML;

    //reqeust obj
    xmlhttp = createRequest();
    if(xmlhttp != null) {
        xmlhttp.open('GET', encodeURI('lookup-word.php?word=' + currentWord), false);
        xmlhttp.send();

        if(xmlhttp.responseText != -1){

            var wordList = document.getElementById('wordList');

            //create unordered list and append to div wordList
            if(wordList.childNodes.length == 0){
                var ul = document.createElement('ul');
                wordList.appendChild(ul);
            }

            //apprend word to list
            var li = document.createElement('li');
            var textNode = document.createTextNode(currentWord);
            li.appendChild(textNode);

            //apprend list to unordered list
            var ul = wordList.firstChild;
            while(ul.nodeName != 'UL') ul = ul.nextSibling;
            ul.appendChild(li);

            //clear currendWord div
            clearCurrentWord();

            updateScore(xmlhttp.responseText);

        }
        else{
            alert('Sorry not a word');
            currentWordDiv.innerHTML = '';
        }

    }
    else
        alert('Unable to create xmlhttprequest');

}

function updateScore(responseText){
    var scoreDiv = document.getElementById('score');
    var text = scoreDiv.innerHTML.split(' ');
    var score = parseInt(text[1]) + parseInt(responseText);
    scoreDiv.innerHTML = 'Score: ' + score;
}

function clearCurrentWord(){
    document.getElementById('currentWord').innerHTML = '';
}

function randomLetter(){
    return Math.floor(Math.random() * 100);
}

function clickable(tile){
    if(tile.disabled)
        return false;
    else
        return true;
}

function appendLetter(){
    if(clickable(this)){
        var letter = this.className.charAt(this.className.length-1);
        var currentWordDiv = document.getElementById('currentWord');
        var text = currentWordDiv.innerHTML;
        text += letter;
        currentWordDiv.innerHTML = text;

        //disable letter tile
        this.disabled = true;
        this.className = 'disabled';
    }
}