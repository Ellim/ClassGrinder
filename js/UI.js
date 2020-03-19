function updateBars() {
	for (var i = 0; i < game.encounter.length; i++){
			document.getElementById("Monster" + i + "HPBarID").style.width = ((game.encounter[i].stats.currentHP/game.encounter[i].stats.maxHP) * 100) + '%';
			document.getElementById("Monster" + i + "HPNumberID").innerHTML = "" + prettifySub(game.encounter[i].stats.currentHP) + " / " + game.encounter[i].stats.maxHP + "";
	}
	for (var i = 0; i < game.heroes.length; i++){
			if (game.heroes[i].stats.currentHP <= 0) {
				game.heroes[i].stats.currentHP = 0;
			}
			if (game.heroes[i].stats.currentMP <= 0) {
				game.heroes[i].stats.currentMP = 0;
			}
			document.getElementById("Hero" + i + "HPBarID").style.width = ((game.heroes[i].stats.currentHP/game.heroes[i].stats.maxHP) * 100) + '%';
			document.getElementById("Hero" + i + "HPNumberID").innerHTML = "" + prettifySub(game.heroes[i].stats.currentHP) + " / " + game.heroes[i].stats.maxHP + "";
			document.getElementById("Hero" + i + "MPBarID").style.width = ((game.heroes[i].stats.currentMP/game.heroes[i].stats.maxMP) * 100) + '%';
			document.getElementById("Hero" + i + "MPNumberID").innerHTML = "" + prettifySub(game.heroes[i].stats.currentMP) + " / " + game.heroes[i].stats.maxMP + "";
			document.getElementById("Hero" + i + "EXPBarID").style.width = ((game.heroes[i].heroEXP/(game.heroes[i].heroLevel*100)) * 100) + '%';
			document.getElementById("Hero" + i + "EXPNumberID").innerHTML = "" + prettifySub(game.heroes[i].heroEXP) + " / " + (game.heroes[i].heroLevel*100) + "";
	}
}

function message(mColor,messageString) {
	switch(mColor){
		case "Red":
			var textType = "danger";
			break;
		case "Blue":
			var textType = "primary";
			break;
		case "Green":
			var textType = "success";
			break;
		case "Yellow":
			var textType = "warning";
			break;
		case "White":
			var textType = "white";
			break;
	}
	var log = document.getElementById("consoleID");
	log.innerHTML += "<span class='logmessage text-" + textType +"'>" + messageString + "</span><br />";
	log.scrollTop = log.scrollHeight;
	var toChange = document.getElementsByClassName('logmessage');
	toChange2 = nodeToArray(toChange);
	var messageCount = toChange2.length;
	if (messageCount > 999){
		for (var count = 0; count < (messageCount - 999); count++){
			log.removeChild(toChange[count]);
		}
	}
}