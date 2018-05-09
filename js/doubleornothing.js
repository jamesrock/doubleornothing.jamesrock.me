(function() {

	_gaq = [];
	_gaq.push(["_setAccount", "UA-55361745-3"]);
	_gaq.push(["_trackPageview"]);

	var
	user = ROCK.GUID.get(),
	outputInc = 0,
	multiplier = 2,
	deposited = 0,
	winnings = 0,
	wallet = 0,
	unencode = function(string) {

		return ROCK.JQUERY.createNode("div").html(string).text();

	},
	toCurrency = function(val) {

		return ("&pound;" + val.toFixed(2));

	},
	depositAmount = function(amount) {

		wallet += amount;
		deposited += amount;
		button.html(toCurrency(wallet)).attr("data-win", "");
		_gaq.push(["_trackEvent", user, "deposit", getOutput()]);

	},
	pressButton = function() {

		return (ROCK.MATH.random(1, multiplier)===1);

	},
	getOutput = function() {

		var _return = (outputInc + ":" + deposited + "/" + winnings);
		outputInc ++;
		return _return;

	},
	app = ROCK.JQUERY.createNode("div").prependTo("body"),
	buttonWrap = ROCK.JQUERY.createNode("div").appendTo(app),
	button = ROCK.JQUERY.createNode("a").html(toCurrency(deposited)).attr("href", "#").attr("data-role", "button").on("click", function() {

		return false;

	}).on("mousedown", function() {

		button.attr("data-win", "");

	}).on("mouseup", function() {

		var
		result = pressButton(),
		toSet;

		if(wallet<=0) {

			alert("You have 0 stake.");
			button.attr("data-win", "");
			return;

		};

		if(result) {

			wallet += (wallet*multiplier);

		}
		else {

			wallet -= wallet;

		};

		winnings = (wallet-deposited);

		wallet = ROCK.MATH.roundTo(wallet, 100);
		winnings = ROCK.MATH.roundTo(winnings, 100);

		button.html(toCurrency(wallet)).attr("data-win", result);

		_gaq.push(["_trackEvent", user, "button", getOutput()]);

		return false;

	}).appendTo(buttonWrap),
	depositsWrap = ROCK.JQUERY.createNode("div").appendTo(app),
	deposit1 = ROCK.JQUERY.createNode("a").attr("data-role", "deposit").attr("title", "Deposit " + toCurrency(1)).attr("href", "#").html("+" + toCurrency(1)).appendTo(depositsWrap).on("click", function() {

			depositAmount(1);
			return false;

	}),
	deposit5 = ROCK.JQUERY.createNode("a").attr("data-role", "deposit").attr("title", "Deposit " + toCurrency(5)).attr("href", "#").html("+" + toCurrency(5)).appendTo(depositsWrap).on("click", function() {

			depositAmount(5);
			return false;

	}),
	deposit10 = ROCK.JQUERY.createNode("a").attr("data-role", "deposit").attr("title", "Deposit " + toCurrency(10)).attr("href", "#").html("+" + toCurrency(10)).appendTo(depositsWrap).on("click", function() {

			depositAmount(10);
			return false;

	}),
	finishWrap = ROCK.JQUERY.createNode("div").appendTo(app),
	finish = ROCK.JQUERY.createNode("a").attr("href", "#").html("withdraw winnings").attr("title", "withdraw winnings").on("click", function() {

		//console.log((user + ": " + deposited + "/" + winnings));
		//_gaq.push(["_trackEvent", user, "finish", getOutput()]);

		var message = unencode("Total Winnings:\n " + toCurrency(winnings));

		alert(message);

		window.location.href = window.location.href;

		return false;

	}).appendTo(finishWrap);

})();
