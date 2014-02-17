var final_transcript;
var App = {
	_timeout: 2000,
	_score: 0,
	_colors: ["Vermelho", "Azul", "Preto", "Verde", "Amarelo", "Laranja"],
	_hexa: ["red", "blue", "black", "green", "yellow", "laranja"],
	_actColor: "",
	_selector: document.querySelector("h1"),
	setup: function(){

		App.Colors.random();
		App.Speech.recognition();

	},
	result: function(r){

		if(r === true) {
			App._score++;
		}else if(r === false) {
			App._score = 0;
		}

		App.Colors.random();

	},
	Colors: {
		random: function(){

			var color = Math.floor(Math.random() * 6),
				hexa = Math.floor(Math.random() * 6);

			App._selector.innerHTML = App._colors[color];
			App._selector.style.color = App._hexa[hexa];
			App._actColor = App._colors[hexa]; //color's name of text color, to be used on Web Speech Recognition

		}
	},
	Speech: {
		recognition: function(){

			var recognition = new webkitSpeechRecognition();

			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = 'pt-BR';

			recognition.onstart = function() { console.log('comecou'); }
			recognition.onresult = function(event) {
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if(event.results[i][0].transcript == App._actColor) {
						App.result(true);
					}else{
						App.result(false);
					}
				}

			}
			recognition.onend = function() { console.log('terminou'); recognition.start(); }

			recognition.start();

		}
	}
};

App.setup();