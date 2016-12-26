var a = 3;

function Hello ()
    {
        console.log("Hey, this is Lahav");
        
    }

function initDatabase(){
	var config = {
    apiKey: "AIzaSyCmlkGhuP4VTZa4a-eAvzJZoopzu2Pqx4M",
    authDomain: "ezacu-716f6.firebaseapp.com",
    databaseURL: "https://ezacu-716f6.firebaseio.com",
    storageBucket: "ezacu-716f6.appspot.com",
    messagingSenderId: "467399916123"
  };
  firebase.initializeApp(config);


 console.log("Database read!");

 var dbRef = firebase.database().ref().child("Statistics");

 dbRef.on('value', function (snap) {
        console.log((snap.val())["Pie"]["Apple"]); // not logging
    });

myFunction();

}

function myFunction() {
    var str = "<thead>";
	str += "<tr class=\"active\">";
	str += "<th>#</th>";
	str += "<th>Professor</th>";
	str += "<th>Course ID</th>";
	str += "<th>Course Name</th>"
	str += "<th>A-Range</th>"
	str += "</tr>"
	str += "</thead>"
	str += "<tbody>";
	for (var i=0; i<5; i++){	
		str += "<tr>";
		str += "<td>1</td>";
		str += "<td>Paul S. Blaer</td>";
		str += "<td>COMS W3134</td>";
		str += "<td>Data Structures and Algorithms</td>";
		str += "<td>41%</td>";
		str += "</tr>";
	}
	str += "</tbody>";

	document.getElementById('datatable').innerHTML = str;
}