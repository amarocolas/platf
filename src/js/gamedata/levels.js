var levels = [{
	blocks : [
		{x: 0, y: 550, width: 500, height: 50, color: "#57B033"},
		{x: 700, y: 550, width: 300, height: 50, color: "#57B033"},
		{x: 1000, y: 450, width: 300, height: 50, color: "#57B033"},
		{x: 1300, y: 350, width: 300, height: 50, color: "#57B033"},
		{x: 1800, y: 550, width: 400, height: 50, color: "#57B033"},
		{x: 2500, y: 550, width: 700, height: 50, color: "#57B033"}
	],

	enemies : [
		{x: 200, y: 510, type:"rabbit"},
		{x: 1400, y: 310, type:"rabbit"},
		{x: 2500, y: 510, type:"rabbit"}
	],

	levelStuff : [],

	levelExit : {x: 3150, y: 450, width: 50, height: 100, color: "hsla(322, 0%, 0%, 1)"}
},{
	blocks : [
		{x: 400, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 800, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1200, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1600, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2000, y: 350, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2400, y: 350, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		
		{x: 0, y: 550, width: 900, height: 50, color: "#57B033"},
		{x: 1600, y: 550, width: 600, height: 50, color: "#57B033"},
		{x: 3000, y: 350, width: 200, height: 50, color: "#57B033"}
	],

	enemies : [
		{x: 200, y: 510, type:"rabbit"},
		{x: 1400, y: 310, type:"eagle"}
	],

	levelStuff : [],

	levelExit : {x: 3150, y: 250, width: 50, height: 100, color: "hsla(322, 0%, 0%, 1)"}
},{
	blocks : [
		{x: 200, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 600, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1000, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1600, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2200, y: 450, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2600, y: 350, width: 200, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		
		{x: 0, y: 550, width: 200, height: 50, color: "#57B033"},
		{x: 800, y: 550, width: 1800, height: 50, color: "#57B033"}
	],

	enemies : [
		{x: 800, y: 500, type:"fox"},
		{x: 1000, y: 510, type:"skunk"},
		{x: 1200, y: 500, type:"fox"},
		{x: 1400, y: 510, type:"skunk"},
		{x: 1600, y: 500, type:"fox"},
		{x: 1800, y: 510, type:"skunk"},
		{x: 2000, y: 500, type:"fox"}
	],

	levelStuff : [],

	levelExit : {x: 3150, y: 450, width: 50, height: 100, color: "hsla(322, 0%, 0%, 1)"}
}];

function getLevel(index){
	return levels[index];
}

module.exports = getLevel;