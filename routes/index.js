import {calculate, Generations, Pokemon, Move} from '@smogon/calc';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({message: "hi"});
});

router.post('/calc', function(req, res, next) {
	const gen = Generations.get(5); // alternatively: const gen = 5;
	const attacker = req.body.attacker;
	const defender = req.body.defender;
	
	const result = calculate(
	  gen,
	  new Pokemon(gen, attacker, {
		item: 'Choice Specs',
		nature: 'Timid',
		evs: {spa: 252},
		boosts: {spa: 1},
	  }),
	  new Pokemon(gen, defender, {
		item: 'Eviolite',
		nature: 'Calm',
		evs: {hp: 252, spd: 252},
	  }),
	  new Move(gen, 'Focus Blast')
	);

    res.json({message: req.body});
});

module.exports = router;
