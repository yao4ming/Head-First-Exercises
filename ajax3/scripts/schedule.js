var onwelcomePane = true;

onload = function(){

    //obtain reference to tab and navigation
    var divs = document.getElementById('schedulePane').getElementsByTagName('div');

    //separate tab and nav
    for(var i = 0; i < divs.length; i++) {
        var div = divs[i];

        if(div.id == 'navigation'){
            var navs = div.getElementsByTagName('a');

            //add event handler for each nav
            for(var j = 0; j < navs.length; j++){
                nav = navs[j];
                nav.addEventListener('mouseover', animate);
                nav.addEventListener('mouseout', stopanimate);
            }
        }

        if(div.id == 'tabs'){
            var tabs = div.getElementsByTagName('a');

            //add event handler for each tab
            for(var j = 0; j < tabs.length; j++){
                var tab = tabs[j];
                tab.addEventListener('click', showTab);
            }
        }

    }

}

var interval = null;   //global var to for clearinterval
function animate(){

    var selectedNav = this;
    switch(selectedNav.title){
        case 'beginners':
            //stop previous animation
            if(interval)
                clearInterval(interval);

            //switch between active and inactive img
            interval = setInterval(function(){
                if(selectedNav.className == '')
                    selectedNav.className = 'active';
                else
                    selectedNav.className = '';
            }, 1000);
            break;
        case 'intermediate':
            //stop previous animation
            if(interval)
                clearInterval(interval);

            //switch between active and inactive img
            interval = setInterval(function(){
                if(selectedNav.className == '')
                    selectedNav.className = 'active';
                else
                    selectedNav.className = '';
            }, 1000);
            break;
        case 'advanced':
            //stop previous animation
            if(interval)
                clearInterval(interval);

            //switch between active and inactive img
            interval = setInterval(function(){
                if(selectedNav.className == '')
                    selectedNav.className = 'active';
                else
                    selectedNav.className = '';
            }, 1000);
            break;
        default:
            alert(selectedNav);
    }

}

function stopanimate(){
    clearInterval(interval);
}

//change contentPane
function showTab(){

    if(this.title == 'welcome'){
        onwelcomePane = true;
        document.getElementById("content").innerHTML =
            "<h3>Click a tab to display the course schedule for the class</h3>";
    }
    else{
        onwelcomePane = false;

        //obtain reference to all tabs
        var tabs = document.getElementById('tabs').getElementsByTagName('a');
        for(var i = 0; i < tabs.length; i++){
            var tab = tabs[i];

            //active selected tab
            if(this.title === tab.title)
                this.className = 'active';
            else
                tab.className = 'inactive';
        }

        //request class schedule for selected tab
        xmlhttp = createRequest();
        if(xmlhttp){
            xmlhttp.open('GET', this.title + '.html', true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    document.getElementById('content').innerHTML = xmlhttp.responseText;
                }
            }
        }
        else
            alert('cannot ajax');
    }



}