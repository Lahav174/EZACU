
var firData;

function Hello ()
{
	console.log("Hey, this is Lahav");

}

function initDatabase(){
	console.log("Init Database called");
	var config = {
		apiKey: "AIzaSyCmlkGhuP4VTZa4a-eAvzJZoopzu2Pqx4M",
		authDomain: "ezacu-716f6.firebaseapp.com",
		databaseURL: "https://ezacu-716f6.firebaseio.com",
		storageBucket: "ezacu-716f6.appspot.com",
		messagingSenderId: "467399916123"
	};
	firebase.initializeApp(config);

	console.log("Database read!");
	//console.log(firebase.database().ref().child("Departments"));
	 // console.log("The size of the array is " + objArr.length);
	 // console.log("Element 377: " + cleanStr(objArr[377].name));
	 var ref = firebase.database().ref();
	 ref.on("value", function(snapshot) {
	 	this.firData = snapshot.val();
	 });

	 setTable([]);

	 console.log(goldNuggets["professors"].length);

	}

	function filter(){
		console.log("started filter");
		var textParam = retrieveElement("textparam");
		if (!textParam) {textParam = "";}
		var datArr = searchDatabaseForSubstring(textParam);
		console.log(datArr);
		datArr = datArr.filter(function(e){
			let name = e["profName"];
			for (var i = 0; i < goldNuggets["professors"].length; i++) {
				let firstName = goldNuggets["professors"][i]["first_name"];
				let lastName = goldNuggets["professors"][i]["last_name"];
				if (name.indexOf(firstName) >= 0 && name.indexOf(lastName) >= 0){
					return true;
				} 
	 		}
	 		return false;
		});
		console.log(datArr);
		console.log("Done!");
	}


	function setTable(data) {
		//console.log(data.length);
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
		for (var i=0; i<20; i++){
			if (i < data.length){				
				str += "<tr>";
				str += "<td>" + i + "</td>";
				str += "<td>" + data[i]["profName"] + "</td>";
				str += "<td>" + data[i]["id"] + "</td>";
				str += "<td>" + data[i]["courseName"] + "</td>";
				str += "<td class=\"text-center\">" + data[i]["ar"] + "%</td>";
				str += "</tr>";
			} else {
				str += "<tr>";
				str += "<td><img src=\"assets/whiteRect.png\" id=\"nuggetimg\"></td>";
				str += "<td></td>";
				str += "<td></td>";
				str += "<td></td>";
				str += "<td></td>";
				str += "</tr>";
			}
		}
		str += "</tbody>";

		document.getElementById('datatable').innerHTML = str;
	}	 


	function cleanStr(str){
		var preoutput = str.trim();
		preoutput = preoutput.toLowerCase();
		var arr = preoutput.split(' ');
		var output = "";
		for (var i=0;i<arr.length;i++){
			if (arr[i].toLowerCase() != "i" && arr[i].toLowerCase() != "ii" && arr[i].toLowerCase() != "iii" && arr[i].toLowerCase() != "iv"){
				output += " " + arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
			} else {
				output += " " + arr[i].toUpperCase();
			}
		}
		return output.trim();
	}

	function searchChange(){
		var searchText = retrieveElement("searchbar")
		if (searchText.length == 0) {
			$("#tableerror").html("");
			setTable([]);
		} else if (searchText.length < 3){
			$("#tableerror").html("<b>Search must be at least 3 characters long</b>");
			setTable([]);
		} else {
			var matching = searchDatabaseForSubstring(searchText);
			setTable(matching);
			if (matching.length > 0){
				$("#tableerror").html("");
			} else {
				$("#tableerror").html("<b>No results matched your search</b>");
			}
		}

		
	}

	function searchDatabaseForSubstring(substring){
		
		var searchText = substring.toLowerCase();
		var matching = [];
		
		//console.log("Search text changed: " + searchText);
		var depts = Object.keys(firData["Departments"]);
		for (var i = depts.length - 1; i >= 0; i--) {
			if (searchText.length == 0 || (depts[i].toLowerCase()).indexOf(searchText) >= 0){
				var courseSigs = Object.keys(firData["Departments"][depts[i]]);
					for (var j = courseSigs.length - 1; j >= 0; j--) {//A single course now
						var courseNameArrNumbers = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Names"]);
						courseNameArrNumbers.sort(function(a,b) {
							var aVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][a]["count"];
							var bVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][b]["count"];
							return (aVar < bVar) ? 1 : ((bVar < aVar) ? -1 : 0);} );
						let mostPopularCourseName = firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[0]]["name"];
						var profNames = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Professors"]);
						for (var k = profNames.length - 1; k >= 0; k--) {
							var arangeArr = firData["Departments"][depts[i]][courseSigs[j]]["Professors"][profNames[k]];
							var averageArange = 0;
							for (var m = arangeArr.length - 1; m >= 0; m--) {
								averageArange += (arangeArr[m]["arange"]/arangeArr.length);
							}
							var obj = {ar:Math.round(averageArange),courseName:mostPopularCourseName,id:depts[i] + " " + courseSigs[j],profName:profNames[k]};
							matching.push(obj);
						}
					}
				} else {
					var courseSigs = Object.keys(firData["Departments"][depts[i]]);
					for (var j = courseSigs.length - 1; j >= 0; j--) {
						if ((courseSigs[j].toLowerCase()).indexOf(searchText) >= 0){
							var courseNameArrNumbers = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Names"]);
							courseNameArrNumbers.sort(function(a,b) {
								var aVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][a]["count"];
								var bVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][b]["count"];
								return (aVar < bVar) ? 1 : ((bVar < aVar) ? -1 : 0);} );
							let mostPopularCourseName = firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[0]]["name"];
							var profNames = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Professors"]);
							for (var k = profNames.length - 1; k >= 0; k--) {
								var arangeArr = firData["Departments"][depts[i]][courseSigs[j]]["Professors"][profNames[k]];
								var averageArange = 0;
								for (var m = arangeArr.length - 1; m >= 0; m--) {
									averageArange += (arangeArr[m]["arange"]/arangeArr.length);
								}
								var obj = {ar:Math.round(averageArange),courseName:mostPopularCourseName,id:depts[i] + " " + courseSigs[j],profName:profNames[k]};
								matching.push(obj);
							}
						} else {
							var courseNameArrNumbers = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Names"]);
							var foundCourseNameWithSubstring = false;
							for (var n = courseNameArrNumbers.length - 1; n >= 0; n--) {
								if (((firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[n]]["name"]).toLowerCase()).indexOf(searchText) >= 0){
									foundCourseNameWithSubstring = true;
								}
							}
							courseNameArrNumbers.sort(function(a,b) {
								var aVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][a]["count"];
								var bVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][b]["count"];
								return (aVar < bVar) ? 1 : ((bVar < aVar) ? -1 : 0);} );
							let mostPopularCourseName = firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[0]]["name"];
							var profNames = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Professors"]);
							for (var k = profNames.length - 1; k >= 0; k--) {
								if (foundCourseNameWithSubstring || (profNames[k].toLowerCase()).indexOf(searchText) >= 0){
									var arangeArr = firData["Departments"][depts[i]][courseSigs[j]]["Professors"][profNames[k]];
									var averageArange = 0;
									for (var m = arangeArr.length - 1; m >= 0; m--) {
										averageArange += (arangeArr[m]["arange"]/arangeArr.length);
									}
									var obj = {ar:Math.round(averageArange),courseName:mostPopularCourseName,id:depts[i] + " " + courseSigs[j],profName:profNames[k]};
									matching.push(obj);
								}
							}							
						}
					}
				}
			}			
			return matching;
		}

		$("#searchForm").submit(function() {
			return false;
		});

		function submitData(profName,id,name,ar) {
			var idarr = id.split(' ');
			var dept = idarr[0].toUpperCase();
			var courseSig = idarr[1].toUpperCase();
			var courseName = cleanStr(name);

     	if (!(firData["Departments"].hasOwnProperty(dept))){//Dept not found
     		writeData("Departments/" + dept + "/" + courseSig + "/Professors/" + profName,[{arange:ar}]);
     		writeData("Departments/" + dept + "/" + courseSig + "/Names",[{name:courseName,count:1}]);
     		console.log("#1");
     		return;
     	} 

     	var courses = Object.keys(firData["Departments"][dept])
     	for (var i = courses.length - 1; i >= 0; i--) {
     		var c = courses[i];
     		if (c.substring(c.length-4) == courseSig.substring(courseSig.length-4)){//Course id IS found
     			var profs = Object.keys(firData["Departments"][dept][c]["Professors"])
     			var profsWithLev = [];
     			for (var i = profs.length - 1; i >= 0; i--) {
     				profsWithLev.push({prof: profs[i],lev:levDist(profs[i].toLowerCase(),profName.toLowerCase())});
     			}
     			profsWithLev.sort(function(a,b) {return (a.lev > b.lev) ? 1 : ((b.lev > a.lev) ? -1 : 0);} );
     			if (profsWithLev[0].lev > 4) {
     				writeData("Departments/" + dept + "/" + c + "/Professors/" + profName,[{arange:ar}]);
     			} else {
     				var currentArr = firData["Departments"][dept][c]["Professors"][profsWithLev[0].prof];
     				currentArr.push({arange:ar});
     				writeData("Departments/" + dept + "/" + c + "/Professors/" + profsWithLev[0].prof,currentArr);
     			}
     			var usedNames = firData["Departments"][dept][c]["Names"];
     			console.log("#2");
     			for (var i = usedNames.length - 1; i >= 0; i--) {
     				if (usedNames[i]["name"] == courseName){
     					usedNames[i]["count"] = usedNames[i]["count"]+1;
     					writeData("Departments/" + dept + "/" + c + "/Names",usedNames);
     					return;
     				}
     			}
     			usedNames.push({name:courseName,count:1});
     			writeData("Departments/" + dept + "/" + c + "/Names",usedNames);
     			return;
     		}
     	}
     	console.log("#3");
     	//Write full path, since the dept exists but not the course
     	writeData("Departments/" + dept + "/" + courseSig + "/Professors/" + profName,[{arange:ar}]);
     	writeData("Departments/" + dept + "/" + courseSig + "/Names",[{name:courseName,count:1}]);



     }

     function retrieveElement(id) {
     	var txtbox = document.getElementById(id);
     	return txtbox.value;
     }

     function writeData(path,obj) {
     	firebase.database().ref().child(path).set(obj);
     }


