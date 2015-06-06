onload = function(){

  //find the thumbnails on page
  thumbs = document.getElementById('thumbnailPane').getElementsByTagName('img');

  //set handler for each thumbnail
  for(var i = 0; i < thumbs.length; i++){
      image = thumbs[i];
      image.addEventListener('click', function(){

        //get detail of img when clicked
        detailUrl = 'images/' + this.title + '-detail.jpg';

        //update detailPane with detail of img
        document.getElementById('itemDetail').src = detailUrl;
        getDetails(this.title);
      });
  }
}

function getDetails(itemName){

  //create request obj
  var xmlhttp;
  if(XMLHttpRequest)
      xmlhttp = new XMLHttpRequest();

  //send request to server
  xmlhttp.open('GET', 'getDetails.php?ImageID='+itemName, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
        document.getElementById('description').innerHTML = xmlhttp.responseText;
  }

}