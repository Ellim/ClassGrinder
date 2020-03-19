function HeroCharacter(name,gender,race,baseclass,Str,Dex,Int,Wis,Con,Cha){
	this.heroName = name;
	this.heroGender = gender;
	this.heroRace = race;
	this.heroClass = baseclass;
	this.heroLevel = 1;
	this.heroEXP = 0;
	switch(baseclass){
		case "Warrior":
			thpDie = 12;
			break;
		case "Mage":
			thpDie = 6;
			break;
		case "Thief":
			thpDie = 8;
			break;
		case "Cleric":
			thpDie = 6;
			break;
		case "Monk":
			thpDie = 10;
			break;
	}
	this.stats = {
		currentHP : 20,
		maxHP : 20,
		currentMP : 20,
		maxMP : 20,
		STR : Str,
		DEX : Dex,
		INT : Int,
		WIS : Wis,
		CON : Con,
		CHA : Cha,
		hpDie : thpDie
	};
	this.inventory = {};
	this.equipped = {
		head : "",
		neck1 : "",
		neck2 : "",
		shoulders : "",
		back : "",
		chest : "",
		arms : "",
		wristL : "",
		wristR : "",
		hands : "",
		ringL : "",
		ringR : "",
		waist : "",
		legs : "",
		feet : "",
		floating : "",
		weapon : ""
	};
}

function heroLevelUp(heroNumber){
	game.heroes[heroNumber].heroLevel += 1;
	game.heroes[heroNumber].heroEXP = 0;
	game.heroes[heroNumber].stats.maxHP += getRandomInt(1, game.heroes[heroNumber].stats.hpDie);
	game.heroes[heroNumber].stats.currentHP = game.heroes[heroNumber].stats.maxHP;
	document.getElementById("Hero" + heroNumber + "Level").innerHTML = game.heroes[heroNumber].heroLevel;
}

function addHeroToStage(){
	var tempInner = document.getElementById("HeroListDiv").innerHTML;
	document.getElementById("HeroListDiv").innerHTML = "";
	for (tempnum = 0; tempnum < game.heroes.length; tempnum++){
		
		document.getElementById("HeroListDiv").innerHTML = tempInner + "<p><div class='media bg-info'>	<div class='media-left media-top text-center'><a class='text-dark' data-toggle='collapse' href='#Hero" + tempnum + "Collapse' aria-expanded='false' aria-controls='Hero" + tempnum + "Collapse'><img class='media-object' src='img/lady.png' alt='...'><br/>" + game.heroes[tempnum].heroName + "<br/>" + game.heroes[tempnum].heroGender + " " + game.heroes[tempnum].heroRace + " " + game.heroes[tempnum].heroClass + "</a></div><div class='media-body'><a><h4 class='media-heading'>Level <span id='Hero" + tempnum + "Level'>" + game.heroes[tempnum].heroLevel + "</span></h4></a><div class='progress'><div class='progress-bar progress-bar-health' id='Hero" + tempnum + "HPBarID' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%;'><span id='Hero" + tempnum + "HPNumberID'>20 / 20</span></div></div><div class='progress'><div class='progress-bar progress-bar-mana' id='Hero" + tempnum + "MPBarID' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%;'><span id='Hero" + tempnum + "MPNumberID'>20 / 20</span></div></div><div class='progress'><div class='progress-bar progress-bar-exp' id='Hero" + tempnum + "EXPBarID' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%;'><span id='Hero" + tempnum + "EXPNumberID'>0 / 100</span></div></div><div class='collapse in' id='Hero" + tempnum + "Collapse'>Stats:<br/>Strength: " + game.heroes[tempnum].stats.STR + "<br/>Dexterity: " + game.heroes[tempnum].stats.DEX + "<br/>Intellect: " + game.heroes[tempnum].stats.INT + "<br/>Wisdom: " + game.heroes[tempnum].stats.WIS + "<br/>Constitution: " + game.heroes[tempnum].stats.CON + "<br/>Charisma: " + game.heroes[tempnum].stats.CHA + "</div><div class='btn-group btn-group-justified' role='group'><div class='btn-group' role='group'><button class='btn btn-block btn-warning' id='Hero" + tempnum + "TalentButton'>Talents <i class='fa fa-star-o' aria-hidden='true'></i></button></div><div class='btn-group' role='group'><button class='btn btn-block btn-info' id='Hero" + tempnum + "InventoryButton'>Inventory <i class='fa fa-suitcase' aria-hidden='true'></i></button></div></div></div></div></p>";
		var tempInner = document.getElementById("HeroListDiv").innerHTML;
		
	}
	document.getElementById("partySizeSpan").innerHTML = game.heroes.length;
	document.getElementById("partySizeMaxSpan").innerHTML = game.global.heroMax;
	if (game.heroes.length >= game.global.heroMax) {
		$('#newPlayerCharacterButton').prop('disabled', true);
	}
}

document.getElementById("newPlayerCreateButton").onclick = function() {
	if (game.heroes.length < game.global.heroMax) {
	if (newPlayerName.value != "" && newPlayerName.value.length < 10){
	var tempgender = "";
	var m = document.getElementById("newPlayerMale").checked;
	var f = document.getElementById("newPlayerFemale").checked;
	if (m) {tempgender = "<i class='fa fa-mars' aria-hidden='true'></i>"} 
	else if (f) {tempgender = "<i class='fa fa-venus' aria-hidden='true'></i>"} 
	else {tempgender = "<i class='fa fa-transgender-alt' aria-hidden='true'></i>"}
	var tempnum = game.heroes.length;
	var tempstr = document.getElementById("newPlayerStr").value;
	var tempdex = document.getElementById("newPlayerDex").value;
	var tempint = document.getElementById("newPlayerInt").value;
	var tempwis = document.getElementById("newPlayerWis").value;
	var tempcon = document.getElementById("newPlayerCon").value;
	var tempcha = document.getElementById("newPlayerCha").value;
	game.heroes[game.heroes.length] = new HeroCharacter(newPlayerName.value,tempgender,newPlayerRace.value,newPlayerClass.value,tempstr,tempdex,tempint,tempwis,tempcon,tempcha);
	document.getElementById("newPlayerName").value = "";
	document.getElementById("newPlayerRace").value = "Human";
	document.getElementById("newPlayerClass").value = "Warrior";
	document.getElementById("HeroListDiv").innerHTML = "";
	addHeroToStage();
	
	$('#newPlayerModal').modal('hide');
	if (game.heroes.length >= game.global.heroMax) {
		$('#newPlayerCharacterButton').prop('disabled', true);
	}
	} else {message("You need to name your hero a name between one and ten characters long!")}
	}
}