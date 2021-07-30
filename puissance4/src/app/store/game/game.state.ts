import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { removeItem } from '@ngxs/store/operators';
import { Game } from 'src/app/models/game';
import { CheckWinner, GameInit, PlayPawn, GameReset, CancelLastMove } from './game.actions';
import { VictoryCheckService } from '../services/victory-check.service';
import { Player } from 'src/app/models/player';


export class GameStateModel {
    game: Game = {
        player1: {id: 0, name: "Joueur 1"},
        player2: {id: 1, name: "Joueur 2"},
        rows: 6,
        columns: 7,
        pawns: []
    };
}

@State<GameStateModel>({
    name: 'game',
    defaults: {
        game: {
            player1: {id: 0, name: "Joueur 1"},
            player2: {id: 1, name: "Joueur 2"},
            rows: 6,
            columns: 7,
            pawns: []
        }
    }
})
@Injectable()
export class GameState {

    private victoryService: VictoryCheckService = new VictoryCheckService();

    @Selector()
    static getGame(state: GameStateModel) {
        return state.game;
    }

    @Action(GameInit)
    initGame({getState, patchState }: StateContext<GameStateModel>, {payload}: GameInit) {
        const state = getState();
        patchState({
            ...state, game: {
                ...payload,
                turn: state.game.player1,
            }
        });
    }

    @Action(GameReset)
    resetGame({getState, patchState }: StateContext<GameStateModel>) {
        const state = getState();
        patchState({
            ...state, game: {
                ...state.game,
                pawns: [],
                turn: state.game.player1,
            }
        });
    }
    
    @Action(CancelLastMove)
    cancelLastMove({getState, patchState }: StateContext<GameStateModel>) {
        const state = getState();
        const truncatedPawns = state.game.pawns.slice(0,-1);
        patchState({
            ...state, game: {
                ...state.game,
                pawns: truncatedPawns,
                turn: state.game.turn?.id == state.game.player1.id ? state.game.player2 : state.game.player1,
            }
        });
    }

    @Action(PlayPawn)
    playPawn({getState, patchState }: StateContext<GameStateModel>, {pawn}: PlayPawn) {
        const state = getState();
        const pawnsList = [...state.game.pawns, pawn]
        // Vérif : la colonne est déjà remplie
        if(pawn.y >= state.game.rows){
            throw new Error('🧐 La colonne est pleine !');
        }
        patchState({
            ...state, game: {
                ...state.game,
                turn: state.game.turn?.id == state.game.player1.id ? state.game.player2 : state.game.player1,
                pawns: pawnsList
            }
        });
    }

    @Action(CheckWinner)
    checkWinner({getState, patchState }: StateContext<GameStateModel>, {pawnPlayed}: CheckWinner) {
        const state = getState();
        let winner!: Player;
        const linePlayed = pawnPlayed.y;
        const columnPlayed = pawnPlayed.x;

        // check pour une ligne verticale
        if(this.victoryService.verticalCheck(state.game, columnPlayed, pawnPlayed)){
            winner = pawnPlayed.player;
        }

        // check pour une ligne horizontale
        if(this.victoryService.horizontalCheck(state.game, linePlayed, pawnPlayed)){
            winner = pawnPlayed.player;
        }

        // check pour une ligne diagonale à droite
        if(this.victoryService.diagonalRightCheck(state.game, pawnPlayed)){
            winner = pawnPlayed.player;
        }

        // check pour une ligne diagonale à gauche
        if(this.victoryService.diagonalLeftCheck(state.game, pawnPlayed)){
            winner = pawnPlayed.player;
        }

        patchState({
            ...state, game: {
                ...state.game,
                winner: winner
            }
        });
    }
}