
var firData;

var filterGlobalCore = false;
var filterTechnical = false
var filterNonTechnical = false
var minLevel = 1000;
var maxLevel = 4000;
var filterGold = false;
var filterSilver = false;


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

	 jQuery("button").click(function(e){
	 	console.log(e.target.id);
	 	switch (e.target.id) {
	 		case "technical":
	 		if (filterTechnical){
	 			document.getElementById("technical").className = "btn btn-lg col-xs-12";
	 		} else {
	 			document.getElementById("technical").className = "btn btn-lg col-xs-12 glowing";
	 		}
	 		filterTechnical = !filterTechnical;
	 		break;
	 		case "nontechnical":
	 		if (filterNonTechnical){
	 			document.getElementById("nontechnical").className = "btn btn-lg col-xs-12 top15";
	 		} else {
	 			document.getElementById("nontechnical").className = "btn btn-lg col-xs-12 top15 glowing";
	 		}
	 		filterNonTechnical = !filterNonTechnical;
	 		break;
	 		case "globalcore":
	 		if (filterGlobalCore){
	 			document.getElementById("globalcore").className = "btn btn-lg col-xs-12 top15";
	 		} else {
	 			document.getElementById("globalcore").className = "btn btn-lg col-xs-12 top15 glowing";
	 		}
	 		filterGlobalCore = !filterGlobalCore;
	 		break;
	 		case "goldnuggetbtn":
	 		case "goldnuggetimg":
	 		if (filterGold){
	 			document.getElementById("goldnuggetbtn").className = "btn btn-lg col-xs-5 col-xs-push-2";
	 		} else {
	 			document.getElementById("goldnuggetbtn").className = "btn btn-lg col-xs-5 col-xs-push-2 glowing";
	 		}
	 		filterGold = !filterGold;
	 		break;
	 		case "silvernuggetbtn":
	 		case "silvernuggetimg":
	 		if (filterSilver){
	 			document.getElementById("silvernuggetbtn").className = "btn btn-lg col-xs-5 col-xs-push-0";
	 		} else {
	 			document.getElementById("silvernuggetbtn").className = "btn btn-lg col-xs-5 col-xs-push-0 glowing";
	 		}
	 		filterSilver = !filterSilver;
	 		break;
	 		default:
	 	}
	 });

	 jQuery(".dropBtn").click(function(e){
	 	e.preventDefault();
	 	switch (e.target.id) {
	 		case "onekmin": 
	 		minLevel = 1000;
	 		break;
	 		case "twokmin": 
	 		minLevel = 2000;
	 		break;
	 		case "threekmin": 
	 		minLevel = 3000;
	 		break;
	 		case "fourkmin": 
	 		minLevel = 4000;
	 		break;
	 		case "fivekmin": 
	 		minLevel = 5000;
	 		break;
	 		case "sixkmin": 
	 		minLevel = 6000;
	 		break;
	 		case "onekmax": 
	 		maxLevel = 1000;
	 		break;
	 		case "twokmax": 
	 		maxLevel = 2000;
	 		break;
	 		case "threekmax": 
	 		maxLevel = 3000;
	 		break;
	 		case "fourkmax": 
	 		maxLevel = 4000;
	 		break;
	 		case "fivekmax": 
	 		maxLevel = 5000;
	 		break;
	 		case "sixkmax": 
	 		maxLevel = 6000;
	 		break;
	 		default:
	 		alert("The target id is: " + e.target.id + ". This shouldn't happen.");

	 	}
	 	$("#minCover").html(minLevel + "   <span class=\"caret\"></span>");
	 	$("#maxCover").html(maxLevel + "   <span class=\"caret\"></span>");
	 });
	}

	function filter(){
		console.log("started filter");
		var textParam = retrieveElement("textparam");
		if (!textParam) {textParam = "";}
		let arFloor = document.getElementById('myRange').value;
		console.log(arFloor);

		
		var datArr = searchDatabaseForSubstring(textParam);
		if (filterGold || filterSilver){
			datArr = datArr.filter(function(e){
				let name = e["profName"];
				if (filterGold){
					for (var i = 0; i < goldNuggets["professors"].length; i++) {
						let firstName = goldNuggets["professors"][i]["first_name"];
						let lastName = goldNuggets["professors"][i]["last_name"];
						if (name.indexOf(firstName) >= 0 && name.indexOf(lastName) >= 0){
							return true;
						} 
					}
				} 
				if (filterSilver){
					for (var i = 0; i < silverNuggets["professors"].length; i++) {
						let firstName = silverNuggets["professors"][i]["first_name"];
						let lastName = silverNuggets["professors"][i]["last_name"];
						if (name.indexOf(firstName) >= 0 && name.indexOf(lastName) >= 0){
							return true;
						} 
					}
				}
				return false;
			});
		} 
		if (filterGlobalCore){
			datArr = datArr.filter(function(e){
				let id = e["id"].split(' ');
				for (var i = 0; i < globalCores.length; i++) {
					let gcID = globalCores[i];
					if (gcID.indexOf(id[0]) >= 0 && gcID.indexOf(id[1]) >= 0){
						return true;
					} 
				}
				return false;
			});
		}
		if (arFloor > 0){
			datArr = datArr.filter(function(e){
				return e["ar"] > (arFloor);
			});
		}
		if (document.getElementById('levelcheckboxmin').checked) {
			datArr = datArr.filter(function(e){
				let sig = (e["id"].split(' '))[1];
				return Number(sig.charAt(sig.length-4))*1000 >= minLevel;
			});
		}
		if (document.getElementById('levelcheckboxmax').checked) {
			datArr = datArr.filter(function(e){
				let sig = (e["id"].split(' '))[1];
				return Number(sig.charAt(sig.length-4))*1000 <= maxLevel;
			});
		}
		
		console.log("Done!");
		datArr.sort(function(a,b) {
			return (a["ar"] < b["ar"]) ? 1 : ((b["ar"] < a["ar"]) ? -1 : 0);} );
		console.log(datArr);
		setTable(datArr);
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
		for (var i=0; i<18; i++){
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

	function sliderUpdate(){
		let arFloor = document.getElementById('myRange').value;
		$("#sliderSubLabel").html("<xsall>At least <b>" + arFloor + "%</b> of students got As</xsall>");
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
			matching.sort(function(a,b) { return (a["ar"] < b["ar"]) ? 1 : ((b["ar"] < a["ar"]) ? -1 : 0);} );
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
