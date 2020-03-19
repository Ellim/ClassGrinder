function Monster(name,gender,race,monsterclass,level,mexp,MHP,MMP,Str,Dex,Int,Wis,Con,Cha,loottable){
	this.monsterName = name;
	this.monsterGender = gender;
	this.monsterRace = race;
	this.monsterClass = monsterclass;
	this.monsterLevel = level;
	this.monsterEXP = mexp;
	this.stats = {
		currentHP : MHP,
		maxHP : MHP,
		currentMP : MMP,
		maxMP : MMP,
		STR : Str,
		DEX : Dex,
		INT : Int,
		WIS : Wis,
		CON : Con,
		CHA : Cha
	};
	this.drops = {
		loottable
	};
}


function rollEncounter(){
		if (game.encounter != null) {game.encounter = [];}
		var encounterSize = getRandomInt(1,5);
		for (i = 0; i < encounterSize; i++){
			var tempstr = getRandomInt(8, 12);
			var tempdex = getRandomInt(8, 12);
			var tempint = getRandomInt(8, 12);
			var tempwis = getRandomInt(8, 12);
			var tempcon = getRandomInt(8, 12);
			var temphp = getRandomInt(10, 20);
			var tempmp = getRandomInt(10, 20);
			var tempcha = getRandomInt(8,12);
			game.encounter[i] = new Monster("Goblin","Male","Goblin","Warrior",1,50,temphp,tempmp,tempstr,tempdex,tempint,tempwis,tempcon,tempcha,"");
		}
		addMonsterToStage();
}

function addMonsterToStage(){
	clearMonsterStage();
	for (i = 0; i < game.encounter.length; i++){
		var tempInner = document.getElementById("MonsterStageDiv").innerHTML;
		
		document.getElementById("MonsterStageDiv").innerHTML = tempInner + "<table id='Monster" + i + "TableID' class='table table-condensed table-bordered'><tr><th class='text-center success'>HP</th><th class='text-center info'>MP</th><th class='text-center'>" + game.encounter[i].monsterName + "</th></tr> <tr> <td style='vertical-align: middle;'> <div class='progress'><div class='progress-bar progress-bar-health' id='Monster" + i + "HPBarID' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%;'><span id='Monster" + i + "HPNumberID'>20 / 20</span></div></div></td><td style='vertical-align: middle;'><div class='progress'><div class='progress-bar progress-bar-mana' id='Monster" + i + "MPBarID' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%;'><span id='Monster" + i + "MPNumberID'>20 / 20</span></div></div></td><td><img src='img/goblin.png' alt='...'></td></tr><tr><td style='vertical-align: middle;'> <span>STR " + game.encounter[i].stats.STR + "</span></td><td style='vertical-align: middle;'> <span>DEX " + game.encounter[i].stats.DEX + "</span></td><td style='vertical-align: middle;'> <span>INT " + game.encounter[i].stats.INT + "</span></td></tr><tr><td style='vertical-align: middle;'> <span>WIS " + game.encounter[i].stats.WIS + "</span></td><td style='vertical-align: middle;'> <span>CON " + game.encounter[i].stats.CON + "</span></td><td style='vertical-align: middle;'> <span>CHA " + game.encounter[i].stats.CHA + "</span></td></tr></table>";
	}
}

function rollMonster() {
	if (getRandomInt(0,2) >= 1) {
		var tempgender = "male";
		message(tempgender);
	} else {var tempgender = "female";
		message(tempgender)};
	
	switch (getRandomInt(0,5)) {
		case 0:
			message("Goblin");
			message("Warrior");
			break;
		case 1:
			message("Slime");
			message("Mage");
			break;
		case 2:
			message("Skeleton");
			message("Warrior");
			break;
		case 3:
			message("Spider");
			message("Thief");
			break;
		case 4:
			message("Turtle");
			message("Warrior");
			break;
	}
	
	
}

function newMonsterDictionary() {
	var returnValue = {
		goblin: {
			name: "Goblin",
			race: "Goblin",
			mosterclass: "Warrior",
			baseHP: 5,
			baseMP: 2,
			baseEXP: 5,
			baseSTR: 8,
			baseDEX: 6,
			baseINT: 3,
			baseWIS: 3,
			baseCON: 4,
			boostSTR: 1.1,
			boostDEX: 1.05,
			boostINT: .9,
			boostWIS: .95,
			boostCON: 1,
			baseGold: 1
		}
	}
	
return returnValue;

};
function clearMonsterStage(){
	document.getElementById("MonsterStageDiv").innerHTML = "";
}
var monsterDictionary = newMonsterDictionary();