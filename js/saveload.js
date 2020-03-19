


function newGame() {
	var players = [];
	var monsters = [];
	var returnValue = {
		global: {
			version: 0.1,
			start: new Date().getTime(),
			time: 0,
			totalTime: 0,
			combatTimer: 0,
			achievementBonus: 0,
			workerTick: 250,
			saveTick: 300000,
			heroMax: 2,
			gold: 100
		},
		heroes: players,
		encounter: monsters
	}
	
return returnValue;

};

var game = newGame();
var workerInterval;
var saveInterval;

function save(exportThis) {
	var saveString = JSON.stringify(game);
	var saveGame = JSON.parse(saveString);
	saveString = LZString.compressToBase64(JSON.stringify(saveGame));
    if (exportThis) return saveString;
	try{
		localStorage.setItem("CGGameSave1",saveString);
		if (localStorage.getItem("CGGameSave1") == saveString){
			message("Game Saved!");
			message(game.heroes.length);
		}
		else {
			message("For some reason, your game is not saving. Make sure you export and back up your save!");
		}
	}
	catch(err){ 
		if(e.name == "NS_ERROR_FILE_CORRUPTED") {
        message("Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites.");
		}
		else
		message("For some reason, your game is not saving. Make sure you export and back up your save!"); 
		}
}

function load(saveString) {
	var savegame;
    if (saveString) {
        savegame = JSON.parse(LZString.decompressFromBase64(document.getElementById("importBox").value.replace(/(\r\n|\n|\r|\s)/gm,"")));
		if (!savegame) {
			message("It looks like your import code isn't working properly.");
			return;
		}
    } else  {
		var unparsedSave;
		try {
			unparsedSave = localStorage.getItem("CGGameSave1");
		}
		catch (e) {
			message("Your browser is preventing ClassGrinder from accessing localStorage, and you will not be able to save or load your progress. <br/>Please check your browser settings to ensure that 3rd party cookies are not disabled, and that you're not using any addons that might interrupt storage!");
			return;
		}
        if (unparsedSave !== null) savegame = JSON.parse(LZString.decompressFromBase64(unparsedSave));
		else {

			newGame();
		}
    }
	if (typeof savegame === 'undefined' || savegame === null || typeof savegame.global === 'undefined') {

		return;
	}
	
	if (typeof savegame.global !== 'undefined') {
        for (var item in game.global) {
            if (item == "time" || item == "start") continue;
            if (typeof savegame.global[item] !== 'undefined') game.global[item] = savegame.global[item];
        }
		for (var i = 0; i < savegame.heroes.length; i++) {
            if (typeof savegame.heroes[i] !== 'undefined') game.heroes[i] = savegame.heroes[i];
        }
		for (var i = 0; i < savegame.encounter.length; i++) {
            if (typeof savegame.encounter[i] !== 'undefined') game.encounter[i] = savegame.encounter[i];
        }
    }

	message("White","Game Loaded!");
	addHeroToStage();
	addMonsterToStage();
}

