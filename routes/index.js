import {calculate, Generations, Pokemon, Move} from '@smogon/calc';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({message: "hi"});
});

router.post('/calc', function(req, res, next) {
	const gen = Generations.get(5); // alternatively: const gen = 5;
	const attack = req.body.atk;
	const specialAtk = req.body.spa;
	const defender = req.body.defender;
	
	const attacker = new Pokemon(gen, "Magikarp", {
		nature: 'Serious',
	});
	
	updateStats(attacker, "atk", attack);
	updateStats(attacker, "spa", specialAtk);
	
	const result = calculate(
	  gen,
	  attacker,
	  new Pokemon(gen, defender, {
		nature: 'Serious',
	  }),
	  new Move(gen, 'Focus Blast')
	);

    res.json(result);
});

const IV_MAX = 31;

function updateStats(pokemon, statName, value)
{
	pokemon.species.baseStats[statName] = value;
	pokemon.rawStats[statName] = calculateStat(value);
	pokemon.stats[statName] = calculateStat(value);
}


function calculateStat(base)
{
	return (((2 * base + IV_MAX) * 100)/100) + 5;
}

module.exports = router;
