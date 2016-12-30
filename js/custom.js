
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

	}


	function setTable(data) {
		console.log(data.length);
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
				str += "<td>" + data[i]["ar"] + "%</td>";
				str += "</tr>";
			} else {
				str += "<tr>";
				str += "<td></td>";
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
		searchText = searchText.toLowerCase();
		var matching = [];
		if (searchText.length < 3){
			setTable(matching);
		} else {
			console.log("Search text changed: " + searchText);
			var depts = Object.keys(firData["Departments"]);
			for (var i = depts.length - 1; i >= 0; i--) {
				if ((depts[i].toLowerCase()).indexOf(searchText) >= 0){
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
							courseNameArrNumbers.sort(function(a,b) {
								var aVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][a]["count"];
								var bVar = firData["Departments"][depts[i]][courseSigs[j]]["Names"][b]["count"];
								return (aVar < bVar) ? 1 : ((bVar < aVar) ? -1 : 0);} );
							let mostPopularCourseName = firData["Departments"][depts[i]][courseSigs[j]]["Names"][courseNameArrNumbers[0]]["name"];
							var profNames = Object.keys(firData["Departments"][depts[i]][courseSigs[j]]["Professors"]);
							for (var k = profNames.length - 1; k >= 0; k--) {
								if ((profNames[k].toLowerCase()).indexOf(searchText) >= 0){
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
			setTable(matching);
		}

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


/*
     var objArr = [{prof: "Nam Le",id: "MATH W4065",name: "HONORS COMPLEX VARIABLES",   ar: "67"},
     {prof: "Miklos Gyulassy",id: "PHYS G6037",name: "QUANTUM MECHANICS I",   ar: "52"},
     {prof: "Allan Blaer",id: "PHYS G6092",name:" ELECTROMAGNETIC THEORY",   ar: "57"},
     {prof: "Patricia Kitcher",id: "COCI C1102",name:" CONTEMP WESTERN CIVILIZATION II",   ar: "48"},
     {prof: "Turkuler Isiksel",id: "POLS W3125",name:" CITIZENSHIP & EXCLUSION",   ar: "39"},
     {prof: "Mu-Tao Wang",id: "MATH W4081",name:" INTRO-DIFFERENTIABLE MANIFOLDS",   ar: "43"},
     {prof: "Robert Thurman",id: "RELI V2005",name:" BUDDHISM: INDO-TIBETAN",   ar: "62"},
     {prof: "Lam Hui",id: "PHYS G6047",name:" QUANTUM FIELD THEORY I",   ar: "50"},
     {prof: "Robert Jervis",id: "POLS V1601",name:" INTERNATIONAL POLITICS",   ar: "25"},
     {prof: "Tom Yarnall",id: "RELI V3000",name:" BUDDHIST ETHICS",   ar: "64"},
     {prof: "Marco Pagnotta",id: "CHEM C1403",name:" GENERAL CHEMISTRY I-LECTURES",   ar: "26"},
     {prof: "Dorian Warren",id: "POLS W3202",name:" Labor & American Politics",   ar: "53"},
     {prof: "Mary Grace Albanese",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "57"},
     {prof: "Sarah Hansen",id: "CHEM W1500",name:" GENERAL CHEMISTRY LABORATORY",   ar: "55"},
     {prof: "Jon Williams",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECES I",   ar: "86"},
     {prof: "Claire Catenaccio",id: "LATN V1201",name:" INTERMEDIATE LATIN I",   ar: "50"},
     {prof: "Xiaodong Wang",id: "ELEN E3801",name:" SIGNALS AND SYSTEMS",   ar: "26"},
     {prof: "Dirk Englund",id: "ELEN E4411",name:" FUNDAMENTALS OF PHOTONICS",   ar: "71"},
     {prof: "Adam Cannon",id: "COMS W1001",name:" INTRO TO INFORMATION SCIENCE",   ar: "33"},
     {prof: "Lee Bollinger",id: "POLS W3288",name:" A FREE PRESS FOR A GLOBAL SOCIETY",   ar: "29"},
     {prof: "Erik Gray",id: "ENGL W3001",name:" LITERARY TEXTS AND CRITICAL METHODS",   ar: "68"},
     {prof: "Andrew Nathan",id: "HRTS W3001",name:" INTRODUCTION TO HUMAN RIGHTS",   ar: "56"},
     {prof: "David Sidorsky",id: "PHIL V3751",name:" POLITICAL PHILOSOPHY",   ar: "67"},
     {prof: "Timothy Frye",id: "POLS V1501",name:" INTRODUCTION TO COMPARATIVE POLITICS",   ar: "36"},
     {prof: "Timothy Frye",id: "POLS V1501",name:" INTRODUCTION TO COMPARATIVE POLITICS",   ar: "36"},
     {prof: "Erik Gray",id: "ENGL W4402",name:" ROMANTIC POETRY",   ar: "49"},
     {prof: "Daniel Rubenstein",id: "CSEE W3827",name:" FUNDAMENTALS OF COMPUTER SYSTEMS",   ar: "24"},
     {prof: "Timothy Frye",id: "POLS V1501",name:" INTRODUCTION TO COMPARATIVE POLITICS",   ar: "36"},
     {prof: "David Johnston",id: "POLS W3100",name:" JUSTICE",   ar: "33"},
     {prof: "Xavier Sala-i-Martin",id: "ECON W3213",name:" INTERMEDIATE MACROECONOMICS",   ar: "43"},
     {prof: "Susan Elmes",id: "ECON W3211",name:" INTERMEDIATE MICROECONOMICS",   ar: "33"},
     {prof: "Seyhan Arkonac",id: "ECON W3412",name:" INTRODUCTION TO ECONOMETRICS",   ar: "36"},
     {prof: "Evan Neely",id: "COCI F1102",name:" CONTEMP WESTRN CIVILIZATION II",   ar: "73"},
     {prof: "Rashid Khalidi",id: "HIST W3719",name:" HISTORY OF THE MOD MIDDLE EAST",   ar: "51"},
     {prof: "Sunil Gulati",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "26"},
     {prof: "Adam Cannon",id: "COMS W1004",name:" INTRO COMP SCI/PROGRAM- JAVA",   ar: "29"},
     {prof: "Kate Ho",id: "ECON W4251",name:" INDUSTRIAL ORGANIZATION",   ar: "38"},
     {prof: "Axel Honneth",id: "PHIL V3353",name:" EUROPEAN SOCIAL THOUGHT",   ar: "33"},
     {prof: "Axel Honneth",id: "PHIL V3353",name:" EUROPEAN SOCIAL THOUGHT",   ar: "44"},
     {prof: "Mark Lilla",id: "HUMA C1001",name:" LIT HUM",   ar: "64"},
     {prof: "Michele Moody-Adams",id: "PHIL V3752",name:" PHILOSOPHY OF LAW",   ar: "44"},
     {prof: "Anna Catarina Musatti",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "29"},
     {prof: "Taylor Carman",id: "PHIL V3352",name:" 20TH CEN EUROPEAN PHILOSOPHY",   ar: "30"},
     {prof: "Nam Le",id: "MATH V1201",name:" CALCULUS III",   ar: "35"},
     {prof: "Sunil Gulati",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "31"},
     {prof: "Kenneth Jackson",id: "HIST W3535",name:" HIST OF THE CITY OF NEW YORK",   ar: "51"},
     {prof: "Sunil Gulati",id: "ECON W3213",name:" THE GLOBAL ECONOMY",   ar: "29"},
     {prof: "John Kender",id: "COMS W1007",name:" HONORS INTRO TO COMPUTER SCI",   ar: "36"},
     {prof: "Seyhan Arkonac",id: "ECON W3412",name:" INTRODUCTION TO ECONOMETRICS",   ar: "33"},
     {prof: "Peter Awn",id: "HUMA F1001",name:" EURPN LIT-PHILOS MASTERPIECES I",   ar: "75"},
     {prof: "Jae Lee",id: "COMS W3157",name:" ADVANCED PROGRAMMING",   ar: "52"},
     {prof: "Marc Masdeu",id: "MATH V2010",name:" LINEAR ALGEBRA",   ar: "36"},
     {prof: "Mercedes PerÃ©z Serrano",id: "SPAN W1101",name:" ELEMENTARY SPANISH I",   ar: "13"},
     {prof: "Mercedes PerÃ©z Serrano",id: "SPAN W1102",name:" ELEMENTARY SPANISH II",   ar: "31"},
     {prof: "Marcel Nutz",id: "MATH V1201",name:" CALCULUS II",   ar: "43"},
     {prof: "Emma Lieber",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "45"},
     {prof: "Kyoko Loetscher",id: "JPNS C1101",name:" FIRST YEAR JAPANESE I",   ar: "87"},
     {prof: "Allyson Sheffield",id: "SCNC C1001",name:" FRONTIERS OF SCIENCE",   ar: "48"},
     {prof: "Lindsay Gibson",id: "ENGL C1012",name:" UNIVERSITY WRITING: GENDER",   ar: "86"},
     {prof: "Shigeru Eguchi",id: "JPNS C1102",name:" FIRST YEAR JAPANESE II",   ar: "65"},
     {prof: "Mark Lilla",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "67"},
     {prof: "Terence D'Altroy",id: "ANTH V1008",name:" THE RISE OF CIVILIZATION",   ar: "28"},
     {prof: "Sunil Gulati",id: "ECON W1005",name:" PRINCIPLES OF ECONOMICS",   ar: "26"},
     {prof: "Emma Lieber",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "41"},
     {prof: "Xiaodong Wang",id: "ELEN E3801",name:" SIGNALS AND SYSTEMS",   ar: "26"},
     {prof: "Dirk Englund",id: "ELEN E4411",name:" FUNDAMENTALS OF PHOTONICS",   ar: "71"},
     {prof: "Adam Cannon",id: "COMS W1001",name:" INTRO TO INFORMATION SCIENCE",   ar: "33"},
     {prof: "Lee Bollinger",id: "POLS W3288",name:" A FREE PRESS FOR A GLOBAL SOCIETY",   ar: "29"},
     {prof: "Erik Gray",id: "ENGL W3001",name:" LITERARY TEXTS AND CRITICAL METHODS",   ar: "68"},
     {prof: "Andrew Nathan",id: "HRTS W3001",name:" INTRODUCTION TO HUMAN RIGHTS",   ar: "56"},
     {prof: "David Sidorsky",id: "PHIL V3751",name:" POLITICAL PHILOSOPHY",   ar: "67"},
     {prof: "Timothy Frye",id: "POLS V1501",name:" INTRODUCTION TO COMPARATIVE POLITICS",   ar: "36"},
     {prof: "Timothy Frye",id: "POLS V1501",name:" INTRODUCTION TO COMPARATIVE POLITICS",   ar: "36"},
     {prof: "Erik Gray",id: "ENGL W4402",name:" ROMANTIC POETRY",   ar: "49"},
     {prof: "Daniel Rubenstein",id: "CSEE W3827",name:" FUNDAMENTALS OF COMPUTER SYSTEMS",   ar: "24"},
     {prof: "Timothy Frye",id: "POLS V1501",name:" INTRODUCTION TO COMPARATIVE POLITICS",   ar: "36"},
     {prof: "David Johnston",id: "POLS W3100",name:" JUSTICE",   ar: "33"},
     {prof: "Axel Honneth",id: "PHIL V3353",name:" EUROPEAN SOCIAL THOUGHT",   ar: "33"},
     {prof: "Axel Honneth",id: "PHIL V3353",name:" EUROPEAN SOCIAL THOUGHT",   ar: "44"},
     {prof: "Mark Lilla",id: "HUMA C1001",name:" LIT HUM",   ar: "64"},
     {prof: "Michele Moody-Adams",id: "PHIL V3752",name:" PHILOSOPHY OF LAW",   ar: "44"},
     {prof: "Anna Catarina Musatti",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "29"},
     {prof: "Taylor Carman",id: "PHIL V3352",name:" 20TH CEN EUROPEAN PHILOSOPHY",   ar: "30"},
     {prof: "Nam Le",id: "MATH V1201",name:" CALCULUS III",   ar: "35"},
     {prof: "Sunil Gulati",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "31"},
     {prof: "Kenneth Jackson",id: "HIST W3535",name:" HIST OF THE CITY OF NEW YORK",   ar: "51"},
     {prof: "Sunil Gulati",id: "ECON W3213",name:" THE GLOBAL ECONOMY",   ar: "29"},
     {prof: "John Kender",id: "COMS W1007",name:" HONORS INTRO TO COMPUTER SCI",   ar: "36"},
     {prof: "Seyhan Arkonac",id: "ECON W3412",name:" INTRODUCTION TO ECONOMETRICS",   ar: "33"},
     {prof: "Peter Awn",id: "HUMA F1001",name:" EURPN LIT-PHILOS MASTERPIECES I",   ar: "75"},
     {prof: "Jae Lee",id: "COMS W3157",name:" ADVANCED PROGRAMMING",   ar: "52"},
     {prof: "Marc Masdeu",id: "MATH V2010",name:" LINEAR ALGEBRA",   ar: "36"},
     {prof: "maria lozano",id: "SPAN W1202",name:" INTERMEDIATE SPANISH II",   ar: "69"},
     {prof: "Mercedes PerÃ©z Serrano",id: "SPAN W1101",name:" ELEMENTARY SPANISH I",   ar: "13"},
     {prof: "Mercedes PerÃ©z Serrano",id: "SPAN W1102",name:" ELEMENTARY SPANISH II",   ar: "31"},
     {prof: "Marcel Nutz",id: "MATH V1201",name:" CALCULUS II",   ar: "43"},
     {prof: "Emma Lieber",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "45"},
     {prof: "Kyoko Loetscher",id: "JPNS C1101",name:" FIRST YEAR JAPANESE I",   ar: "87"},
     {prof: "Allyson Sheffield",id: "SCNC C1001",name:" FRONTIERS OF SCIENCE",   ar: "48"},
     {prof: "Lindsay Gibson",id: "ENGL C1012",name:" UNIVERSITY WRITING: GENDER",   ar: "86"},
     {prof: "Shigeru Eguchi",id: "JPNS C1102",name:" FIRST YEAR JAPANESE II",   ar: "65"},
     {prof: "Mark Lilla",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "67"},
     {prof: "Terence D'Altroy",id: "ANTH V1008",name:" THE RISE OF CIVILIZATION",   ar: "28"},
     {prof: "Sunil Gulati",id: "ECON W1005",name:" PRINCIPLES OF ECONOMICS",   ar: "26"},
     {prof: "Emma Lieber",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "41"},
     {prof: "Alexis Soloski",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECES I",   ar: "43"},
     {prof: "Alexander Drewitz",id: "MATH V1102",name:" CALCULUS II",   ar: "39"},
     {prof: "Adam Cannon",id: "COMS 1004",name:" INTRO-COMPUT SCI/PROG IN JAVA",   ar: "36"},
     {prof: "Sunil Gulati",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "26"},
     {prof: "Paola Castagna",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECES II",   ar: "77"},
     {prof: "Anand Deopurkar",id: "MATH V1201",name:" CALCULUS III",   ar: "26"},
     {prof: "Xavier Sala-i-Martin",id: "ECON W3213",name:" INTERMEDIATE MACROECONOMICS",   ar: "45"},
     {prof: "Rashmi Sahni",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "57"},
     {prof: "Imre Bartos",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "53"},
     {prof: "Stuart Firestein",id: "SCNC W3920",name:" IGNORANCE",   ar: "74"},
     {prof: "Robert Beer",id: "CHEM W1403",name:" General Chemistry I - Lectures",   ar: "43"},
     {prof: "Rumen Zarev",id: "MATH V1101",name:" Calculus I",   ar: "48"},
     {prof: "John Huber",id: "POLS V1501",name:" INTRO TO COMPARATIVE POLITICS",   ar: "34"},
     {prof: "Tina Fruehauf",id: "HUMA W1123",name:" MASTERPIECES OF WESTERN MUSIC",   ar: "58"},
     {prof: "patricia lindeman",id: "PSYC W1001",name:" THE SCIENCE OF PSYCHOLOGY",   ar: "35"},
     {prof: "shamus khan",id: "SOCI W1000",name:" THE SOCIAL WORLD",   ar: "39"},
     {prof: "Adam Cannon",id: "COMS W1004",name:" INTRO-COMPUT SCI/PROG IN JAVA 3.00",   ar: "36"},
     {prof: "Casey Blake",id: "HIST W3478",name:" US INTELLECTUAL HIST 1865-PRES",   ar: "53"},
     {prof: "Mark Carnes",id: "HIST BC3413",name:" UNITED STATES 1940-1975",   ar: "49"},
     {prof: "Carol Gluck",id: "HIST W3997",name:" WORLD WAR II IN HIST & MEMORY",   ar: "45"},
     {prof: "Peter Awn",id: "RELI V2305",name:" ISLAM",   ar: "37"},
     {prof: "Adam Cannon",id: "COMS W1004",name:" INTRO-COMPUT SCI/PROGRAM-JAVA",   ar: "29"},
     {prof: "Andrew Delbanco",id: "ENGL W3267",name:" FOUNDATIONS OF AMERICAN LIT I",   ar: "75"},
     {prof: "Sally Davidson",id: "ECON V3025",name:" FINANCIAL ECONOMICS",   ar: "36"},
     {prof: "Zara Anishanslin",id: "HIST W3412",name:" REVOLUTIONARY AMER 1750-1815",   ar: "52"},
     {prof: "Jill Shapiro",id: "EEEB V1010",name:" HUMAN SPECIES-PLACE IN NATURE",   ar: "41"},
     {prof: "Gareth Williams",id: "GREK V1101",name:" ELEMENTARY GREEK I",   ar: "57"},
     {prof: "Akash Kumar",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "63"},
     {prof: "John McWhorter",id: "LING W3101",name:" INTRODUCTION TO LINGUISTICS",   ar: "36"},
     {prof: "Gareth Williams",id: "GREK V1102",name:" ELEMENTARY GREEK II",   ar: "33"},
     {prof: "Mark Carnes",id: "HIST BC3413",name:" UNITED STATES 1940-1975",   ar: "49"},
     {prof: "Akash Kumar",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "64"},
     {prof: "Alan Timberlake",id: "LING G4206",name:" ADV GRAMMAR AND GRAMMARS",   ar: "93"},
     {prof: "Allison Franzese",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "45"},
     {prof: "Heather Ohaneson",id: "COCI C1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "43"},
     {prof: "Heather Ohaneson",id: "COCI C1102",name:" CONTEMP WESTRN CIVILIZATION II",   ar: "45"},
     {prof: "Paul Olsen",id: "EESC V1401",name:" DINOSAUR & HISTORY OF LIFE-LEC",   ar: "38"},
     {prof: "Deborah Steiner",id: "GREK V1202",name:" INTERMDTE GREEK II: HOMER",   ar: "87"},
     {prof: "Baerbel Hoenisch",id: "EESC V1030",name:" OCEANOGRAPHY",   ar: "41"},
     {prof: "Berenice Baudry",id: "FREN W1102",name:" Elementary French II",   ar: "75"},
     {prof: "Dawn Delbanco",id: "HUMA W1121",name:" Masterpieces of Western Art",   ar: "64"},
     {prof: "Ilana Manaster",id: "ENGL F1010",name:" University Writing",   ar: "36"},
     {prof: "Sophie Queuniet",id: "FREN W1201",name:" Intermediate French I",   ar: "59"},
     {prof: "Troels Jorgensen",id: "MATH V1102",name:" CALCULUS II",   ar: "38"},
     {prof: "Chun-Fang Yu",id: "RELI V2405",name:" CHINESE RELIGIOUS TRADITIONS",   ar: "54"},
     {prof: "Imre Bartos",id: "SCNC C1100",name:" FRONTIERS OF SCIENCE - DISC",   ar: "48"},
     {prof: "Mercedes PerÃ©z Serrano",id: "SPAN W1101",name:" ELEMENTARY SPANISH I",   ar: "13"},
     {prof: "Ha Nguyen",id: "STAT W1001",name:" INTRO TO STATISTICAL REASONING",   ar: "39"},
     {prof: "Evan Neely",id: "COCI F1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "64"},
     {prof: "Elfriede Michi Barall",id: "ENGL F1010",name:" UNIVERSITY WRITING",   ar: "31"},
     {prof: "Brendan O'Flaherty",id: "ECON W4438",name:" Economics of Race in the US",   ar: "40"},
     {prof: "Göran Ekström",id: "EESC V1201",name:" Environmental Risks and Disasters",   ar: "35"},
     {prof: "Eric Blanchard",id: "POLS W3631",name:" American Foreign Policy",   ar: "42"},
     {prof: "Carol Rovane",id: "COCI C1101",name:" Contemporary Western Civilization I",   ar: "59"},
     {prof: "Carol Rovane",id: "COCI C1101",name:" Contemporary Western Civilization II",   ar: "59"},
     {prof: "Anna Catarina Musatti",id: "ECON W3211",name:" Intermediate Microeconomics",   ar: "30"},
     {prof: "Sunil Gulati",id: "ECON W1105",name:" Principles of Economics",   ar: "27"},
     {prof: "Xavier Sala-i-Martin",id: "ECON W3213",name:" Intermediate Macroeconomics",   ar: "43"},
     {prof: "Marc Van de Mieroop",id: "HIST W1002",name:" ANC HIST-MESOPOTAMIA&ASIA MINO",   ar: "69"},
     {prof: "Judith Russell",id: "POLS W1201",name:" INTRO TO AMERICAN POLITICS",   ar: "51"},
     {prof: "Kimberly Marten",id: "POLS V1601",name:" INTERNATIONAL POLITICS",   ar: "36"},
     {prof: "Michael Como",id: "RELI V2308",name:" BUDDHISM: EAST ASIAN",   ar: "38"},
     {prof: "John McWhorter",id: "LING W3101",name:" INTRODUCTION TO LINGUISTICS",   ar: "36"},
     {prof: "Ovidiu Savin",id: "MATH V1207",name:" HONORS MATHEMATICS A",   ar: "30"},
     {prof: "Richard Miller",id: "MUSI V1312",name:" INTRODUCTORY EAR-TRAINING",   ar: "75"},
     {prof: "Michael Skelly",id: "MUSI W1513",name:" INTRODUCTION TO PIANO I",   ar: "71"},
     {prof: "Sharon Hoffmann",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "51"},
     {prof: "Lucy Ludwig Sheehan",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "71"},
     {prof: "Margo Rosen",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTERPIECES II",   ar: "68"},
     {prof: "Ovidiu Savin",id: "MATH V1208",name:" HONORS MATHEMATICS B",   ar: "47"},
     {prof: "Michael Skelly",id: "MUSI W2516",name:" INTERMEDTE PIANO INSTRUCTN II",   ar: "95"},
     {prof: "Justin Reynolds",id: "COCI C1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "47"},
     {prof: "Robert Friedman",id: "MATH W4065",name:" INTRO TO MODERN ALGEBRA I",   ar: "47"},
     {prof: "Nam Le",id: "MATH W4065",name:" HONORS COMPLEX VARIABLES",   ar: "67"},
     {prof: "Susan Boynton",id: "MUSI V3129",name:" HIST-WEST MUS:CLASSICAL-20TH C",   ar: "61"},
     {prof: "Ramin Amir Arjomand",id: "MUSI V3321",name:" CHROMATIC HARMONY/COUNTERPT-I",   ar: "36"},
     {prof: "Justin Reynolds",id: "COCI C1102",name:" CONTEMP WESTRN CIVILIZATION II",   ar: "45"},
     {prof: "Robert Friedman",id: "MATH W4042",name:" INTRO TO MODERN ALGEBRA II",   ar: "49"},
     {prof: "Marcel Nutz",id: "MATH W4155",name:" PROBABILITY THEORY",   ar: "44"},
     {prof: "Anna Catarina Musatti",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "28"},
     {prof: "Sarah Woolley",id: "PSYC W2420",name:" ANIMAL BEHAVIOR",   ar: "24"},
     {prof: "Patricia Lindemann",id: "PSYC W1420",name:" EXPERIMENTAL PSYCHOLOGY: HUMAN BEHAVIOR",ar:"49"},
     {prof: "Philip Kitcher",id: "PHIL V2593",name:" SCIENCE & RELIGION",   ar: "26"},
     {prof: "Michael Golston",id: "ENGL W4503",name:" POST MODERN POETRY & POETIC",   ar: "65"},
     {prof: "Emlyn Hughes",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "65"},
     {prof: "Ava Brent",id: "BIOL W3031",name:" GENETICS",   ar: "37"},
     {prof: "N/A",id: "BIOL W3500",name:" INDIVIDUAL TOPICS",   ar: "92"},
     {prof: "Alexis Soloski",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECES",   ar: "48"},
     {prof: "Eleanor Johnson",id: "HUMA C1001",name:" EURPN LIT",   ar: "45"},
     {prof: "Alfred MacAdam",id: "SPAN W3265",name:" LATIN AMER LIT (IN TRANSLATN)",   ar: "52"},
     {prof: "Martin Chalfie",id: "BIOL W3031",name:" GENETICS",   ar: "41"},
     {prof: "Rafael Yuste",id: "BIOL W3005",name:" NEUROBIO II: DEVPT & SYSTEMS",   ar: "44"},
     {prof: "Stuart Firestein",id: "BIOL W3004",name:" NEUROBIO 1: CELLULAR & MOLECULR",   ar: "33"},
     {prof: "Frances Champagne",id: "PSYC W2480",name:" THE DEVELOPING BRAIN",   ar: "56"},
     {prof: "Akeel Bilgrami",id: "PHIL C1010",name:" METHODS/PROB OF PHILOS THOUGHT",   ar: "35"},
     {prof: "Kimuli Kasara",id: "POLS V1501",name:" INTRO TO COMPARATIVE POLITICS",   ar: "34"},
     {prof: "Peter De Menocal",id: "EESC V1003",name:" CLIMATE AND SOCIETY: CASE STUDIES",   ar: "43"},
     {prof: "Rosalind Krauss",id: "AHIS W3650",name:" TWENTIETH CENTURY ART",   ar: "75"},
     {prof: "David Albert",id: "PHIL C1010",name:" METHDS & PBLMS-PHILOSHC THGHT",   ar: "26"},
     {prof: "Sheela Kolluri",id: "STAT W1211",name:" INTRODUCTION TO STATISTICS",   ar: "22"},
     {prof: "Scott Snyder",id: "CHEM C3444",name:" ORGANIC CHEMISTRY II-LECTURES",   ar: "56"},
     {prof: "Luis Campos",id: "CHEM C3443",name:" ORGANIC CHEMISTRY I-LECTURES",   ar: "40"},
     {prof: "Michael Shaevitz",id: "PHYS V1202",name:" GENERAL PHYSICS",   ar: "43"},
     {prof: "Michael Shaevitz",id: "PHYS V1202",name:" GENERAL PHYSICS",   ar: "43"},
     {prof: "James Applegate",id: "ASTR C1403",name:" Earth Moon and Planets-Lect",   ar: "40"},
     {prof: "James Applegate",id: "ASTR C1403",name:" Earth Moon and Planets-Lect",   ar: "40"},
     {prof: "Mingcherng Deng",id: "BUSI W3013",name:" FINANCIAL ACCOUNTING",   ar: "42"},
     {prof: "Mark Carnes",id: "HIST BC1402",name:" AMERICAN CIV SINCE CIVIL WAR",   ar: "49"},
     {prof: "Akeel Bilgrami",id: "PHIL C1010",name:" METHODS/PROB OF PHILOS THOUGHT",   ar: "35"},
     {prof: "Hiie Saumaa",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "70"},
     {prof: "Alexander Drewitz",id: "MATH V1201",name:" CALCULUS III",   ar: "50"},
     {prof: "Peter Bearman",id: "SOCI W1000",name:" THE SOCIAL WORLD",   ar: "40"},
     {prof: "John Collins",id: "PHIL C1010",name:" METHODS/PROB OF PHILOS THOUGHT",   ar: "32"},
     {prof: "Eric Urban",id: "MATH W4065",name:" Honors Complex Variables",   ar: "17"},
     {prof: "Alexis Soloski",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "43"},
     {prof: "Alexis Soloski",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "60"},
     {prof: "Raymond Smith",id: "POLS W3245",name:" RACE-ETHNICITY IN AMERCN PLTCS",   ar: "28"},
     {prof: "Allison Franzese",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "45"},
     {prof: "Peter Bearman",id: "SOCI W1000",name:" THE SOCIAL WORLD",   ar: "40"},
     {prof: "Stephen Scott",id: "ANTH V1002",name:" THE INTERPRETATION OF CULTURE",   ar: "33"},
     {prof: "Jason Smerdon",id: "SDEV W1900",name:" INTRO TO SUSTAINABLE DEVPT SEM",   ar: "89"},
     {prof: "Tyler Bickford",id: "COCI C1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "55"},
     {prof: "Kenneth Jackson",id: "HIST W3449",name:" AMERICAN URBAN HISTORY",   ar: "56"},
     {prof: "Joshua New",id: "PHIL V2400",name:" PSYCHOL & PHILOS OF HUM EXPER",   ar: "27"},
     {prof: "John Morrison",id: "PHIL V2400",name:" PSYCHOL & PHILOS OF HUM EXPER",   ar: "27"},
     {prof: "Macalester Bell",id: "PHIL V2702",name:" CONTEMPORARY MORAL PROBLEMS",   ar: "74"},
     {prof: "Tyler Bickford",id: "COCI C1102",name:" CONTEMP WESTRN CIVILIZATION II",   ar: "73"},
     {prof: "Isaura Arce-Fernandez",id: "SPAN W1101",name:" ELEMENTARY SPANISH I",   ar: "76"},
     {prof: "Teresa Sharpe",id: "SOCI W3265",name:" SOCIOLOGY OF WORK & GENDER",   ar: "51"},
     {prof: "Juan Jimenez-Caicedo",id: "SPAN W1102",name:" ELEMENTARY SPANISH II",   ar: "86"},
     {prof: "Daniel Sheehan",id: "URBS V3200",name:" GIS METHODS & CASE STUDIES",   ar: "59"},
     {prof: "Shamus Khan",id: "SOCI W1000",name:" THE SOCIAL WORLD",   ar: "38"},
     {prof: "Robert Jervis",id: "POLS V1601",name:" INTERNATIONAL POLITICS",   ar: "25"},
     {prof: "Alice Heicklen",id: "BIOL W3022",name:" DEVELOPMENT BIOLOGY",   ar: "36"},
     {prof: "Adam Cannon",id: "COMS W1004",name:" INTRO-COMPUT SCI/PROGRAM-JAVA",   ar: "29"},
     {prof: "Ovidiu Savin",id: "MATH V3028",name:" PARTIAL DIFFERENTIAL EQUATIONS",   ar: "27"},
     {prof: "Elizabeth Povinelli",id: "ANTH V1002",name:" THE INTERPRETATION OF CULTURE",   ar: "64"},
     {prof: "John Hawley",id: "RELI V2205",name:" HINDUISM 3.00 B+ 45%",   ar: "45"},
     {prof: "Kimberly Marten",id: "POLS V1601",name:" INTERNATIONAL POLITICS",   ar: "37"},
     {prof: "Steven Olley",id: "ECON W3211",name:" INTERMEDIATE MICROECONOMICS",   ar: "31"},
     {prof: "Peter Awn",id: "HUMA F1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "60"},
     {prof: "Ronald Findlay",id: "ECON W4500",name:" INTERNATIONAL TRADE",   ar: "24"},
     {prof: "Nicholas Dames",id: "CLEN w4822",name:" 19th Century European Novel",   ar: "56"},
     {prof: "Anna Catarina Musatti",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "31"},
     {prof: "James Applegate",id: "ASTR C1404",name:" Stars Galaxies Cosmology",   ar: "41"},
     {prof: "Jeremy Dauber",id: "CLYD W3500",name:" Readings: Humor in Jewish Literature",   ar: "53"},
     {prof: "Richard Friesner",id: "CHEM C1403",name:" GENERAL CHEMISTRY I",   ar: "38"},
     {prof: "Jo Ann Cavallo",id: "HUMA C1001",name:" LIT HUM",   ar: "59"},
     {prof: "Ovidiu Savin",id: "MATH V1207",name:" HONORS MATHEMATICS A",   ar: "30"},
     {prof: "Norman Christ",id: "PHYS C2801",name:" ACCEL PHYS 1",   ar: "50"},
     {prof: "Ruben Gonzalez",id: "CHEM C1404",name:" GEN CHEM II",   ar: "30"},
     {prof: "Michi Barall",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "29"},
     {prof: "Jo Ann Cavallo",id: "HUMA C1002",name:" LIT HUM II",   ar: "59"},
     {prof: "Ovidiu Savin",id: "MATH V1208",name:" HONORS MATH B",   ar: "47"},
     {prof: "Norman Christ",id: "PHYS C2802",name:" ACCELERATED PHYSICS II",   ar: "63"},
     {prof: "Deborah Mowshowitz",id: "BIOL C2005",name:" INTRO BIO I",   ar: "23"},
     {prof: "Joseph Ulichny",id: "CHEM W1500",name:" GEN CHEM LAB",   ar: "54"},
     {prof: "David Ratzan",id: "COCI C1101",name:" CONTEMPORARY WESTERN CIVILIZATION I",   ar: "57"},
     {prof: "Panagiota Daskalopoulos",id: "MATH V3027",name:" ODE",   ar: "37"},
     {prof: "Philip Kim",id: "PHYS W3007",name:" ELECTRICITY & MAGNETISM",   ar: "38"},
     {prof: "Deborah Mowshowitz",id: "BIOL C2006",name:" INTRO BIO II",   ar: "25"},
     {prof: "David Ratzan",id: "COCI C1102",name:" CONTEMPORARY WESTERN CIVILIZATION II",   ar: "62"},
     {prof: "Adam Cannon",id: "ENGI E1006",name:" INTRO TO COMP FOR ENG/APP SCIENTISTS",   ar: "41"},
     {prof: "Andrew Millis",id: "PHYS W3003",name:" MECHANICS",   ar: "41"},
     {prof: "Julia Siemon",id: "HUMA W1121",name:" MASTERPIECES OF WESTERN ART",   ar: "91"},
     {prof: "Dorian Warren",id: "POLS W3202",name:" LABOR & AMERICAN POLITICS",   ar: "48"},
     {prof: "Alheli Alvarado-Diaz",id: "COCI C1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "95"},
     {prof: "Rina Kreitman",id: "MDES W1512",name:" 2ND YR MOD HEBREW: INTER I",   ar: "90"},
     {prof: "Kathy Eden",id: "ENGL W3262",name:" ENGLISH LITERATURE 1500-1600",   ar: "40"},
     {prof: "Kathleen Taylor",id: "PSYC W1001",name:" THE SCIENCE OF PSYCHOLOGY",   ar: "39"},
     {prof: "Nicholas Dames",id: "CLEN W4822",name:" 19TH CENTURY EUROPEAN NOVEL",   ar: "56"},
     {prof: "Frances Negron-Muntaner",id: "CSER W1601",name:" INTRODUCTION TO LATINO STUDIES",   ar: "55"},
     {prof: "Timothy Frye",id: "POLS V1511",name:" Intro To Comparative Politics",   ar: "36"},
     {prof: "Karen Barkey",id: "SOCI W3355",name:" Religion and Politics",   ar: "50"},
     {prof: "Najam Haider",id: "RELI V3311",name:" Islam in the Post-Colonial World",   ar: "48"},
     {prof: "Robert Beer",id: "CHEM W1403",name:" General Chemistry I",   ar: "32"},
     {prof: "Alexander Drewitz",id: "MATH V1102",name:" CALCULUS 2",   ar: "39"},
     {prof: "Morris Rossabi",id: "HSEA W3898",name:" HISTORY OF THE MONGOLS",   ar: "62"},
     {prof: "LEIGH SHADKO",id: "SPAN W1201",name:" INTERMEDIATE SPANISH I",   ar: "88"},
     {prof: "Patricia Grieve",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "57"},
     {prof: "Christopher Conlon",id: "ECON W3412",name:" INTRODUCTION TO ECONOMETRICS",   ar: "33"},
     {prof: "Nara Milanich",id: "HIST W3661",name:" LATIN AMERICAN CIVILIZATION II",   ar: "47"},
     {prof: "Pablo Piccato",id: "HIST W3663",name:" MEXICO FROM REVOLUTION TO DEMOCRACY",   ar: "60"},
     {prof: "Szabolcs Marka",id: "PHYS C1001",name:" PHYSICS FOR POETS",   ar: "87"},
     {prof: "John Hawley",id: "RELI V2205",name:" HINDUISM",   ar: "41"},
     {prof: "Anna Catarina Musatti",id: "ECON W3211",name:" INTERMEDIATE MICROECONOMICS",   ar: "30"},
     {prof: "Gregory Mann",id: "HIST W3772",name:" WEST AFRICA",   ar: "49"},
     {prof: "Maureen Gupta",id: "HUMA W1123",name:" MASTERPIECES OF WESTERN MUSIC",   ar: "74"},
     {prof: "Juan Alvarez",id: "SPAN W1202",name:" INTERMEDIATE SPANISH II",   ar: "69"},
     {prof: "Stephanie Zhang",id: "STAT W1211",name:" INTRODUCTION TO STATISTICS",   ar: "25"},
     {prof: "James Valentini",id: "CHEM C1403",name:" GENERAL CHEMISTRY I-LECTURES",   ar: "33"},
     {prof: "Saskia Sassen",id: "SOCI W3324",name:" GLOBAL URBANISM",   ar: "58"},
     {prof: "Tonya Putnam",id: "POLS V1601",name:" INTERNATIONAL POLITICS",   ar: "29"},
     {prof: "Helena Uthas",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "53"},
     {prof: "David Bayer",id: "MATH V2010",name:" LINEAR ALGEBRA",   ar: "52"},
     {prof: "Anand Deopurkar",id: "MATH V1201",name:" CALCULUS III",   ar: "36"},
     {prof: "Ivan Lupic",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTERPIECS II",   ar: "90"},
     {prof: "Jon Steinsson",id: "ECON W3213",name:" INTERMEDIATE MACROECONOMICS",   ar: "31"},
     {prof: "Bernard Salanie",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "33"},
     {prof: "Julie Crawford",id: "ENGL W3336",name:" SHAKESPEARE II",   ar: "38"},
     {prof: "Rashid Khalidi",id: "HIST W3719",name:" HISTORY OF THE MOD MIDDLE EAST",   ar: "56"},
     {prof: "Jessica Gerard",id: "ENGL C1020",name:" UNIVERSITY WRITING: INTERNAT'L",   ar: "64"},
     {prof: "Anand Deopurkar",id: "MATH V1102",name:" CALCULUS II",   ar: "34"},
     {prof: "Ivan Lupic",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "59"},
     {prof: "Elizabeth Povinelli",id: "ANTH V1002",name:" THE INTERPRETATION OF CULTURE",   ar: "64"},
     {prof: "Summer Ash",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "43"},
     {prof: "Gregory Pflugfelder",id: "ASCE V2361",name:" INTRO EAST ASIAN CIV: JAPAN",   ar: "57"},
     {prof: "Jacqueline Olvera",id: "URBS V3420",name:" INTRODUCTION URBAN SOCIOLOGY",   ar: "13"},
     {prof: "David Smiley",id: "ARCH V3114",name:" MAKING THE METROPOLIS",   ar: "46"},
     {prof: "Theodore Hughes",id: "ASCE V2363",name:" INTRO TO EAST ASIAN CIV: KOREA",   ar: "53"},
     {prof: "Drew Hopkins",id: "ANTH V2027",name:" CHANGING EAST ASIAN FOODWAYS",   ar: "81"},
     {prof: "Theodore Hughes",id: "EAAS V3215",name:" KOREAN LITERATURE AND FILM",   ar: "51"},
     {prof: "Julie Crawford",id: "ENGL W3336",name:" SHAKESPEARE II",   ar: "38"},
     {prof: "Rashid Khalidi",id: "HIST W3719",name:" HISTORY OF THE MOD MIDDLE EAST",   ar: "56"},
     {prof: "James Valentini",id: "CHEM C1403",name:" GENERAL CHEMISTRY I-LECTURES",   ar: "33"},
     {prof: "Saskia Sassen",id: "SOCI W3324",name:" GLOBAL URBANISM",   ar: "58"},
     {prof: "Tonya Putnam",id: "POLS V1601",name:" INTERNATIONAL POLITICS",   ar: "29"},
     {prof: "Helena Uthas",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "53"},
     {prof: "David Bayer",id: "MATH V2010",name:" LINEAR ALGEBRA",   ar: "52"},
     {prof: "Anand Deopurkar",id: "MATH V1201",name:" CALCULUS III",   ar: "36"},
     {prof: "Ivan Lupic",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTERPIECS II",   ar: "90"},
     {prof: "Jon Steinsson",id: "ECON W3213",name:" INTERMEDIATE MACROECONOMICS",   ar: "31"},
     {prof: "Bernard Salanie",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "33"},
     {prof: "Jessica Gerard",id: "ENGL C1020",name:" UNIVERSITY WRITING: INTERNAT'L",   ar: "64"},
     {prof: "Anand Deopurkar",id: "MATH V1102",name:" CALCULUS II",   ar: "34"},
     {prof: "Ivan Lupic",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "59"},
     {prof: "Elizabeth Povinelli",id: "ANTH V1002",name:" THE INTERPRETATION OF CULTURE",   ar: "64"},
     {prof: "Summer Ash",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "43"},
     {prof: "Gregory Pflugfelder",id: "ASCE V2361",name:" INTRO EAST ASIAN CIV: JAPAN",   ar: "57"},
     {prof: "Jacqueline Olvera",id: "URBS V3420",name:" INTRODUCTION URBAN SOCIOLOGY",   ar: "13"},
     {prof: "David Smiley",id: "ARCH V3114",name:" MAKING THE METROPOLIS",   ar: "46"},
     {prof: "Theodore Hughes",id: "ASCE V2363",name:" INTRO TO EAST ASIAN CIV: KOREA",   ar: "53"},
     {prof: "Drew Hopkins",id: "ANTH V2027",name:" CHANGING EAST ASIAN FOODWAYS",   ar: "81"},
     {prof: "Theodore Hughes",id: "EAAS V3215",name:" KOREAN LITERATURE AND FILM",   ar: "51"},
     {prof: "Akeel Bilgrami",id: "PHIL C1010",name:" METHODS/PROB OF PHILOS THOUGHT",   ar: "35"},
     {prof: "Kimuli Kasara",id: "POLS V1501",name:" INTRO TO COMPARATIVE POLITICS",   ar: "34"},
     {prof: "Peter De Menocal",id: "EESC V1003",name:" CLIMATE AND SOCIETY: CASE STUDIES",   ar: "43"},
     {prof: "Joao Nemi Neto",id: "PORT W1102",name:" ELEMENTARY PORTUGUESE II",   ar: "38"},
     {prof: "Imre Bartos",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "53"},
     {prof: "Kevin Griffin",id: "SDEV W1900",name:" INTRO TO SUSTAINABLE DEVPT SEM",   ar: "78"},
     {prof: "Lam Hui",id: "PHYS G6047",name:" quantum field theory I",   ar: "50"},
     {prof: "Elizabeth Keenan",id: "HUMA W1123",name:" MASTERPIECES OF WESTERN MUSIC",   ar: "63"},
     {prof: "Shlomo Hershkop",id: "COMS W3134",name:" DATA STRUCTURES IN JAVA",   ar: "62"},
     {prof: "Jo Ann Cavallo",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "59"},
     {prof: "Ovidiu Savin",id: "MATH V1207",name:" honors mathematics a",   ar: "30"},
     {prof: "Panagiota Daskalopoulos",id: "math v3027",name:" ordinary differential equations",   ar: "34"},
     {prof: "Joanna Scutts",id: "HUMA C1001",name:" EUROPN LIT-PHILOS MASTERPIECS I",   ar: "36"},
     {prof: "Brian Greene",id: "phys g4021",name:" quantum mechanics I",   ar: "56"},
     {prof: "Erin Ehsani",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "50"},
     {prof: "Hugh Crowl",id: "scnc c1000",name:" frontiers of science",   ar: "51"},
     {prof: "Patrick Gallagher",id: "MATH W4061",name:" INTRO-MODERN ANALYSIS I",   ar: "57"},
     {prof: "Brian Greene",id: "PHYS G4021",name:" QUANTUM MECHANICS I",   ar: "56"},
     {prof: "Jo Ann Cavallo",id: "huma 1002",name:" eurpn lit-philos mastrpiecs II",   ar: "59"},
     {prof: "Szabolcs Marka",id: "PHYS W3008",name:" ELECTROMAGNETIC WAVES & OPTICS",   ar: "68"},
     {prof: "Brian Cole",id: "phys w3002",name:" from quarks to the cosmos",   ar: "79"},
     {prof: "Alessia Pannese",id: "SCNC C1100",name:" FRONTIERS OF SCIENCE",   ar: "45"},
     {prof: "Abhay Pasupathy",id: "phys w3007",name:" electricity-magnetism",   ar: "46"},
     {prof: "Alberto Nicolis",id: "phys g4003",name:" advanced mechanics",   ar: "39"},
     {prof: "Anargyros Papageorgiou",id: "COMS W4281",name:" INTRO TO QUANTUM COMPUTING",   ar: "55"},
     {prof: "Brian Greene",id: "phys g4022",name:" quantum mechanics II",   ar: "55"},
     {prof: "Valentine Daniel",id: "coci c1101",name:" contemp western civilization I",   ar: "57"},
     {prof: "Patricia Grieve",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "55"},
     {prof: "Nam Le",id: "math w4065",name:" honors complex variables",   ar: "67"},
     {prof: "Robert Friedman",id: "MATH W4042",name:" INTRO TO MODERN ALGEBRA II",   ar: "45"},
     {prof: "Rakesh Ranjan",id: "mdes W1608",name:" hindi for heritage speakers I",   ar: "81"},
     {prof: "Miklos Gyulassy",id: "phys g6037",name:" quantum mechanics I",   ar: "52"},
     {prof: "Allan Blaer",id: "phys g6092",name:" electromagnetic theory",   ar: "57"},
     {prof: "Brian Greene",id: "PHYS G4022",name:" QUANTUM MECHANICS II",   ar: "55"},
     {prof: "Valentine Daniel",id: "coci c1102",name:" contemp westrn civilization II",   ar: "59"},
     {prof: "Alberto Nicolis",id: "PHYS G4003",name:" ADVANCED MECHANICS",   ar: "39"},
     {prof: "Robert Friedman",id: "math w4042",name:" intro to modern algebra II",   ar: "49"},
     {prof: "Abigail Kluchin",id: "COCI C1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "64"},
     {prof: "Mu-Tao Wang",id: "math w4081",name:" intro-differentiable manifolds",   ar: "43"},
     {prof: "Pierre Force",id: "FREN W3666",name:" MOLIERE",   ar: "89"},
     {prof: "Nanor Kenderian",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "50"},
     {prof: "Susan Elmes",id: "ECON W3211",name:" INTERMEDIATE MICROECONOMICS",   ar: "31"},
     {prof: "Xavier Sala-i-Martin",id: "ECON W3213",name:" INTERMEDIATE MACROECONOMICS",   ar: "43"},
     {prof: "Frederick Bengtsson",id: "Huma C1001",name:" Eurpn Lit - Philos Masterpiecs I",   ar: "24"},
     {prof: "Tobias Myers",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS",   ar: "68"},
     {prof: "Bernard Salanie",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "33"},
     {prof: "Tobias Myers",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "73"},
     {prof: "Seyhan Arkonac",id: "ECON W3412",name:" INTRODUCTION TO ECONOMETRICS",   ar: "42"},
     {prof: "Anand Deopurkar",id: "MATH V1201",name:" CALCULUS III",   ar: "36"},
     {prof: "Frank Miller",id: "RUSS V3101",name:" THIRD-YEAR RUSSIAN I",   ar: "64"},
     {prof: "Sheela Kolluri",id: "STAT W1211",name:" INTRODUCTION TO STATISTICS",   ar: "24"},
     {prof: "Nicholas Frobes-Cross",id: "HUMA W1121",name:" MASTERPIECES OF WESTERN ART",   ar: "90"},
     {prof: "Terence D'Altroy",id: "ANTH V1008",name:" THE RISE OF CIVILIZATION",   ar: "40"},
     {prof: "Francis Hittinger",id: "ITAL W1101",name:" ELEMENTARY ITALIAN I",   ar: "85"},
     {prof: "Stephanie Schmitt-Grohe",id: "ECON W4505",name:" INTL MONETARY THEORY & POLICY",   ar: "32"},
     {prof: "Matthew Main",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "43"},
     {prof: "nina bond",id: "RUSS V1202",name:" SECOND-YEAR RUSSIAN II",   ar: "69"},
     {prof: "Edward Lincoln",id: "ECON W4325",name:" ECONOMIC DEVELOPMENT OF JAPAN",   ar: "33"},
     {prof: "Zoe Strother",id: "AHIS W3208",name:" ARTS OF AFRICA",   ar: "34"},
     {prof: "Lucie Vagnerova",id: "HUMA W1123",name:" MASTERPIECES OF WESTERN MUSIC",   ar: "63"},
     {prof: "Nathanael Shelley",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "48"},
     {prof: "Nathanael Shelley",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "65"},
     {prof: "Anand Deopurkar",id: "MATH V1201",name:" CALCULUS III",   ar: "36"},
     {prof: "Nadja Ulrike Frank",id: "VIAR R1001",name:" BASIC DRAWING",   ar: "95"},
     {prof: "Ruen-Chuan Ma",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "50"},
     {prof: "Subrahmanya Tyagaraja Krishnamoorthy",id: "MATH V1101",name:" CALCULUS I",   ar: "66"},
     {prof: "Nancy Workman",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "36"},
     {prof: "Marc Masdeu",id: "MATH V1101",name:" CALCULUS I",   ar: "29"},
     {prof: "Suzette Arnal",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "66"},
     {prof: "Deneb Kozikoski Valereto",id: "PORT W1101",name:" ELEMENTARY PORTUGUESE I",   ar: "53"},
     {prof: "Andrew Nathan",id: "HRTS V3001",name:" Introduction to Human Rights",   ar: "25"},
     {prof: "Sunil Gulati",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "26"},
     {prof: "Nicholas Dirks",id: "COCI C1102",name:" CONTEMP WESTRN CIVILIZATION II",   ar: "62"},
     {prof: "Dusa McDuff",id: "MATH V1101",name:" CALCULUS",   ar: "41"},
     {prof: "Caterina Pizzigoni",id: "HIST W3660",name:" LATIN AMERICAN CIVILIZATION I",   ar: "47"},
     {prof: "Nam Le",id: "MATH V1201",name:" CALCULUS III",   ar: "35"},
     {prof: "Robert Jervis",id: "POLS V1601",name:" International POLITICS",   ar: "25"},
     {prof: "Sachin Gautam",id: "MATH V1201",name:" CALCULUS III",   ar: "64"},
     {prof: "Angelina Craig-Florez",id: "SPAN W1201",name:" INTERMEDIATE SPANISH I",   ar: "60"},
     {prof: "Nam Le",id: "MATH V1201",name:" CALCULUS III",   ar: "35"},
     {prof: "Juan Jimenez-Caicedo",id: "SPAN W1102",name:" ELEMENTARY SPANISH II",   ar: "86"},
     {prof: "Celine Marange",id: "FREN W1102",name:" Elementary French II",   ar: "72"},
     {prof: "David Yerkes",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "53"},
     {prof: "Peter Kelemen",id: "EESC V1600",name:" Earth Resources & Sustainable Development",   ar: "45"},
     {prof: "Andrew Nathan",id: "HRTS V3001",name:" Introduction to Human Rights",   ar: "25"},
     {prof: "Elizabeth Blackmar",id: "HIST W3441",name:" Making of the Modern American Landscape",   ar: "70"},
     {prof: "Adela Gondek",id: "SDEV W3310",name:" Ethics of Sustainable Development",   ar: "82"},
     {prof: "Lila Abu-Lughod",id: "ANTH V3465",name:" WOMEN & GENDER IN MUSLIM WORLD",   ar: "51"},
     {prof: "Elizabeth Povinelli",id: "ANTH V1002",name:" THE INTERPRETATION OF CULTURE",   ar: "64"},
     {prof: "John Mutter",id: "SDEV W2330",name:" Science for Sustainable Development",   ar: "25"},
     {prof: "Meredith Davis",id: "AHIS BC3642",name:" NORTH AMERICAN ART AND CULTRE",   ar: "34"},
     {prof: "Kenneth Jackson",id: "HIST W3449",name:" American Urban History",   ar: "56"},
     {prof: "Lydia Goehr",id: "PHIL V2108",name:" PHILOSOPHY & HISTORY",   ar: "38"},
     {prof: "Ivana Hughes",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "48"},
     {prof: "Nicholas Christie-Blick",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "43"},
     {prof: "Francois Charest",id: "MATH V1201",name:" CALCULUS III",   ar: "51"},
     {prof: "Evan Neely",id: "COCI C1102",name:" CONTEMP WESTRN CIVILIZATION II",   ar: "64"},
     {prof: "JosÃ Ruiz-Campillo",id: "SPAN W1101",name:" ELEMENTARY SPANISH I",   ar: "71"},
     {prof: "Tyler Bickford",id: "COCI C1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "73"},
     {prof: "Padma Desai",id: "ECON W1105",name:" PRINCIPLES OF ECONOMICS",   ar: "27"},
     {prof: "Claudio Lomnitz",id: "ANTH V2005",name:" THE ETHNOGRAPHIC IMAGINATION",   ar: "55"},
     {prof: "Laura Kay",id: "ASTR BC1753",name:" LIFE IN THE UNIVERSE",   ar: "44"},
     {prof: "Alexander Madva",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "36"},
     {prof: "Shamus Khan",id: "SOCI W1000",name:" THE SOCIAL WORLD",   ar: "39"},
     {prof: "Katja Vogt",id: "PHIL V3701",name:" ETHICS",   ar: "71"},
     {prof: "Susan Elmes",id: "ECON W4211",name:" ADVANCED MICROECONOMICS",   ar: "69"},
     {prof: "JosÃ Ruiz-Campillo",id: "SPAN W1102",name:" ELEMENTARY SPANISH II",   ar: "31"},
     {prof: "Goran Ekstrom",id: "EESC V1201",name:" Environmental Risks and Disasters",   ar: "35"},
     {prof: "Eric Foner",id: "HIST W3528",name:" THE RADICAL TRADITION IN AMER",   ar: "48"},
     {prof: "Paul Siegel",id: "MATH V1202",name:" CALCULUS IV",   ar: "52"},
     {prof: "Partha Chatterjee",id: "ANTH V2004",name:" INTRO TO SOC & CULTURAL THEORY",   ar: "46"},
     {prof: "Katherine Ewing",id: "ANTH V2035",name:" INTRO TO THE ANTHROP OF S ASIA",   ar: "53"},
     {prof: "Stephen Scott",id: "ANTH V3873",name:" LANGUAGE AND POLITICS",   ar: "61"},
     {prof: "Adam Cannon",id: "COMS W1004",name:" INTRO-COMPUT SCI/PROG IN JAVA",   ar: "36"},
     {prof: "Lee Bollinger",id: "POLS W3285",name:" FREEDOM OF SPEECH & PRESS",   ar: "40"},
     {prof: "David Bayer",id: "MATH V2010",name:" LINEAR ALGEBRA",   ar: "52"},
     {prof: "Kledja Bega",id: "SCNC C1100",name:" FRONTIERS OF SCIENCE-DISC",   ar: "53"},
     {prof: "Juan Jimenez-Caicedo",id: "SPAN W1102",name:" ELEMENTARY SPANISH II",   ar: "73"},
     {prof: "Joseph Howley",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "82"},
     {prof: "Diego Saldana",id: "STAT W1211",name:" INTRODUCTION TO STATISTICS",   ar: "33"},
     {prof: "Kent Minturn",id: "HUMA W1121",name:" MASTERPIECES OF WESTERN ART",   ar: "77"},
     {prof: "David Bayer",id: "MATH V2010",name:" LINEAR ALGEBRA",   ar: "52"},
     {prof: "Michael McBreen",id: "MATH V1102",name:" CALCULUS II",   ar: "61"},
     {prof: "Sachin Gautam",id: "MATH V1201",name:" CALCULUS III",   ar: "64"},
     {prof: "Anna Nicolaou",id: "STAT W1111",name:" INTRODUCTION TO STATISTICS",   ar: "42"},
     {prof: "Vesna Kuiken",id: "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",   ar: "22"},
     {prof: "Vesna Kuiken",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "64"},
     {prof: "Allison Franzese",id: "SCNC C1000",name:" FRONTIERS OF SCIENCE",   ar: "51"},
     {prof: "John Hay",id: "ENGL C1011",name:" UNIVERSITY WRITING: AMER STUDY",   ar: "57"},
     {prof: "Rosalind Krauss",id: "AHIS W3650",name:" TWENTIETH CENTURY ART",   ar: "75"},
     {prof: "Rebecca Worby",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "50"},
     {prof: "Michael Cole",id: "AHIS V3464",name:" LATER ITALIAN ART",   ar: "58"},
     {prof: "Robert Beer",id: "CHEM W1404",name:" GENERAL CHEMISTRY II-LECTURES",   ar: "32"},
     {prof: "Karen Lewis",id: "PHIL BC1001",name:" INTRODUCTION TO PHILOSOPHY",   ar: "43"},
     {prof: "Maria Arce-Fernandez",id: "SPAN W1101",name:" ELEMENTARY SPANISH I",   ar: "76"},
     {prof: "Joseph Ulichny",id: "CHEM W1500",name:" GENERAL CHEMISTRY LABORATORY",   ar: "49"},
     {prof: "Maja Cerar",id: "HUMA W1123",name:" MASTERPIECES OF WESTERN MUSIC",   ar: "54"},
     {prof: "Rashmi Sahni",id: "ENGL C1010",name:" UNIVERSITY WRITING",   ar: "50"},
     {prof: "Joseph Howley",id: "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",   ar: "64"},
     {prof: "Evan Neely",id: "COCI C1101",name:" CONTEMP WESTERN CIVILIZATION I",   ar: "81"},
     {prof: "Stephen Murray",id: "AHIS W3230",name:" MEDIEVAL ARCHITECTURE",   ar: "44"},
     {prof: "David Reichman",id:   "CHEM C1403",name:" GENERAL CHEMISTRY I-LECTURES",  ar: "30"},
     {prof: "Mauricio Castillo",id:   "SPAN 1101",name:" ELEMENTARY SPANISH I",  ar: "67"},
     {prof: "Andrew Nathan",id:   "POLS 4871",name:" CHINESE FOREIGN POLICY",  ar: "77"},
     {prof: "Michael Como",id:   "RELI V2308",name:" BUDDHISM: EAST ASIAN",  ar: "43"},
     {prof: "Paul Weinfield",id:   "COCI 1101",name:" CONTEMP WESTERN CIVILIZATION I",  ar: "62"},
     {prof: "Kenneth Jackson",id:   "HIST 2535",name:" HISTORY OF THE CITY OF NEW YORK",  ar: "64"},
     {prof: "Susan Boynton",id:   "HUMA 1123",name:" MASTERPIECES OF WESTERN MUSIC",  ar: "79"},
     {prof: "Zuleyha Colak",id:   "MDES W1910",name:" ELEMENTARY MODERN TURKISH I",  ar: "79"},
     {prof: "Paul Weinfield",id:   "COCI 1102",name:" CONTEMP WESTRN CIVILIZATION II",  ar: "57"},
     {prof: "Rashid Khalidi",id:   "HIST UN2719",name:" HISTORY OF THE MOD MIDDLE EAST",  ar: "58"},
     {prof: "Veronica White",id:   "HUMA 1121",name:" MASTERPIECES OF WESTERN ART",  ar: "78"},
     {prof: "Robert Amdur",id:   "LAW L6133",name:" CONSTITUTIONAL LAW",  ar: "50"},
     {prof: "Elizabeth Leininger",id:   "SCNC C1000",name:" FRONTIERS OF SCIENCE",  ar: "53"},
     {prof: "Mauricio Castillo",id:   "SPAN 1101",name:" ELEMENTARY SPANISH I",  ar: "67"},
     {prof: "Andrew Nathan",id:   "POLS 4871",name:" CHINESE FOREIGN POLICY",  ar: "77"},
     {prof: "Paul Weinfield",id:   "COCI 1101",name:" CONTEMP WESTERN CIVILIZATION I",  ar: "62"},
     {prof: "Kenneth Jackson",id:   "HIST 2535",name:" HIST OF THE CITY OF NEW YORK",  ar: "64"},
     {prof: "Susan Boynton",id:   "HUMA 1123",name:" MASTERPIECES OF WESTERN MUSIC",  ar: "79"},
     {prof: "Paul Weinfield",id:   "COCI 1102",name:" CONTEMP WESTRN CIVILIZATION II",  ar: "57"},
     {prof: "Rashid Khalidi",id:   "HIST UN2719",name:" HISTORY OF THE MOD MIDDLE EAST",  ar: "58"},
     {prof: "Veronica White",id:   "HUMA 1121",name:" MASTERPIECES OF WESTERN ART",  ar: "78"},
     {prof: "Robert Amdur",id:   "LAW L6133",name:" CONSTITUTIONAL LAW",  ar: "50"},
     {prof: "Elizabeth Leininger",id:   "SCNC C1000",name:" FRONTIERS OF SCIENCE",  ar: "53"},
     {prof: "Adam Cannon",id:   "COMS W1004",name:" INTRO-COMPUT SCI/PROGRAM-JAVA",  ar: "29"},
     {prof: "Sarah Meyers",id:   "ENGL 1010",name:" UNIVERSITY WRITING",  ar: "64"},
     {prof: "Susan Boynton",id:   "MUSI V3128",name:" HIST-WEST MUS: MID AGE-BAROQUE",  ar: "69"},
     {prof: "Frank Caridi",id:   "STAT W1101",name:" INTRODUCTION TO STATISTICS",  ar: "44"},
     {prof: "Stephane Charitos",id:   "HUMA C1001",name:" EUROPEAN LIT-PHILOS MATERPIECS I",  ar: "86"},
     {prof: "Margo Rosen",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECES I",  ar: "76"},
     {prof: "Michael Como",id:   "RELI V2308",name:" BUDDHISM: EAST ASIAN",  ar: "38"},
     {prof: "Marcel Nutz",id:   "MATH V1201",name:" CALCULUS III",  ar: "58"},
     {prof: "Aaron Johnson",id:   "HUMA 1123",name:" MASTERPIECES OF WESTERN MUSIC",  ar: "82"},
     {prof: "Aaron Johnson",id:   "HUMA 1123",name:" MASTERPIECES OF WESTERN MUSIC",  ar: "82"},
     {prof: "Brent Stockwell",id:   "BIOC C3501",name:" BIOCHEM 1-STRUCTURE/METABOLISM",  ar: "36"},
     {prof: "John Rosenberg",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "33"},
     {prof: "Patrick Glauthier",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "81"},
     {prof: "Xavier Sala-i-Martin",id: "ECON W3211",name:" INTERMEDIATE MICROECONOMICS",  ar: "45"},
     {prof: "Felice Beneduce",id:   "ITAL W1101",name:" ELEMENTARY ITALIAN I",  ar: "79"},
     {prof: "Anand Deopurkar",id:   "MATH V1201",name:" CALCULUS III",  ar: "36"},
     {prof: "Sara Freeman",id:   "ENGL C1010",name:" UNIVERSITY WRITING",  ar: "29"},
     {prof: "David Russell",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "32"},
     {prof: "Suzette Arnal",id:   "SCNC C1000",name:" FRONTIERS OF SCIENCE",  ar: "48"},
     {prof: "Peter Pazzaglini",id:   "COCI C1101",name:" Contemporary Western Civilization I",  ar: "81"},
     {prof: "Darcy Kelley",id:   "SCNC C1001",name:" FRONTIERS OF SCIENCE",  ar: "51"},
     {prof: "Sherally Munshi",id:   "ENGL C1010",name:" UNIVERSITY WRITING",  ar: "93"},
     {prof: "Vangelis Calotychos",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "55"},
     {prof: "Philip Kitcher",id:   "PHIL V2593",name:" SCIENCE & RELIGION",  ar: "26"},
     {prof: "Cathy Popkin",id:   "RUSS 3220",name:" LITERATURE & EMPIRE",  ar: "50"},
     {prof: "Donald Hood",id:   "SCNC C1000",name:" FRONTIERS OF SCIENCE",  ar: "48"},
     {prof: "Elena Megalos",id:   "ENGL C1010",name:" UNIVERSITY WRITING",  ar: "43"},
     {prof: "Vincent Aurora",id:   "FREN 3405",name:" THIRD-YEAR GRAMMAR & COMP I",  ar: "77"},
     {prof: "Michael Como",id:   "RELI V2308",name:" BUDDHISM: EAST ASIAN",  ar: "60"},
     {prof: "Anupama Rao",id:   "HIST 2811",name:" S ASIA II: EMPIRE/ITS AFTRMATH",  ar: "31"},
     {prof: "Shamus Khan",id:   "SOCI W1000",name:" THE SOCIAL WORLD",  ar: "39"},
     {prof: "Perla Rozencvaig",id:   "SPAN W1120",name:" COMPREHENSIVE BEGINNING SPANISH",  ar: "50"},
     {prof: "Perla Rozencvaig",id:   "SPAN W2120",name:" COMPREHENSIVE INTER SPANISH",  ar: "53"},
     {prof: "Shamus Khan",id:   "SOCI W1000",name:" THE SOCIAL WORLD",  ar: "39"},
     {prof: "Perla Rozencvaig",id:   "SPAN W1120",name:" COMPREHENSIVE BEGINNING SPANISH",  ar: "50"},
     {prof: "Perla Rozencvaig",id:   "SPAN W2120",name:" COMPREHENSIVE INTER SPANISH",  ar: "53"},
     {prof: "Joseph Howley",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "68"},
     {prof: "Joseph Howley",id:   "HUMA C1002",name:" EURPN LIT-PHILOS MASTERPIECS II",  ar: "68"},
     {prof: "Brian Boyd",id:   "ACLG 2028",name:" INTRO TO 21ST CENT ARCHAEOLOGY",  ar: "62"},
     {prof: "Rachel McDermott",id:   "ASCM 2357",name:" INTRO TO INDIAN CIVILIZATION",  ar: "47"},
     {prof: "Marco Maiuro",id:   "coci c1101",name:" CONTEMP WESTERN CIVILIZATION I",  ar: "53"},
     {prof: "John McCormack",id:   "ENGL C1010",name:" University Writing",  ar: "23"},
     {prof: "Vesna Kuiken",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "22"},
     {prof: "Michael Woodbury",id:   "MATH V1201",name:" Calc III",  ar: "36"},
     {prof: "Emlyn Hughes",id:   "PHYS C1401",name:" Intro to Mechanics and Thermo",  ar: "44"},
     {prof: "Mikhail Smirnov",id:   "MATH 1202",name:" Calc 4",  ar: "60"},
     {prof: "George Saliba",id:   "ASCM 2003",name:" INTRO TO ISLAMIC CIVILIZATION",  ar: "62"},
     {prof: "Bohan Fang",id:   "MATH 2030",name:" Ordinary Diff Equations",  ar: "49"},
     {prof: "David Bayer",id:   "MATH 2010",name:" Linear Algebra",  ar: "52"},
     {prof: "Mark Brown",id:   "STAT 4207",name:" Elementary Stochastic Processes",  ar: "49"},
     {prof: "Joseph Massad",id:   "MDES 3042",name:" PALESTINIAN-ISRAELI POLIT/SOC",  ar: "44"},
     {prof: "Anne Prescott",id:   "ENGL BC3135",name:" WIT & HUMOR IN RENAISSANCE",  ar: "30"},
     {prof: "Julie Crawford",id:   "ENGL BC3167",name:" Milton",  ar: "41"},
     {prof: "Edward Mendelson",id:   "ENGL 3269",name:" Brit Lit 1900-1950",  ar: "69"},
     {prof: "David Vallancourt",id:   "ELEN 1101",name:" THE DIGITAL INFORMATION AGE",  ar: "71"},
     {prof: "Patricia Grieve",id:   "CPLS 6333",name:" EAST/WEST FRAMETALE NARRATIVES",  ar: "72"},
     {prof: "Dan Miron",id:   "MDES W3542",name:" INTRO TO ISRAELI LITERATURE",  ar: "74"},
     {prof: "James Shapiro",id:   "ENGL 3335",name:" SHAKESPEARE I",  ar: "74"},
     {prof: "Ioannis Mylonopoulos",id:   "AHIS 2108",name:" Greek Art and Architecture",  ar: "38"},
     {prof: "Rosalind Krauss",id:   "AHIS 2405",name:" Twentieth Century Art",  ar: "75"},
     {prof: "Sunil Gulati",id:   "ECON 2257",name:" The Global Economy",  ar: "33"},
     {prof: "Michael McBreen",id:   "MATH 1102",name:" CALCULUS II",  ar: "61"},
     {prof: "Alexander Madva",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "35"},
     {prof: "Vesna Kuiken",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "22"},
     {prof: "Vesna Kuiken",id:   "HUMA C1002",name:" EURPN LIT-PHILOS MASTRPIECS II",  ar: "64"},
     {prof: "John Hay",id:   "ENGL C1010",name:" UNIVERSITY WRITING: AMER STUDY",  ar: "57"},
     {prof: "Karen Lewis",id:   "PHIL 1001",name:" INTRODUCTION TO PHILOSOPHY",  ar: "43"},
     {prof: "Robert Beer",id:   "CHEM W1403",name:" GENERAL CHEMISTRY I-LECTURES",  ar: "34"},
     {prof: "Adam Cannon",id:   "COMS W1001",name:" INTRO TO INFORMATION SCIENCE",  ar: "33"},
     {prof: "Christia Mercer",id:   "PHIL 2201",name:" HIST OF PHIL: AQUINAS TO KANT",  ar: "33"},
     {prof: "Ellen McLaughlin",id:   "ENGL 3113",name:" PLAYWRITING I",  ar: "38"},
     {prof: "Jeremy Dauber",id:   "AMST 3630",name:" THE AMERICAN GRAPHIC NOVEL",  ar: "40"},
     {prof: "Katja Vogt",id:   "PHIL 2111",name:" HIST-PHIL:PRE-SOCRATCS-AUGUSTN",  ar: "56"},
     {prof: "John McWhorter",id:   "LING W3101",name:" INTRODUCTION TO LINGUISTICS",  ar: "60"},
     {prof: "Adam Cannon",id:   "COMS W1004",name:" INTRO-COMPUT SCI/PROGRAM-JAVA",  ar: "29"},
     {prof: "Anna Musatti",id:   "ECON 1105",name:" PRINCIPLES OF ECONOMICS",  ar: "27"},
     {prof: "Margo Rosen",id:   "HUMA C1001",name:" EURPN LIT-PHILOS MASTERPIECS I",  ar: "43"},
     {prof: "Salim Altug",id:   "MATH 1101",name:" CALCULUS I",  ar: "33"},
     {prof: "David Garofalo",id:   "SCNC C1000",name:" FRONTIERS OF SCIENCE",  ar: "48"},
     {prof: "Stephanie Schmitt-Grohe",id:   "ECON 3213",name:" INTERMEDIATE MACROECONOMICS",  ar: "41"},
     {prof: "Joshua Edwin",id:   "ENGL C1010",name:" UNIVERSITY WRITING",  ar: "21"}]

     */












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


