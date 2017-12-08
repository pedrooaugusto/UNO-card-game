import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import MenuActionTypes from './MenuActionTypes';
import AppDispatcher from './AppDispatcher';
import Bot from './Bot';

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
			messagesModal: {
				isOpen: false,
				messages: Immutable.List()
			},
			currentPlayer: 0,
			myIndex: 0,
			admin: false,
			previousPlayer: {
				index: -1,
				value: 0
			},
			cronometro: 31,
			cronometroId: 0,
			playersCards: [],
			froozen: false,
			direction: 1,
			bots: [],
			selectedCards: [],
			needToBuy: {
				who: -1,
				howMany: 0
			},
			chooseColor:{
				isOpen: false,
				dt: undefined,
				state: false,
				id: -1
			},
			uno:{
				isOpen: false,
				who: undefined
			},
			endGame:{
				isOpen: false,
				players: []
			},
			standardModal:{
				isOpen: false,
				text: ""
			},
			rulesModal: false
		});
	}
	reduce(state, action){

		switch(action.type)
		{
			/* COMMON GAME STORE */
			case MenuActionTypes.GAME_LOAD_DATA_START:
				return this.getInitialState();
					
			case MenuActionTypes.GAME_LOAD_DATA_SUCCESSFUL:
				return state
					.update('room', a => Immutable.fromJS(action.data.room))
					.update('yourCards', a => Immutable.fromJS(action.data.yourCards))
					.update('unUsedCards', a => Immutable.fromJS(action.data.unUsedCards))
					.update('usedCards', a => Immutable.fromJS(action.data.usedCards))
					.update('playersCards', a => Immutable.List(action.data.playersCards))
					.update('feedback', a => action.data.feedback[0])
					.update('myIndex', a => action.data.myIndex)
					.update('messages', a => Immutable.List())
					.update('bots', a => Immutable.List())
					.update('selectedCards', a => Immutable.List())
					.update('admin', a => action.data.admin);

			case MenuActionTypes.GAME_LOAD_BOT_DATA:
				return state
					.update('bots', a => a.push(Immutable.fromJS(action.data)));

			case MenuActionTypes.GAME_PLAY_CARD_START:
				return state
					.update('froozen', a => true);

			case MenuActionTypes.GAME_PLAY_CARD_FINISH:
				const {nextPlayerIndex, previousPlayer} = action.data.ctx;
				const players = state.getIn(['room', 'players']);
				const isBot = players.get(nextPlayerIndex).get('isBot');
				state = state
					.update('usedCards', a => a.push(...action.data.card.map(b => Immutable.fromJS(b))))
					.update('feedback', a => action.data.ctx.feedback)
					.update('currentPlayer', a => nextPlayerIndex)
					.update('playersCards', a => a.update(previousPlayer.index, b => b - action.data.card.length))
					.update('direction', a => action.data.ctx.direction)
					.update('previousPlayer', a => Immutable.fromJS(previousPlayer))
					.update('cronometro', a => 31)
					.updateIn(['needToBuy', 'who'], a => nextPlayerIndex)
					.updateIn(['needToBuy', 'howMany'], a => action.data.ctx.howMany);
				if(state.get('playersCards').get(previousPlayer.index) === 1)
				{
					//Made a uno
					state = state
						.updateIn(['uno', 'isOpen'], a => true)
						.updateIn(['uno', 'who'], a => players.get(previousPlayer.index));			
				}
				else if(state.get('playersCards').get(previousPlayer.index) === 0)
				{
					//End game
					const b = players.map((value, index) => ({
						name: value.get('name'),
						numCards: state.get('playersCards').get(index),
					}));
					return state
						.updateIn(['endGame', 'isOpen'], a => true)
						.updateIn(['endGame', 'players'], a => b);
				}
				if(isBot && state.get('admin'))
				{
					setTimeout(() => {Bot.play(this.getState())}, 4000);
				}
				return state;

			case MenuActionTypes.GAME_USED_CARD:
				const id_ = action.data.id;
				if(action.data.fromBot)
				{
					const {botIndex} = action.data;
					return state
						.update('bots', 
							a => a.update(botIndex, 
								b => b.update('yourCards', 
									c => c.remove(c.findIndex(d => d.get('id') === id_)))));
				}
				else
				{
					const indexCard_y = state.get('yourCards').findIndex(a => a.get('id') === id_);
					const indexCard_s = state.get('selectedCards').findIndex(a => a.get('id') === id_);
					return state
						.update('yourCards', a => a.update(indexCard_y, b => b.set('used', true).set('isSelected', false)))
						.update('froozen', a => false)
						.update('selectedCards', a => a.remove(indexCard_s));
				}

			case MenuActionTypes.GAME_SELECT_CARD:
				const {id, color, un} = action.data;
				const cardIndex = state.get('yourCards').findIndex(b => b.get('id') === id);
				let card = state.get('yourCards').get(cardIndex);
				card = color ? card.set('color', color) : card;
				return state
					.update('yourCards', a => a.update(cardIndex, b => b.set('isSelected', un)))
					.update('selectedCards', a => un ? a.push(card) : a.remove(a.findIndex(b => b.get('id') === id)));

			case MenuActionTypes.GAME_BUY_CARD_START:
				return state
					.update('froozen', a => true);					

			case MenuActionTypes.GAME_BUY_CARD_FINISH:
				const nCard = Immutable.fromJS({
            		id: (new Date().getTime() % 100000),
            		name: state.get('unUsedCards').get(0),
            		isSelected: false,
					used: false,
					isNew: true
				});
				const {myself, ctx} = action.data;
				const nextIsBot = state.getIn(['room', 'players']).get(ctx.nextPlayerIndex).get('isBot');
				state = state
						.update('unUsedCards', a => a.remove(0))
						.update('froozen', a => false)
						.update('feedback', a => ctx.feedback)
						.update('playersCards', a => a.update(ctx.previousPlayer.index, b => b + 1))
						.update('currentPlayer', a => ctx.nextPlayerIndex)
						.update('previousPlayer', a => Immutable.fromJS(ctx.previousPlayer))
						.updateIn(['needToBuy', 'howMany'], a => a > 0 ? a - 1 : a)
						.update('cronometro', a => state.getIn(['needToBuy', 'howMany']) > 1 ? a : 31);
				if(myself && !ctx.fromBot)
					state = state.update('yourCards', a => a.push(nCard));
				if(state.get('admin') && ctx.fromBot)
					state = state.update('bots', a => a.update(ctx.botIndex, b => b.update('yourCards', c => c.push(nCard))));
				if(nextIsBot && state.get('admin'))
					setTimeout(() => {Bot.play(this.getState())}, 4000);
				return state;

			case MenuActionTypes.GAME_DECREMENT_TIME:
				const t = state.get('cronometro');
				if(t === 0)
				{
					const ctx = {
						currentPlayerIndex: state.get('currentPlayer'),
						capacity: state.getIn(['room', 'capacity']),
						direction: state.get('direction'),
						needToBuy: state.getIn(['needToBuy', 'howMany'])
					};
					action.data(ctx);
				}
				return state
					.update('cronometro', a => a-1);
			
			case MenuActionTypes.GAME_SET_TIME_ID:
				return state.update('cronometroId', a => action.data);

			case MenuActionTypes.GAME_TIME_OUTED_EFF:
				const nextIsBot_ = state
					.getIn(['room', 'players'])
					.get(action.data.ctx.nextPlayerIndex)
					.get('isBot');
				state = state
					.update('feedback', a => action.data.ctx.feedback)
					.update('currentPlayer', a => action.data.ctx.nextPlayerIndex)
					.update('direction', a => action.data.ctx.direction)
					.update('previousPlayer', a => Immutable.fromJS(action.data.ctx.previousPlayer))
					.update('cronometro', a => 31)
					.updateIn(['needToBuy', 'who'], a => -1)
					.updateIn(['needToBuy', 'howMany'], a => 0);
				if(nextIsBot_ && state.get('admin'))
					setTimeout(() => {Bot.play(this.getState())}, 4000);
				return state;

			case MenuActionTypes.GAME_OPEN_CHOOSE_COLOR:
				return state.updateIn(['chooseColor', 'isOpen'], a => true);
			
			case MenuActionTypes.GAME_CLOSE_CHOOSE_COLOR:
				return state.updateIn(['chooseColor', 'isOpen'], a => false);

			case MenuActionTypes.GAME_CHOOSE_COLOR_SELECT_SET_DATA:
				return state
					.updateIn(['chooseColor', 'id'], a => action.data.id)
					.updateIn(['chooseColor', 'state'], a => action.data.state)
					.updateIn(['chooseColor', 'dt'], a => undefined);

			case MenuActionTypes.GAME_CHOOSE_COLOR_SEND_SET_DATA:
				return state
					.updateIn(['chooseColor', 'dt'], a => action.data)
					.updateIn(['chooseColor', 'id'], a => -1)
					.updateIn(['chooseColor', 'state'], a => undefined);

			case MenuActionTypes.GAME_CLOSE_UNOING:
				return state
					.updateIn(['uno', 'isOpen'], a => false);

			case MenuActionTypes.GAME_OPEN_STANDARD_MODAL:
				return state
					.updateIn(['standardModal', 'isOpen'], a => true)
					.updateIn(['standardModal', 'text'], a => action.data);

			case MenuActionTypes.GAME_CLOSE_STANDARD_MODAL:
				return state
					.updateIn(['standardModal', 'isOpen'], a => false);
			
			case MenuActionTypes.GAME_RULES_MODAL:
				return state
					.update('rulesModal', a => action.data);

			case MenuActionTypes.GAME_MESSAGES_MODAL:
				return state
					.updateIn(['messagesModal', 'isOpen'], a => action.data);

			case MenuActionTypes.GAME_MESSAGES_MODAL_NEW_MESSAGE:
				return state
					.updateIn(['messagesModal', 'messages'], a => a.push(Immutable.fromJS(action.data)));

			default:
				return state; 
		}
	}
}

export default new CommonGameStore();