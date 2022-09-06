import {calculate, Generations, Pokemon, Move} from '@smogon/calc';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({message: "hi"});
});

router.post('/calc', function(req, res, next) {
	const gen = Generations.get(5); // alternatively: const gen = 5;
	const specialAtk = req.body.spa;
	const defender = req.body.defender;
	
	const attacker = new Pokemon(gen, "Magikarp", {
		nature: 'Serious',
	});
	
	attacker.species.baseStats.spa = specialAtk;
	//attacker.rawStats.spa = specialAtk;
	//attacker.stats.spa = specialAtk;
	
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

module.exports = router;