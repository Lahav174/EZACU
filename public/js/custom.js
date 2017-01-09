
var firData;

var savedSearch = "nil";
var numBackspace = 0;

var filterGlobalCore = false;
var filterTechnical = false;
var filterNonTechnical = false;
var minLevel = 1000;
var maxLevel = 4000;
var filterGold = false;
var filterSilver = false;

var tableData = [];
var pageNumber = 0;

var leftPageEnabled = false;
var rightPageEnabled = false;

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
	
	document.getElementById("submitquery").disabled = true;

	var ref = firebase.database().ref();
	ref.on("value", function(snapshot) {
		this.firData = snapshot.val();
		document.getElementById("submitquery").disabled = false;
	});

	setTable(0,[]);

	jQuery("button").click(function(e){
	 	//console.log(e.target.id);
	 	switch (e.target.id) {
	 		case "technical":
	 		if (filterTechnical){
	 			document.getElementById("technical").className = "btn btn-lg col-xs-12";
	 		} else {
	 			document.getElementById("technical").className = "btn btn-lg col-xs-12 glowing";
	 		}
	 		filterTechnical = !filterTechnical;
	 		filterNonTechnical = false;
	 		document.getElementById("nontechnical").className = "btn btn-lg col-xs-12 top15";
	 		filterGlobalCore = false;
	 		document.getElementById("globalcore").className = "btn btn-lg col-xs-12 top15";
	 		break;
	 		case "nontechnical":
	 		if (filterNonTechnical){
	 			document.getElementById("nontechnical").className = "btn btn-lg col-xs-12 top15";
	 		} else {
	 			document.getElementById("nontechnical").className = "btn btn-lg col-xs-12 top15 glowing";
	 		}
	 		filterNonTechnical = !filterNonTechnical;
	 		filterTechnical = false;
	 		document.getElementById("technical").className = "btn btn-lg col-xs-12";
	 		filterGlobalCore = false;
	 		document.getElementById("globalcore").className = "btn btn-lg col-xs-12 top15";
	 		break;
	 		case "globalcore":
	 		if (filterGlobalCore){
	 			document.getElementById("globalcore").className = "btn btn-lg col-xs-12 top15";
	 		} else {
	 			document.getElementById("globalcore").className = "btn btn-lg col-xs-12 top15 glowing";
	 		}
	 		filterGlobalCore = !filterGlobalCore;
	 		filterTechnical = false;
	 		document.getElementById("technical").className = "btn btn-lg col-xs-12";
	 		filterNonTechnical = false;
	 		document.getElementById("nontechnical").className = "btn btn-lg col-xs-12 top15";
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

	window.addEventListener("beforeunload", function(e){
		var searchBarText = retrieveElement("searchbar");
		if (searchBarText.length > 3){
			writeData("Statistics/Searches/" + Date.now(),searchBarText);
		}
	}, false);

	return firebase.database().ref().child("Statistics").once('value').then(function(snapshot) {
		var data = snapshot.val();
		var toWrite = data["Visits"];
		writeData("Statistics/Visits",toWrite+1);
	});
}

function filter(){
	console.log("started filter");
	var textParam = retrieveElement("textparam");
	if (!textParam) {textParam = "";}
	var arFloor = document.getElementById('myRange').value;
	console.log(arFloor);


	var datArr = searchDatabaseForSubstring(textParam);
	if (filterGold || filterSilver){
		datArr = datArr.filter(function(e){
			var name = e["profName"];
			if (filterGold){
				for (var i = 0; i < goldNuggets["professors"].length; i++) {
					var firstName = goldNuggets["professors"][i]["first_name"];
					var lastName = goldNuggets["professors"][i]["last_name"];
					if (name.indexOf(firstName) >= 0 && name.indexOf(lastName) >= 0){
						return true;
					} 
				}
			} 
			if (filterSilver){
				for (var i = 0; i < silverNuggets["professors"].length; i++) {
					var firstName = silverNuggets["professors"][i]["first_name"];
					var lastName = silverNuggets["professors"][i]["last_name"];
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
			var id = e["id"].split(' ');
			for (var i = 0; i < globalCores.length; i++) {
				var gcID = globalCores[i];
				if (gcID.indexOf(id[0]) >= 0 && gcID.indexOf(id[1]) >= 0){
					return true;
				} 
			}
			return false;
		});
	}
	if (filterTechnical){
		datArr = datArr.filter(function(e){
			var id = e["id"].split(' ');
			return $.inArray(id[0], techs) != -1;
		});
	}
	if (filterNonTechnical){
		datArr = datArr.filter(function(e){
			var id = e["id"].split(' ');
			return $.inArray(id[0], nontechs) != -1;
		});
	}
	if (arFloor > 0){
		datArr = datArr.filter(function(e){
			return e["ar"] > (arFloor);
		});
	}
	if (document.getElementById('levelcheckboxmin').checked) {
		datArr = datArr.filter(function(e){
			var sig = (e["id"].split(' '))[1];
			return Number(sig.charAt(sig.length-4))*1000 >= minLevel;
		});
	}
	if (document.getElementById('levelcheckboxmax').checked) {
		datArr = datArr.filter(function(e){
			var sig = (e["id"].split(' '))[1];
			return Number(sig.charAt(sig.length-4))*1000 <= maxLevel;
		});
	}

	console.log("Done!");
	datArr.sort(function(a,b) {
		return (a["ar"] < b["ar"]) ? 1 : ((b["ar"] < a["ar"]) ? -1 : 0);} );
		//console.log(datArr);
		setTable(0,datArr);
		$("#searchres").html("<font color=\"grey\"><b>("+ datArr.length +" Results)</b></font>");

		if (datArr.length > 0){
			$("#tableerror").html("");
		} else {
			$("#tableerror").html("<b>No results matched your search</b>");
		}

		return firebase.database().ref().child("Statistics").once('value').then(function(snapshot) {
			var data = snapshot.val();
			var toWrite = data["Search-Queries"];
			writeData("Statistics/Search-Queries",toWrite+1);
		});
	}

	function nextPage() {
		if (rightPageEnabled){
			pageNumber++;
			setTable(pageNumber,tableData);
		}
	}

	function lastPage() {
		if (leftPageEnabled){
			pageNumber--;
			setTable(pageNumber,tableData);
		}
	}

	function setTable(page,data) {
		var coursesPerPage = 16;

		if (rightPageEnabled = (data.length > coursesPerPage*(page+1))){
			$("#rightarrow").html("<img src=\"assets/rightpage.png\" style=\"height:20px;\">");
		} else {
			$("#rightarrow").html("<img src=\"assets/rightpagedis.png\" style=\"height:20px;\">");
		}
		if (leftPageEnabled = (page != 0)){
			$("#leftarrow").html("<img src=\"assets/leftpage.png\" style=\"height:20px;\">");
		} else {
			$("#leftarrow").html("<img src=\"assets/leftpagedis.png\" style=\"height:20px;\">");
		}
		tableData = data;
		pageNumber = page;
		$("#pagenum").html("Page " + (page+1));
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
		var maxProfLen = 27;
		var maxCourseLen = 35;
		for (var i=page*coursesPerPage; i<coursesPerPage*(page+1); i++){
			if (i < data.length){				
				str += "<tr>";
				str += "<td>" + (i+1) + "</td>";
				if (data[i]["profName"].length < maxProfLen){
					str += "<td>" + data[i]["profName"] + "</td>";
				} else {
					str += "<td>" + data[i]["profName"].substring(0,maxProfLen-2) + "...</td>";
				}
				str += "<td>" + data[i]["id"] + "</td>";
				if (data[i]["courseName"].length < maxCourseLen){
					str += "<td>" + data[i]["courseName"] + "</td>";
				} else {
					str += "<td>" + data[i]["courseName"].substring(0,maxCourseLen-2) + "...</td>";
				}
				if ((data[i]["ar"]*100)%100 > 0){
					str += "<td class=\"text-center\">" + Math.floor(data[i]["ar"]) + "% &plusmn " + Math.round((data[i]["ar"]*100)%100) + "%</td>";
				} else {
					str += "<td class=\"text-center\">" + data[i]["ar"] + "%</td>";
				}
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
		var arFloor = document.getElementById('myRange').value;
		$("#sliderSubLabel").html("<xsall>At least <b>" + arFloor + "%</b> of students got As</xsall>");
	}

	function searchKeyDown(){	
		var input = document.getElementById('searchbar');
		var key = event.keyCode || event.charCode;
		if (key == 8 && numBackspace == 0){
			savedSearch = (retrieveElement("searchbar")).trim();
			numBackspace++;
		} else if (key == 8 && numBackspace != 2){
			numBackspace++;
		} else if (key == 8 && numBackspace == 2){
			if (savedSearch.length > 3){
				writeData("Statistics/Searches/" + Date.now(),savedSearch);
			}
			numBackspace++;
		} else {
			numBackspace = 0;
		}
	}

	function searchChange(){
		var searchText = retrieveElement("searchbar")
		if (searchText.length == 0) {
			$("#tableerror").html("");
			setTable(0,[]);
			$("#searchres").html("<font color=\"grey\"><b>Search Results</b></font>");
		} else if (searchText.length < 3){
			$("#tableerror").html("<b>Search must be at least 3 characters long</b>");
			setTable(0,[]);
			$("#searchres").html("<font color=\"grey\"><b>Search Results</b></font>");
		} else {
			var matching = searchDatabaseForSubstring(searchText);
			matching.sort(function(a,b) { return (a["ar"] < b["ar"]) ? 1 : ((b["ar"] < a["ar"]) ? -1 : 0);} );
			setTable(0,matching);
			$("#searchres").html("<font color=\"grey\"><b>("+ matching.length +" Results)</b></font>");
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
						var mostPopularCourseName = firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[0]]["name"];
						var profNames = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Professors"]);
						for (var k = profNames.length - 1; k >= 0; k--) {
							var arangeArr = firData["Departments"][depts[i]][courseSigs[j]]["Professors"][profNames[k]];
							var averageArange = 0;
							var arArr = [];
							for (var m = arangeArr.length - 1; m >= 0; m--) {
								averageArange += (arangeArr[m]["arange"]/arangeArr.length);
								arArr.push(arangeArr[m]["arange"]);
							}
							var min = Math.min.apply(Math,arArr);
							var max = Math.max.apply(Math,arArr);
							var intAv = Math.round(averageArange);
							var obj = {ar:intAv+(Math.max(intAv-min,max-intAv))*0.01,courseName:mostPopularCourseName,id:depts[i] + " " + courseSigs[j],profName:profNames[k]};
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
							var mostPopularCourseName = firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[0]]["name"];
							var profNames = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Professors"]);
							for (var k = profNames.length - 1; k >= 0; k--) {
								var arangeArr = firData["Departments"][depts[i]][courseSigs[j]]["Professors"][profNames[k]];
								var averageArange = 0;
								var arArr = [];
								for (var m = arangeArr.length - 1; m >= 0; m--) {
									averageArange += (arangeArr[m]["arange"]/arangeArr.length);
									arArr.push(arangeArr[m]["arange"]);
								}
								var min = Math.min.apply(Math,arArr);
								var max = Math.max.apply(Math,arArr);
								var intAv = Math.round(averageArange);
								var obj = {ar:intAv+(Math.max(intAv-min,max-intAv))*0.01,courseName:mostPopularCourseName,id:depts[i] + " " + courseSigs[j],profName:profNames[k]};
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
							var mostPopularCourseName = firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[0]]["name"];
							var profNames = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Professors"]);
							for (var k = profNames.length - 1; k >= 0; k--) {
								if (foundCourseNameWithSubstring || (profNames[k].toLowerCase()).indexOf(searchText) >= 0){
									var arangeArr = firData["Departments"][depts[i]][courseSigs[j]]["Professors"][profNames[k]];
									var averageArange = 0;
									var arArr = [];
									for (var m = arangeArr.length - 1; m >= 0; m--) {
										averageArange += (arangeArr[m]["arange"]/arangeArr.length);
										arArr.push(arangeArr[m]["arange"]);
									}
									var min = Math.min.apply(Math,arArr);
									var max = Math.max.apply(Math,arArr);
									var intAv = Math.round(averageArange);
									var obj = {ar:intAv+(Math.max(intAv-min,max-intAv))*0.01,courseName:mostPopularCourseName,id:depts[i] + " " + courseSigs[j],profName:profNames[k]};
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








		function submitButtonPressed(){

			var courseID = retrieveElement("course-id");
			
			var splitID = courseID.split(' ');


			var courseName = retrieveElement("course-name");
			var profName = retrieveElement("prof-name");
			var aRange = retrieveElement("a-range");

			if (splitID.length != 2 || (splitID[1].length != 4 && splitID[1].length != 5) || 
				(splitID[0].length != 3 && splitID[0].length != 4)){
				$("#submissionerror").html("Please enter the course ID in the correct format");
			return;
		} 

		if ((courseName.split(' ')).length < 2){
			$("#submissionerror").html("Please enter the course name exactly as it is shown");
			return;
		} 
		if ((profName.split(' ')).length < 2){
			$("#submissionerror").html("Please enter the professor's name exactly as it is shown");
			return;
		} 
		if (aRange.length == 0 || !($.isNumeric(aRange)) || Number(aRange) < 0 || Number(aRange) > 100){
			$("#submissionerror").html("Please enter the A-Range in the correct format");
			return;
		}

		$("#submissionerror").html("");

		var date = new Date();
		var dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();
		submitData(profName,courseID,courseName,aRange,dateStr);

		$("#submitdataform")[0].reset();

		return firebase.database().ref().child("Statistics").once('value').then(function(snapshot) {
			var data = snapshot.val();
			var submissions = data["Submissions"];
			writeData("Statistics/Submissions",submissions+1);
		});
		
	}




	

	function submitData(pname,id,name,ar,datestr) {
		var idarr = id.split(' ');
		var dept = idarr[0].toUpperCase();
		var courseSig = idarr[1].toUpperCase();
		var courseName = cleanStr(name);
		var profName = cleanStr(pname);

		var subVerbArr = firData["Statistics"]["Submissions-Verb"];
		subVerbArr.push(dept + " " + courseSig + " - " + courseName + " | " + profName + " >> (" + ar + "%)");
		writeData("Statistics/Submissions-Verb",subVerbArr);

     	if (!(firData["Departments"].hasOwnProperty(dept))){//Dept not found
     		writeData("Departments/" + dept + "/" + courseSig + "/Professors/" + profName,[{arange:ar,date:datestr}]);
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
     				writeData("Departments/" + dept + "/" + c + "/Professors/" + profName,[{arange:ar,date:datestr}]);
     			} else {
     				var currentArr = firData["Departments"][dept][c]["Professors"][profsWithLev[0].prof];
     				currentArr.push({arange:ar,date:datestr});
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
     	writeData("Departments/" + dept + "/" + courseSig + "/Professors/" + profName,[{arange:ar,date:datestr}]);
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

function checkEnter(e) {
	if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that rusn
            filter();
        }
}
