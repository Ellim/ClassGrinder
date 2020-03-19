function combatRun() {
	game.global.combatTimer = 0;
	if (typeof game.encounter[0] != 'undefined'){
		if (game.heroes.length > 0) {
			for (var i = 0; i < game.heroes.length; i++) {
				var dmg = game.heroes[i].stats.STR;
				var tempPick = getRandomInt(0, game.encounter.length);
				message("Green",game.heroes[i].heroName + " hits " + game.encounter[tempPick].monsterName + (tempPick+1) + " for [" + Math.ceil(dmg) + "] points of damage!");
				game.encounter[tempPick].stats.currentHP -= Math.ceil(dmg);
			}
		}
		
		if (game.encounter.length > 0) {
			for (var i = 0; i < game.encounter.length; i++) {
				var dmg = (game.encounter[i].stats.STR/10);
				var tempPick = getRandomInt(0, game.heroes.length);
				message("Red",game.encounter[i].monsterName + " " + (i+1) + " hits " + game.heroes[tempPick].heroName + " for [" + Math.ceil(dmg) + "] points of damage!");
				game.heroes[tempPick].stats.currentHP -= Math.ceil(dmg);
			}
		}
		
		for (var i = 0; i < game.encounter.length; i++){
			if (game.encounter[i].stats.currentHP < 1){
				message("Yellow",game.encounter[i].monsterName + (i+1) + " has been killed!");
				message("Yellow","Earned " + game.encounter[i].monsterEXP + " EXP!");
				for (var j = 0; j < game.heroes.length; j++) {
					game.heroes[j].heroEXP = game.heroes[j].heroEXP + game.encounter[i].monsterEXP;
					document.getElementById("Hero" + j + "EXPBarID").style.width = ((game.heroes[j].heroEXP/(game.heroes[j].heroLevel*100)) * 100) + '%';
					document.getElementById("Hero" + j + "EXPNumberID").innerHTML = "" + game.heroes[j].heroEXP + " / " + (game.heroes[j].heroLevel*100) + "";
					if (game.heroes[j].heroEXP >= (game.heroes[j].heroLevel*100)) {
						heroLevelUp(j);
					}
				}
				var tempelement = document.getElementById("Monster" + i + "TableID");
				tempelement.outerHTML = "";
				delete tempelement;
				game.encounter.splice(i, 1);
				addMonsterToStage();
			}
		}
	}
}