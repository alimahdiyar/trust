// [FOR DEBUGGING]


SLIDES.push({
	onstart: function(self){

		var o = self.objects;

		// Words
		o.text.setTextID("noise_evo_3");
		_hide(o.text); _fadeIn(o.text, 100);

		// Tournament
		Tournament.resetGlobalVariables();
		Tournament.INITIAL_AGENTS = [
			{strategy:"tf2t", count:3},
			{strategy:"pavlov", count:3},
			{strategy:"random", count:3},
			{strategy:"tft", count:3},
			{strategy:"all_d", count:13}
		];
		PD.NOISE = 0.05;
		o.tournament.reset();

		// HIDE PLAYER
		_hide(o.playButton); o.playButton.deactivate();
		_hide(o.stepButton); o.stepButton.deactivate();
		_hide(o.resetButton); o.resetButton.deactivate();

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
		_addButton("all_d", x, y+dy*2);

		// WHO'S WHO?
		self.add({
			id:"forgot", type:"TextBox",
			x:715, y:435, width:190, height:50,
			align:"center", color:"#aaa", size:15,
			text_id:"forgot_whos_who"
		});

	},
	onend: function(self){
		self.remove("bet_all_d");
		self.remove("bet_tft");
		self.remove("bet_tf2t");
		self.remove("bet_pavlov");
		self.remove("bet_random");
		self.remove("forgot");
	}
});

SLIDES.push({
	onstart: function(self){

		var o = self.objects;

		// SHOW PLAYER
		_fadeIn(o.playButton,1); o.playButton.activate();
		_fadeIn(o.stepButton,1); o.stepButton.activate();
		_fadeIn(o.resetButton,1); o.resetButton.activate();
		o.playButton.setText("label_start");

		// Words
		var words = Words.get("noise_evo_4").replace(/\[CHAR\]/g, "<span class='"+_.answer+"'>"+Words.get("label_"+_.answer)+"</span>");
		o.text.setText(words);
		_hide(o.text); _fadeIn(o.text, 100);

		/////////////////////////////////////////
		// SHOW THE NEXT WORDS, and a NEXT

		// NEXT
		var reproduceSteps = 0;
		_.misc = {};
		listen(_.misc, "tournament/step/completed", function(step){
			if(step=="reproduce"){
				reproduceSteps++;
				if(reproduceSteps==8){

					// WORDS
					var words = (_.answer=="tf2t") ? Words.get("noise_evo_4_2_correct") : Words.get("noise_evo_4_2_incorrect");
					words += " ";
					words += Words.get("noise_evo_4_2");
					self.add({
						id:"text_next", type:"TextBox",
						x:510, y:116, width:450,
						text: words
					});
					_hide(o.text_next); _fadeIn(o.text_next, 100);

					// BUTTON
					self.add({
						id:"btn_next", type:"Button", x:510, y:446, 
						text_id:"noise_evo_4_2_btn", size:"long",
						message:"slideshow/next"
					});
					_hide(o.btn_next); _fadeIn(o.btn_next, 300);

				}
			}
		});

	},
	onend: function(self){
		self.remove("text_next");
		self.remove("btn_next");
		unlisten(_.misc);
	}
});

SLIDES.push({
	onstart: function(self){

		var o = self.objects;
		_.misc = {};

		// Words
		o.text.setTextID("noise_evo_5");
		_hide(o.text); _fadeIn(o.text, 100);

		// Tournament
		o.tournament.reset();

		// Slider!
		var x = 510;
		var y = 200;
		self.add({
			id:"noiseLabel", type:"TextBox",
			x:x, y:y, width:450, noSelect:true
		});
		self.add({
			id:"noiseSlider", type:"Slider",
			x:x, y:y+55, width:450,
			min:0.00, max:0.50, step:0.01,
			message: "rules/noise"
		});
		var _updateLabel = function(value){
			value = Math.round(value*100);
			var words = Words.get("sandbox_rules_3");
			words = words.replace(/\[N\]/g, value+""); // replace [N] with the number value
			o.noiseLabel.setText("<i>"+words+"</i>");
		};
		listen(_.misc, "rules/noise", function(value){
			_updateLabel(value);
			o.tournament.reset();
		});
		o.noiseSlider.setValue(0.05);
		_updateLabel(0.05);
		_hide(o.noiseLabel); _fadeIn(o.noiseLabel, 300);
		_hide(o.noiseSlider); _fadeIn(o.noiseSlider, 300);

		// Continue whenever you want to...
		listen(_.misc, "tournament/autoplay/start",function(){
			if(_showContinue) _showContinue();
		});
		var _showContinue = function(){
			_showContinue = null;
			self.add({
				id:"continueLabel", type:"TextBox",
				x:565, y:405, width:400,
				align:"right", color:"#aaa", size:17,
				text_id:"noise_evo_5_continue"
			});
			self.add({
				id:"continueButton", type:"Button",
				x:855, y:440, size:"short",
				text_id:"label_continue",
				message: "slideshow/next"
			});
			_hide(o.continueLabel); _fadeIn(o.continueLabel, 100);
			_hide(o.continueButton); _fadeIn(o.continueButton, 100);
		};

	},
	onend: function(self){
		unlisten(_.misc);
		self.remove("noiseLabel");
		self.remove("noiseSlider");
		var o = self.objects;
		if(o.continueLabel) self.remove("continueLabel");
		if(o.continueButton) self.remove("continueButton");
		self.remove("text");
	}
});

SLIDES.push({
	onstart: function(self){

		var o = self.objects;

		// Words
		self.add({
			id:"text", type:"TextBox",
			x:510, y:10, width:450, height:500,
			text_id:"noise_evo_6"
		});
		_hide(o.text); _fadeIn(o.text, 100);

		// Next button
		self.add({
			id:"button", type:"Button", x:510, y:466, 
			text_id:"noise_evo_6_btn", size:"long",
			message:"slideshow/scratch"
		});
		_hide(o.button); _fadeIn(o.button, 500);

	},
	onend: function(self){
		self.clear();
		unlisten(self);
		unlisten(_);
		unlisten(_.misc);
	}
});
