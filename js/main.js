var boxPos = 10,
    boxVelocity = 0.08,
    limit = 300,
    lastFrameTimeMs = 0,
    maxFPS = 60,
    delta = 0,
    timestep = 1000 / 60;

var hpval = 100;
function prettifySub(number){
	number = parseFloat(number.toFixed(3));
	if (number >= 1000) number = 999;
	number = number.toString();
	var hasDecimal = number.split('.');
	if (typeof hasDecimal[1] === 'undefined' || hasDecimal[0].length >= 3) return number.substring(0, 3);
	return number.substring(0, 4);	
}

function update(delta) {

    game.global.time += 1;
	game.global.totalTime += 1;
	game.global.combatTimer += 1;
	updateBars();
	
	if (game.global.combatTimer >= 90){
		combatRun();
	}
}




function mainLoop(timestamp) {

    // Throttle the frame rate.    
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
    }
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);



document.getElementById("endlessWavesBegin").onclick = function() {
	rollEncounter();
}

document.getElementById("save").onclick = function() {
	save();
	
	alert(JSON.stringify(game, null, 4));
}

document.getElementById("exportSave").onclick = function() {
	console.log(game);
	for (var i = 0; i < game.heroes.length; i++){
		console.log(game.heroes[i]);
	}
	
}

document.getElementById("importSave").onclick = function() {
	var tempPick = getRandomInt(0, game.encounter.length);
	game.encounter[tempPick].stats.currentHP -= 1;
	
}

document.getElementById("wipeSave").onclick = function() {
	$('#wipeModal').modal('show');
}

document.getElementById("wipeSaveFinal").onclick = function() {
	resetGame();
	save();
	window.location.reload(false); 
}

document.getElementById("newPlayerCharacterButton").onclick = function() {
	$('#newPlayerModal').modal('show');
}

document.getElementById("newPlayerStatRoll").onclick = function() {
	rollNewPlayerStats();
}

function rollNewPlayerStats() {
	document.getElementById("newPlayerStr").value = getRandomInt(3, 18);
	document.getElementById("newPlayerDex").value = getRandomInt(3, 18);
	document.getElementById("newPlayerCon").value = getRandomInt(3, 18);
	document.getElementById("newPlayerInt").value = getRandomInt(3, 18);
	document.getElementById("newPlayerWis").value = getRandomInt(3, 18);
	document.getElementById("newPlayerCha").value = getRandomInt(3, 18);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function nodeToArray(nodeList){
	for(var a=[], l=nodeList.length; l--; a[l]=nodeList[l]);
    return a;
}

function resetGame() {
	//Hide all the stuff that needs to be hidden etc.
	game = null;
	game = newGame();
}
