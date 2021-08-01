import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Game } from 'src/app/models/game';
import { CheckWinner, GameInit, PlayPawn, GameReset, CancelLastMove, SetRows, SetColumns } from './game.actions';
import { VictoryCheckService } from '../services/victory-check.service';
import { Player } from 'src/app/models/player';

/**
 * Game State Model
 */
export class GameStateModel {
    /**
     * Game state, contains the two players, the columns and rows number and an array of the pawns played
     */
    game: Game = {
        player1: {id: 0, name: "Joueur 1"},
        player2: {id: 1, name: "Joueur 2"},
        rows: 6,
        columns: 7,
        pawns: []
    };
}

/**
 * Game State
 */
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

    /**
     * Victory Service, has all the methods to check if 4 pawns are aligned
     */
    private victoryService: VictoryCheckService = new VictoryCheckService();

    /**
     * Returns game state
     */
    @Selector()
    static getGame(state: GameStateModel) {
        return state.game;
    }

    /**
     * Returns rows
     */
    @Selector()
    static getRows(state: GameStateModel) {
        return state.game.rows;
    }

    /**
     * Returns columns
     */
    @Selector()
    static getColumns(state: GameStateModel) {
        return state.game.columns;
    }

    /**
     * Initialize the game, set player turn to player one
     */
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

    /**
     * Sets selected rows in the game state
     */
    @Action(SetRows)
    setRows({getState, patchState }: StateContext<GameStateModel>, {rows}: SetRows) {
        const state = getState();
        patchState({
            ...state, game: {
                ...state.game,
                rows: rows,
                pawns: [],
                turn: state.game.player1,
            }
        });
    }

    /**
     * Sets selected columns in the game state
     */
    @Action(SetColumns)
    setColumns({getState, patchState }: StateContext<GameStateModel>, {columns}: SetColumns) {
        const state = getState();
        patchState({
            ...state, game: {
                ...state.game,
                columns: columns,
                pawns: [],
                turn: state.game.player1,
            }
        });
    }

    /**
     * Reset the game, set player turn to red and reset the pawn array
     */
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
    
    /**
     * Removes last played pawn if there is at least one pawn in the game
     */
    @Action(CancelLastMove)
    cancelLastMove({getState, patchState }: StateContext<GameStateModel>) {
        const state = getState();
        const truncatedPawns = state.game.pawns.slice(0,-1);
        // check : there is at least one pawn 
        if(state.game.pawns.length === 0){
            throw new Error($localize`🧐 Aucun pion en jeu !`);
        }
        patchState({
            ...state, game: {
                ...state.game,
                pawns: truncatedPawns,
                turn: state.game.turn?.id == state.game.player1.id ? state.game.player2 : state.game.player1,
            }
        });
    }

    /**
     * Add a pawn to the state pawn array if column played isn't full
     */
    @Action(PlayPawn)
    playPawn({getState, patchState }: StateContext<GameStateModel>, {pawn}: PlayPawn) {
        const state = getState();
        const pawnsList = [...state.game.pawns, pawn]
        // check : column is full already
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

    /**
     * Uses Victory service to check if 4 pawns are aligned, update state if there's a winner
     */
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