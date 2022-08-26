// [FOR DEBUGGING]

// One-off with noise
SLIDES.push({
	id: "noise",
	onstart: function(self){

		var o = self.objects;

		Tournament.resetGlobalVariables();

		publish("slideshow/scratch")

	},
	onend: function(self){
		unlisten(self);
		self.clear();
	}
});

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

SLIDES.push({
    onstart: function(self){

        var o = self.objects;
        // Words
        var words = Words.get("noise_evo_2").replace(/\[CHAR\]/g, "<span class='"+_.answer+"'>"+Words.get("label_"+_.answer)+"</span>");
        o.text.setText(words);
        _hide(o.text); _fadeIn(o.text, 100);
        /////////////////////////////////////////
        // BUTTONS for playing //////////////////
        /////////////////////////////////////////
        var x = 172;
        var y = 175;
        var dy = 70;
        self.add({
            id:"playButton", type:"Button", size:"short",
            x:x, y:y, text_id:"label_start",
            onclick: function(){
                if(o.tournament.isAutoPlaying){
                    publish("tournament/autoplay/stop");
                }else{
                    publish("tournament/autoplay/start");
                }
            }
        });
        listen(_, "tournament/autoplay/stop",function(){
            o.playButton.setText("label_start");
        });
        listen(_, "tournament/autoplay/start",function(){
            o.playButton.setText("label_stop");
        });
        self.add({
            id:"stepButton", type:"Button",  size:"short",
            x:x, y:y+dy, text_id:"label_step", message:"tournament/step"
        });
        self.add({
            id:"resetButton", type:"Button", size:"short",
            x:x, y:y+dy*2, text_id:"label_reset", message:"tournament/reset"
        });
        /////////////////////////////////////////
        // SHOW THE NEXT WORDS, and a NEXT
        // NEXT
        var reproduceSteps = 0;
        _.misc = {};
        listen(_.misc, "tournament/step/completed", function(step){
            if(step=="reproduce"){
                reproduceSteps++;
                if(reproduceSteps==6){
                    
                    // WORDS
                    var words = (_.answer=="pavlov") ? Words.get("noise_evo_2_2_correct") : Words.get("noise_evo_2_2_incorrect");
                    words += " ";
                    words += Words.get("noise_evo_2_2");
                    self.add({
                        id:"text_next", type:"TextBox",
                        x:510, y:160, width:450,
                        text: words
                    });
                    _hide(o.text_next); _fadeIn(o.text_next, 100);
                    // BUTTON
                    self.add({
                        id:"btn_next", type:"Button", x:510, y:366, 
                        text_id:"noise_evo_2_2_btn", size:"long",
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