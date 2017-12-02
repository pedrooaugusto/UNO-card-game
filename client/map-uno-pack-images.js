const IMAGE_SIZE = 2048;
const CARD_WIDTH = 204;
const CARD_HEIGHT = 292;
const RADIO = 0.4;

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
		result.push(COLORS[j]+"-"+"zero");
	return result;
}

/* Mapeia x e y no sprite */
function card_positions(){
	const result = [];
	for(let i = 0; i < 6; i++){
		for(let j = 0; j < 10; j++){
			const x = j === 9 ? 9.047 : j * CARD_WIDTH;
			const y = i * CARD_HEIGHT;
			if(!(i === 5 && j > 5))
				result.push({x, y});
		}	
	}
	return result;
}

function generate(){
	const names = card_names();
	const pos = card_positions();
	return names.map((value, index) => ({name: value, x: pos[index].x, y: pos[index].y}));
}