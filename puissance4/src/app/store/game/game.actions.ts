import { Pawn } from "src/app/models/pawn";
import {Game} from "src/app/models/game"

/**
 * Initializes the game
 */
export class GameInit {
    static readonly type = '[Game] Initialize';

    constructor(public payload: Game) {}
}

/**
 * Resets the game
 */
export class GameReset {
    static readonly type = '[Game] Reset';

    constructor() {}
}

/**
 * Cancel the last move
 */
export class CancelLastMove {
    static readonly type = '[Game] Cancel Last Move';

    constructor() {}
}

/**
 * Play a pawn 
 */
export class PlayPawn {
    static readonly type = '[Game] AddPawn';

    constructor(public pawn: Pawn) {}
}

/**
 * Sets selected rows from homepage 
 */
export class SetRows {
    static readonly type = '[Game] Set Rows';

    constructor(public rows: number) {}
}

/**
 * Sets selected columns from homepage 
 */
export class SetColumns {
    static readonly type = '[Game] Set Columns';

    constructor(public columns: number) {}
}

/**
 * Checks if the last player won
 */
export class CheckWinner {
    static readonly type = '[Game] Determine winner';

    constructor(public pawnPlayed: Pawn) {}
}