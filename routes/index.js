import {calculate, Generations, Pokemon, Move} from '@smogon/calc';

var express = require('express');
var router = express.Router();

const IV_MAX = 31;
const LEVEL = 100;

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
	
	updateStats(attacker, "atk", attack);
	updateStats(attacker, "spa", specialAtk);
	//attacker.rawStats.spa = specialAtk;
	//attacker.stats.spa = specialAtk;
	
	const defender = req.body.defender;
	
	const result = calculate(
	  gen,
	  attacker,
	  new Pokemon(gen, defender, {
		item: 'Eviolite',
		nature: 'Calm',
		evs: {hp: 252, spd: 252},
	  }),
	  new Move(gen, 'Focus Blast')
	);

    res.json(attacker);
});

function updateStats(pokemon, statName, value)
{
	pokemon.species.baseStats[statName] = value;
	pokemon.rawStats[statName] = calculateStat(value);
	pokemon.stats[statName] = calculateStat(value);
}

function calculateStat(base)
{
	return (((2 * base + IV_MAX) * LEVEL)/100) + 5;
}

module.exports = router;