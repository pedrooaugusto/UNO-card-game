// const IMAGE_SIZE = 2048;
const CARD_WIDTH = 204.8;
const CARD_HEIGHT = 292;

const RED = "red";
const BLUE = "blue";
const GREEN = "green";
const YELLOW = "yellow";

const COLORS = [RED, BLUE, GREEN, YELLOW];
const NUMBERS = ["turn", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const FUNC = ["buy-two", "block", "buy-four", "change-color"];

/* Gera nomes das cartas */
function card_names(){
	const result = [];
	/* cards from zero to nine */
	for(let i = 0; i < COLORS.length; i++)
		for(let j = 0; j < NUMBERS.length; j++)
			result.push(COLORS[i]+"-"+NUMBERS[j]);
	
	/* block and buy two cards */
	for(let i = 0; i < FUNC.length - 2; i++)
		for(let j = 0; j < COLORS.length; j++)
			result.push(COLORS[j]+"-"+FUNC[i]);
	
	/* buy four and chage color cards */	
	for(let i = 2; i < FUNC.length; i++)
		result.splice(result.length, 0, FUNC[i], FUNC[i]);

	/* zero cards */
	for(let j = 0; j < COLORS.length; j++)
		result.push(COLORS[j]+"-zero");
	return result;
}

/* Mapeia x e y no sprite */
function card_positions(RATIO){
	const result = [];
	for(let i = 0; i < 6; i++){
		for(let j = 0; j < 10; j++){
			const x = -j * CARD_WIDTH * RATIO;
			const y = -i * CARD_HEIGHT * RATIO;
			if(!(i === 5 && j > 5))
				result.push({x, y});
		}	
	}
	return result;
}

function generate(){
	const names = card_names();
	const pos = [card_positions(0.4), card_positions(0.3)];
	const map_l = new Map();
	const map_s = new Map();
	for(let i = 0; i < names.length; i++){
		map_l.set(names[i], pos[0][i]);
		map_s.set(names[i], pos[1][i]);
	}
	if(window.matchMedia("only screen and (max-width: 600px)").matches)
		return map_s;
	return map_l;
}
export default generate();