// [FOR DEBUGGING]

// One-off with noise
SLIDES.push({
	id: "noise",
	onstart: function(self){

		var o = self.objects;

		Tournament.resetGlobalVariables();

		// Iterated Simulation
		self.add({id:"iterated", type:"Iterated", x:130, y:133});
		o.iterated.dehighlightPayoff();
		o.iterated.playerA.chooseHat("tft");

		// Words on top & bottom
		self.add({
			id:"topWords", type:"TextBox", text_id:"noise_1",
			x:130, y:35, width:700, height:100, align:"center"
		});
		self.add({
			id:"btmWords", type:"TextBox", text_id:"noise_1_end",
			x:130, y:410, width:700, height:100, align:"center"
		});

		// STAGES
		var STAGES = [
			{button:"cooperate", message:"cooperate"},
			{button:"cooperate", message:"TRIP"},
			{button:"cooperate", message:"cooperate"},
			{button:"cheat", message:"cheat"}
		];
		var STAGE_INDEX = 0;

		// ONE Button
		self.add({
			id:"button", type:"Button",
			x:383, y:463, text_id:"label_cooperate", uppercase:true,
			onclick: function(){

				// Make sim go
				var s = STAGES[STAGE_INDEX];
				publish("iterated/"+s.message);
				o.button.deactivate();

				// Hide words
				_hide(o.topWords); 
				_hide(o.btmWords); 

			}
		});

		// Re-activate...
		var _foreverWar = false;
		var _foreverMove = "cheat";
		listen(self, "iterated/round/end", function(){

			if(_foreverWar){
				publish("iterated/"+_foreverMove);
				if(_foreverMove=="cheat") _foreverMove="cooperate";
				else if(_foreverMove=="cooperate") _foreverMove="cheat";
			}else{

				STAGE_INDEX++;

				// New words
				o.topWords.setTextID("noise_"+(STAGE_INDEX+1));
				o.btmWords.setTextID("noise_"+(STAGE_INDEX+1)+"_end");
				_fadeIn(o.topWords, 100);
				_fadeIn(o.btmWords, 300);

				// Next stage
				if(STAGE_INDEX>=STAGES.length){

					publish("iterated/cooperate");
					_foreverWar = true;
					
					// The FINAL buttons... remove the button & put it back in.
					self.remove("button");
					self.add({
						id:"button", type:"Button",
						x:304, y:463, text_id:"noise_5_btn", size:"long",
						message: "slideshow/scratch"
					});

				}else{

					// Reactivate buttons
					var s = STAGES[STAGE_INDEX];
					o.button.setText("label_"+s.button);
					o.button.activate();

				}

			}

		});

	},
	onend: function(self){
		unlisten(self);
		self.clear();
	}
});