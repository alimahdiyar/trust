// [FOR DEBUGGING]

// New characters
SLIDES.push({

	onstart: function(self){

		// WORDS
		self.add({
			id:"score1", type:"TextBox",
			x:160, y:20, width:640,
			text_id:"noise_characters"
		});

		// CHARS
		self.add({
			id:"char_tf2t", type:"CharacterTextBox",
			x:160, y:70, width:640,
			character: "tf2t"
		});
		self.add({
			id:"char_pavlov", type:"CharacterTextBox",
			x:160, y:190, width:640,
			character: "pavlov"
		});
		self.add({
			id:"char_random", type:"CharacterTextBox",
			x:160, y:320, width:640,
			character: "random"
		});

		// Next...
		self.add({
			id:"next", type:"TextBox",
			x:160, y:420, width:640, align:"right",
			text_id: "noise_characters_end"
		});

		// Next Button!
		self.add({
			id:"next_button", type:"Button", x:460, y:460, size:"long",
			text_id:"noise_characters_btn",
			message:"slideshow/scratch"
		});

	},
	onend: function(self){
		self.clear();
	}

});

// Tournament: simpleton wins
SLIDES.push({

	//id:"noise",// [FOR DEBUGGING]

	onstart: function(self){

		var o = self.objects;

		// Tournament
		Tournament.resetGlobalVariables();
		Tournament.INITIAL_AGENTS = [
			{strategy:"tf2t", count:3},
			{strategy:"pavlov", count:3},
			{strategy:"random", count:3},
			{strategy:"tft", count:3},
			{strategy:"all_c", count:13}
		];
		PD.NOISE = 0.05;
		self.add({id:"tournament", type:"Tournament", x:-20, y:20});

		// Words to the side
		self.add({
			id:"text", type:"TextBox",
			x:510, y:30, width:450, height:500,
			text_id:"noise_evo_1"
		});

		// BETS
		var _addButton = function(character, x, y){
			(function(character, x, y){
				self.add({
					id:"bet_"+character, type:"Button", x:x, y:y, 
					text_id: "icon_"+character,
					tooltip: "who_"+character,
					onclick:function(){
						_.answer = character;
						publish("slideshow/next");
					}
				});
			})(character, x, y);
		};
		var x = 510;
		var y = 295;
		var dx = 200;
		var dy = 70;
		_addButton("tf2t", x, y); _addButton("pavlov", x+dx, y);
		_addButton("random", x, y+dy); _addButton("tft", x+dx, y+dy);
		_addButton("all_c", x, y+dy*2);

		// WHO'S WHO?
		self.add({
			id:"forgot", type:"TextBox",
			x:715, y:435, width:190, height:50,
			align:"center", color:"#aaa", size:15,
			text_id:"forgot_whos_who"
		});

	},
	onend: function(self){
		self.remove("bet_all_c");
		self.remove("bet_tft");
		self.remove("bet_tf2t");
		self.remove("bet_pavlov");
		self.remove("bet_random");
		self.remove("forgot");
	}
});

