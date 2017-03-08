(function(disable) {
	if(disable) {
		return;
	};
	var ga_script = document.createElement("script");
	ga_script.src = "//www.google-analytics.com/ga.js";
	ga_script.async = "true";
	document.head.appendChild(ga_script);	
})();