var globalCores = ["AFAS UN1001",		
"ANTH UN1008",
"ANTH V1130",		
"ANTH V2013",	
"ANTH V2014",		
"ANTH V2020",		
"ANTH V2027",		
"ANTH V2035",		
"ANTH V2100",
"ANTH UN3300",		
"ANTH V3465",	
"ANTH V3525",		
"ANTH UN3821",	
"ANTH V3892",
"ANTH V2029",		
"ANTH UN3933",	
"ANTH V3947",		
"ANHS W4001",		
"ANTH G4065",		
"AHIS V2600",
"AHIS V3201",	
"AHIS UN2500",		
"AHUM UN2604",
"AHUM UN2802",	
"AHUM UN2901",	
"AHIS W3500",
"AHIS W3898",	
"AHIS UN3501",	
"AHIS Q4570",
"AHIS G4085",	
"AHIS W3832",		
"AFCV UN1020",	
"LACV UN1020",		
"CSER UN1010",		
"CSER W1601",		
"CSER W3510",
"ENGL GU4650",	
"CSER UN3922",	
"CSER UN3926",		
"CSER UN3928",		
"CSER W3961",		
"CLCV UN3059",	
"CLCV W3111",	
"CSGM UN3567",		
"GRKM UN3920",		
"INSM W3920",		
"INSM W3921",		
"INSM C3940",	
"INSM W3950",	
"CPLS W3333",		
"CLGM V3920",		
"CPLS W3945",	
"CPLS W3955",		
"CPLS W3956",		
"CPLS W4100",		
"CPLS GU4111",	
"ASCE UN1002",		
"ASCE UN1359",	
"ASCE UN1361",	
"ASCE UN1363",	
"ASCE UN1365",	
"EAAS UN2342",	
"EAAS UN3322",		
"EAAS V3350",		
"AHUM UN1400",	
"AHUM UN3830",		
"HSEA GU4880",		
"EAAS UN3927",		
"EARL W4127",		
"EAAS W4160",
"EAAS G4160",		
"EAAS W4277",	
"EARL W4310",	
"HSEA GU4822",	
"HSEA W4866",	
"HSEA Q3870",
"HSEA W4870",		
"ECON GU4325",	
"CLEN W4200",	
"ENGL GU4650",
"ENGL W3510",	
"CLFR W3716",		
"GERM UN3780",		
"HIST W1004",		
"HIST W1054",		
"HIST UN2377",	
"HIST UN2444",		
"HIST W2618",
"HIST W3618",	
"HIST UN2657",
"HIST W3657",	
"HIST UN2660",		
"HIST UN2661",		
"HIST W2701",
"HIST W3701",		
"HIST UN2719",
"HIST W3719",	
"HIST W2764",
"HIST W3764",		
"HIST W2772",
"HIST W3772",		
"HIST W2880",
"HIST W3800",	
"HIST W2803",
"HIST W3803",		
"HSME UN2810",
"HSME W3810",	
"HIST UN2811",		
"HIST UN3152",		
"HIST UN3766",	
"HSEA UN3898",		
"HIST Q2900",
"HIST W3902",	
"HIST W2903",
"HIST W2903",		
"HIST W2943",
"HIST W3943",		
"HIST Q3933",
"HIST W4103",	
"HIST Q3400",
"HIST W4404",	
"HIST W4601",		
"HIST W3678",
"HIST W4678",		
"HIST UN3779",		
"SPAN UN3349",	
"PORT UN3350",		
"SPAN UN3350",		
"SPAN UN3361",	
"SPAN W3490",		
"SPAN W3491",		
"AHUM UN1399",
"AHUM UN3399",	
"ASCM V2001",		
"ASCM UN2003",		
"ASCM UN2008",		
"MDES W2030",
"ANTH V2010",		
"MDES W2041",	
"ASCM UN2357",		
"MDES W2650",	
"MDES UN3000",		
"CLME W3032",	
"MDES UN3121",		
"MDES UN3130",		
"MDES W3445",		
"CLME UN3928",	
"CLME W4031",	
"MDES G4052",	
"MDES GU4150",		
"CLME GU4231",		
"CLME GU4241",		
"CLME G4261",	
"MDES G4326",		
"MUSI V2020",		
"MUSI V2430",
"MUSI W4430",	
"AHMM UN3320",	
"AHMM UN3321",		
"MUSI GU4466",		
"RELI UN2205",		
"RELI UN2305",		
"RELI UN2308",	
"RELI UN3303",		
"RELI V2309",
"RELI V2205",	
"RELI UN2307",		
"RELI V2335",
"RELI V2645",		
"RELI UN3357",	
"RELI UN3407",
"RELI V3307",		
"RELI UN3425",	
"RELI Q3511",
"RELI V3411",		
"SLCL UN3001",	
"CLRS W4022",		
"GEOR GU4042",		
"CLRS W4190",		
"SOCI W3324",	
"THTR UN3000"];












//Taken from http://stackoverflow.com/a/11958496/5057543
function levDist(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
for (var i = n; i >= 0; i--) d[i][0] = i;
	for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
for (var i = 1; i <= n; i++) {
	var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
            	d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    // Step 7
    return d[n][m];
}


//WILL USE LATER


