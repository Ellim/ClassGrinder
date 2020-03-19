function combatRun() {
	game.global.combatTimer = 0;
	if (typeof game.encounter[0] != 'undefined'){
		if (game.heroes.length > 0) {
			for (var i = 0; i < game.heroes.length; i++) {
				var dmg = game.heroes[i].stats.STR;
				if (game.encounter.length > 0) {
					var tempPick = getRandomInt(0, game.encounter.length);
					game.encounter[tempPick].stats.currentHP -= Math.ceil(dmg);
					message("Green",game.heroes[i].heroName + " hits " + game.encounter[tempPick].monsterName + (tempPick+1) + " for [" + Math.ceil(dmg) + "] points of damage!");
					for (var j = 0; j < game.encounter.length; j++){
						if (game.encounter[j].stats.currentHP < 1){
							message("Yellow",game.encounter[j].monsterName + (j+1) + " has been killed!");
							message("Yellow","Earned " + game.encounter[j].monsterEXP + " EXP!");
							for (var k = 0; k < game.heroes.length; k++) {
								game.heroes[k].heroEXP = game.heroes[k].heroEXP + game.encounter[j].monsterEXP;
								document.getElementById("Hero" + k + "EXPBarID").style.width = ((game.heroes[k].heroEXP/(game.heroes[k].heroLevel*100)) * 100) + '%';
								document.getElementById("Hero" + k + "EXPNumberID").innerHTML = "" + game.heroes[k].heroEXP + " / " + (game.heroes[k].heroLevel*100) + "";
								if (game.heroes[k].heroEXP >= (game.heroes[k].heroLevel*100)) {
									heroLevelUp(k);
								}
							}
							var tempelement = document.getElementById("Monster" + j + "TableID");
							tempelement.outerHTML = "";
							delete tempelement;
							game.encounter.splice(j, 1);
							addMonsterToStage();
						}
					}
				}


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


	}
}
