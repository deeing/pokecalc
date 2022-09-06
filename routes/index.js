import {calculate, Generations, Pokemon, Move} from '@smogon/calc';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({message: "hi"});
});

router.post('/calc', function(req, res, next) {
	const gen = Generations.get(5); // alternatively: const gen = 5;
	const hp = req.body.hp;
	const attack = req.body.atk;
	const defense = req.body.def;
	const specialAtk = req.body.spa;
	const specialDef = req.body.spd;
	const speed = req.body.spe;
	
	const attacker = new Pokemon(gen, "Magikarp", {
		nature: 'Serious',
	});
	
	//updateHPStat(attacker, hp);
	updateStats(attacker, "atk", attack);
	//updateStats(attacker, "def", defense);
	updateStats(attacker, "spa", specialAtk);
	//updateStats(attacker, "spd", specialDef);
	//updateStats(attacker, "spe", speed);
	
	const defender = req.body.defender;

	const moveName = req.body.move ? req.body.move || "Focus Blast";
	
	const result = calculate(
	  gen,
	  attacker,
	  new Pokemon(gen, defender, {
		nature: 'Serious',
	  }),
	  new Move(gen, moveName)
	);

    res.json(result);
});

const IV_MAX = 31;
const LEVEL = 100;

function updateStats(pokemon, statName, value)
{
	pokemon.species.baseStats[statName] = value;
	pokemon.rawStats[statName] = calculateStat(value);
	pokemon.stats[statName] = calculateStat(value);
}

function updateHPStat(pokemon, value)
{
	pokemon.species.baseStats.hp = value;
	pokemon.rawStats.hp = calculateHP(value);
	pokemon.stats.hp = calculateHP(value);
}


function calculateStat(base)
{
	return (((2 * base + IV_MAX) * LEVEL)/100) + 5;
}

function calculateHP(base)
{
	return (((2 * base + IV_MAX) * LEVEL)/100) + LEVEL + 10;
}

module.exports = router;
