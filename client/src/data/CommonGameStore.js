import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';

class CommonGameStore extends ReduceStore
{
	constructor(){
		super(AppDispatcher);
	}
	getInitialState(){
		return Immutable.fromJS({
			room: undefined,
			yourCards: [],
			usedCards: [],
			unUsedCards: [],
			feedback: "",
			messages: [],
			currentPlayer: 0,
			myIndex: 0,
			previousPlayer: {
				index: -1,
				value: 0
			},
			froozen: false,
			direction: 1,
			bots: []
		});
	}
	reduce(state, action){

		switch(action.type)
		{
			/* COMMON GAME STORE */
			case MenuActionTypes.GAME_LOAD_DATA_START:
				return state
					.update('room', a => undefined);
					
			case MenuActionTypes.GAME_LOAD_DATA_SUCCESSFUL:
				return state
					.update('room', a => Immutable.fromJS(action.data.room))
					.update('yourCards', a => Immutable.fromJS(action.data.yourCards))
					.update('unUsedCards', a => Immutable.fromJS(action.data.unUsedCards))
					.update('usedCards', a => Immutable.List())
					.update('feedback', a => action.data.feedback[0])
					.update('myIndex', a => action.data.myIndex)
					.update('messages', a => Immutable.List())
					.update('bots', a => Immutable.List());

			case MenuActionTypes.GAME_LOAD_BOT_DATA:
				return state
					.update('bots', a => a.push(Immutable.fromJS(action.data)));

			case MenuActionTypes.GAME_PLAY_CARD_START:
				return state
					.update('froozen', a => true);

			case MenuActionTypes.GAME_PLAY_CARD_FINISH:
				return state
					.update('usedCards', a => a.push(...action.data.card.map(b => Immutable.fromJS(b))))
					.update('feedback', a => action.data.ctx.feedback)
					.update('currentPlayer', a => action.data.ctx.nextPlayerIndex)
					.update('direction', a => action.data.ctx.direction)
					.update('previousPlayer', a => Immutable.fromJS(action.data.ctx.previousPlayer));

			case MenuActionTypes.GAME_USED_CARD:
				return state
					.update('yourCards', a => a.update(
						a.findIndex(b => b.get('id') === action.data.id),
						b => b.set("used", true).set("isSelected", false)))
					.update('froozen', a => false);

			case MenuActionTypes.GAME_SELECT_CARD:
				return state
					.update('yourCards', a => a.update(a.findIndex(b => b.get('id') === action.data.id), k => k.set("isSelected", action.data.un)));
			default:
				return state; 
		}
	}
}

export default new CommonGameStore();