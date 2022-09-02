import {calculate, Generations, Pokemon, Move} from '@smogon/calc';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	const gen = Generations.get(5); // alternatively: const gen = 5;
	const result = calculate(
	  gen,
	  new Pokemon(gen, 'Gengar', {
		item: 'Choice Specs',
		nature: 'Timid',
		evs: {spa: 252},
		boosts: {spa: 1},
	  }),
	  new Pokemon(gen, 'Chansey', {
		item: 'Eviolite',
		nature: 'Calm',
		evs: {hp: 252, spd: 252},
	  }),
	  new Move(gen, 'Focus Blast')
	);

	console.log(result);
    res.json({message: result});
});

module.exports = router;
