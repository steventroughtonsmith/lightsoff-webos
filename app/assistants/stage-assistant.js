function StageAssistant(argFromPusher) {
	
	// Setup Application Menu
	//this.controller.setupWidget(Mojo.Menu.appMenu, newsMenuAttr, newsMenuModel);
	
}


var buttonPressedSoundPlayer;

var highestLevel = 0;

var options = {
name: "LightsOffSaveData", //Name used for the HTML5 database name. (required)
version: 1, //Version number used for the HTML5 database. (optional, defaults to 1)	
replace: false // open an existing depot
};	


StageAssistant.prototype.setup = function() {
	
    newsMenuAttr = {omitDefaultItems: true};
	newsMenuModel = {
    visible: true,
    items: [
			Mojo.Menu.editItem,
			{label: "About Lights Off...", command: 'do-aboutLightsOff'},
			/*{label: "Choose Level...", command: 'do-selectLevel'},*/
			]
	};
	
	//this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);
	
	
	this.db = new Mojo.Depot(options, this.dbSuccess, this.dbFailure); 
	
	
	this.db.simpleGet("maxlevel", this.dbGetSuccess, this.dbFailure);
	
	
	//this.controller.pushScene("game");
	
	
  	this.controller.pushScene({name: 'game',sceneTemplate: "game/game-scene"});
	
};

StageAssistant.prototype.handleCommand = function(event) {
	var currentScene = this.controller.activeScene();
	if(event.type == Mojo.Event.command) {
		switch(event.command) {
			case 'do-aboutLightsOff':
				currentScene.showAlertDialog({
											 onChoose: function(value) {},
											 title: "Lights Off - v1.0.4",
											 message: "Copyright 2008-2010, Steven Troughton-Smith.",
											 choices:[
													  {label: "OK", value:""}
													  ]
											 });
				
			case 'do-selectLevel':
				currentScene.showAlertDialog({
											 onChoose: function(value) {},
											 title: "Lights Off - v1.0.4",
											 message: "Copyright 2008-2010, Steven Troughton-Smith.",
											 choices:[
													  {label: "OK", value:""}
													  ]
											 });
				
				
				break;
		}
	}
};

StageAssistant.prototype.cleanup = function() {
	
};

StageAssistant.prototype.dbSuccess = function(object) {
	console.log("***** depot operation success!");
}

StageAssistant.prototype.dbGetSuccess = function(object) {
	
	if (object != null && object >= 0 && object <= 211)
	{
		currentLevel = object;
		highestLevel = object;
	}
	else
	{
		currentLevel = 0;
	}
	
}


StageAssistant.prototype.dbFailure = function(transaction, result) {
	document.write("<h3> FAIL"+result+"</h3>")
	console.log("***** depot failure: " + result.message);
}

StageAssistant.prototype.updateMaxLevel = function() {
	this.db = new Mojo.Depot(options, this.dbSuccess, this.dbFailure); 
	
	
	if (currentLevel > highestLevel)
	{
		this.db.add("maxlevel", currentLevel, this.dbSuccess, this.dbFailure); 
	}
}



