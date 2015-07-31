// Put your Last.fm API key here
var api_key = "0b9c9e61c769da5bb62dd0e36571e97d";

//create request object of type XMLHttpRequest to send request to server
var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var request3 = new XMLHttpRequest();


//Function to display information of an artist
function displayResult1 () {
    if (request1.readyState == 4) {
        /*responseText used to get response from server in string format.
        String format is not easily readable, so JSON.parse() method is used to convert JSON text to JS object which is easy to parse*/
    var jsonI = JSON.parse(request1.responseText); 
    document.getElementById("outputIn").innerHTML = jsonI.artist.name;
    document.getElementById("outputIs").innerHTML = jsonI.artist.bio.summary;
    document.getElementById("outputIu").innerHTML = jsonI.artist.url;
    document.getElementById("outputIp").innerHTML = "<img src = "+jsonI.artist.image[1]['#text']+"></img>";
    }
}

//Function to list of top albums of an artist
function displayResult2 () {
    if (request2.readyState == 4) {
    var jsonTA = JSON.parse(request2.responseText);
    document.getElementById("outputTA1").innerHTML = "List of top 5 albums:"
    for (var i = 0; i < 5; i++)
        {
            document.getElementById("outputTA2").innerHTML += "<br></br>"+jsonTA.topalbums.album[i]['name'] + "<img src="+jsonTA.topalbums.album[i].image[1]['#text']+"/>";
        }
    }
}

//Funtion to get upcoming events of an artist
function displayResult3 () {
    if (request3.readyState == 4) {
    var jsonUE = JSON.parse(request3.responseText);
    document.getElementById("outputUE1").innerHTML = "List of upcoming events:"
    for (var i = 0; i < 5; i++)
        {
            document.getElementById("outputUE2").innerHTML += "<br></br>"+jsonUE.events.event[i].venue.name;
        }
    }
}


function sendRequest () {
    var method1 = "artist.getinfo";
    var method2 = "artist.getTopAlbums";
    var method3 = "artist.getEvents";

    request1.onreadystatechange = displayResult1; //call displayResult method when readyState(has status of XMLHttpRequest) changes
    request2.onreadystatechange = displayResult2;
    request3.onreadystatechange = displayResult3;

    var artist = document.getElementById("form-input").value;  //get the entered value
    //URL created to access Last.fm via API key
    request1.open("GET","proxy.php?method="+method1+"&artist="+artist+"&api_key="+api_key+"&format=json",true); 
    request1.withCredentials = "true";
    request1.send(null);
    request2.open("GET","proxy.php?method="+method2+"&artist="+artist+"&api_key="+api_key+"&format=json",true); 
    request2.withCredentials = "true";
    request2.send(null);
    request3.open("GET","proxy.php?method="+method3+"&artist="+artist+"&api_key="+api_key+"&format=json",true); 
    request3.withCredentials = "true";
    request3.send(null);
}


