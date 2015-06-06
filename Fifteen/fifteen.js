var images = [
    '<img src="images/07.png" alt="7" height="69" width="69">',
    '<img src="images/06.png" alt="6" height="69" width="69">',
    '<img src="images/14.png" alt="14" height="69" width="69">',
    '<img src="images/11.png" alt="11" height="69" width="69">',
    '<img src="images/12.png" alt="12" height="69" width="69">',
    '<img src="images/empty.png" alt="empty" height="69" width="69">',
    '<img src="images/05.png" alt="5" height="69" width="69">',
    '<img src="images/13.png" alt="13" height="69" width="69">',
    '<img src="images/08.png" alt="8" height="69" width="69">',
    '<img src="images/10.png" alt="10" height="69" width="69">',
    '<img src="images/01.png" alt="1" height="69" width="69">',
    '<img src="images/15.png" alt="15" height="69" width="69">',
    '<img src="images/04.png" alt="4" height="69" width="69">',
    '<img src="images/02.png" alt="2" height="69" width="69">',
    '<img src="images/09.png" alt="9" height="69" width="69">',
    '<img src="images/03.png" alt="3" height="69" width="69">'
];

onload = function(){
    //reference table dimensions globally
    var table = document.getElementById('puzzleGrid');
    tableRows = document.getElementsByTagName('tr').length;
    tableCols = document.getElementsByTagName('td').length / tableRows;

    //randomly generate each cell and give every cell click listeners
    var imageleft = images.length;
    var cells = table.getElementsByTagName('td');
    for(var i = 0; i < cells.length; i++){
        var cell = cells[i];

        //randomly select a image
        var index = Math.floor(Math.random() * imageleft);
        cell.innerHTML = images[index];

        //delete the image used
        images.splice(index, 1);

        //decrease num of images
        imageleft--;

        cell.addEventListener('click', swap);

    }

    //find empty cell
    for(var i = 0; i < cells.length; i++){
        var cell = cells[i];
        emptyCell = isEmptyCell(cell) ? cell : null;
        if(emptyCell != null) break;
    }

}

function checkWin(){
    //reference to all imgs
    var images = document.getElementsByTagName('img');

    //traverse images
    var sequence = '';
    for(var i = 0; i < images.length; i++){
        var image = images[i];
        sequence += image.alt;
        if(sequence == '123456789101112131415empty') alert('TOOK YOU LONG ENOUGH');
    }
}

function isEmptyCell(cell){
    //damned whitespace nodes
    for(var i = 0; i < cell.childNodes.length; i++){

        if(cell.childNodes[i].nodeName == 'IMG'){
            if(cell.childNodes[i].alt == 'empty')
                return true;
            else
                console.log('Cell alt: ' + cell.childNodes[i].alt);
        }
        else
            console.log('Node name: '+ cell.childNodes[i].nodeName);
    }
}

function swap(){
    //cell is next to empty cell
    if(validateMove(this.id)){
        //manipulate DOM to swap imgs

        var selectedImage = this.firstChild;
        while(selectedImage.nodeName != 'IMG') selectedImage = selectedImage.nextSibling;

        var emptyImage = emptyCell.firstChild;
        while(emptyImage.nodeName != 'IMG') emptyImage = emptyImage.nextSibling;

        var selectedImageClone = selectedImage.cloneNode(false);
        var emptyImageClone = emptyImage.cloneNode(false);

        this.replaceChild(emptyImageClone, selectedImage);
        emptyCell.replaceChild(selectedImageClone, emptyImage);

        //update empty cell
        emptyCell = this;

        checkWin();
    }
    else
        console.log('Unable to swap with ' + this.id);

}

function validateMove(cell){
    var cellNum = parseInt(cell.charAt(4) + cell.charAt(5));    //selected cell row and col
    var emptyCellLoc = parseInt(emptyCell.id.charAt(4) + emptyCell.id.charAt(5));   //empty cell row and col
    var left=emptyCellLoc-1, down=emptyCellLoc+10, top=emptyCellLoc-10, right=emptyCellLoc+1;   //cells next to  empty cell
    //check if selected cell is next to empty cell
    switch (cellNum){
        case left:
            return true;
        case right:
            return true;
        case top:
            return true;
        case down:
            return true;
        default:
            return false;
    }
}