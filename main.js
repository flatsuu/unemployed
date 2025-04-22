var saveGame = localStorage.getItem('unemployedSave')
var gameData = {
    cans: 0,
    cash: 0,
    cansPerClick: 1,
    cansPerSec: 1,
    cansPerClickCost: 10,
    autoClickCost: 5,
    lastTick: Date.now()
}


function update(id, content) {
    document.getElementById(id).innerHTML = content;
}

function drinkFuel() {
    gameData.cans += gameData.cansPerClick
    update("fuelConsumed", "Fuel consumed: " + Math.round(gameData.cans) + " Cans")
}


function sellCans() {
    gameData.cash += Math.round(gameData.cans) * 0.25
    gameData.cans -= Math.round(gameData.cans)
    update("fuelConsumed", "Fuel consumed: " + Math.round(gameData.cans) + " Cans")
    update("cashCollected", "Cash collected: " + format(gameData.cash) + "€")
}

function buyCansPerClick() {
    if (gameData.cash >= gameData.cansPerClickCost) {
        gameData.cash -= gameData.cansPerClickCost
        gameData.cansPerClick += 1
        gameData.cansPerClickCost *= 2
        update("cashCollected", "Cash collected: " + format(gameData.cash) + "€")
        update("perClickUpgrade", "Upgrade fridge (currently level " + gameData.cansPerClick +  ") Cost: " + gameData.cansPerClickCost + "€")
    }
}

function buyAutoClick() {
    if (gameData.cash >= gameData.autoClickCost) {
        gameData.cash -= gameData.autoClickCost
        gameData.cansPerSec += 1
        gameData.autoClickCost *= 2
        update("cashCollected", "Cash collected: " + format(gameData.cash) + "€")
        update("autoClickUpgrade", "Upgrade auto (currently level " + gameData.cansPerSec +  ") Cost: " + gameData.autoClickCost + "€")
    }
}


var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now() // update lastTick

    gameData.cans += gameData.cansPerSec * (diff / 1000)
    update("fuelConsumed", "Fuel consumed: " + Math.round(gameData.cans) + " Cans")
   

}, 10)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("unemployedSave", JSON.stringify(gameData))
}, 15000)

function format(number) {
	roundnum = number * 100
    number = Math.round(roundnum) / 100
    return number
}


if (typeof saveGame.cans != "undefined") gameData.cans = saveGame.cans;
if (typeof saveGame.cash != "undefined") gameData.cash = saveGame.cash;
if (typeof saveGame.cansPerClick != "undefined") gameData.cansPerClick = saveGame.cansPerClick;
if (typeof saveGame.cansPerClickCost != "undefined") gameData.cansPerClickCost = saveGame.cansPerClickCost;
if (typeof saveGame.lastTick != "undefined") gameData.lastTick = saveGame.lastTick;