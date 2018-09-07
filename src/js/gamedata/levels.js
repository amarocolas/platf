function getIntro(){
	var level = {};

	level.blocks=[
		{x: 50, y: 520, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 100, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 300, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 600, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 800, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1000, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1200, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1600, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1800, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2000, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2200, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2400, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2600, y: 235, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2800, y: 235, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 3000, y: 235, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 0, y: 550, width: 3200, height: 50, color: "#57B033"}
	];

	level.enemies = [
		{x: 200, y: 355, type:"rabbit"},
		{x: 800, y: 355, type:"fox"},
		{x: 400, y: 355, type:"skank"},
		{x: 600, y: 355, type:"eagle"}
	];

	level.levelStuff = [
		{x: 200, y: 355, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 200, y: 325, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 200, y: 295, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 200, y: 265, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 230, y: 355, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"}
	];

	level.levelExit = {x: 3150, y: 400, width: 50, height: 100, color: "hsla(322, 0%, 0%, 1)"};

	return level;

}

module.exports = getIntro;