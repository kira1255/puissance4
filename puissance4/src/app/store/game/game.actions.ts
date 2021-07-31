import { Pawn } from "src/app/models/pawn";
import {Game} from "src/app/models/game"

export class GameInit {
    static readonly type = '[Game] Initialize';

    constructor(public payload: Game) {}
}

export class GameReset {
    static readonly type = '[Game] Reset';

    constructor() {}
}

export class CancelLastMove {
    static readonly type = '[Game] Cancel Last Move';

    constructor() {}
}

export class PlayPawn {
    static readonly type = '[Game] AddPawn';

    constructor(public pawn: Pawn) {}
}

export class SetRows {
    static readonly type = '[Game] Set Rows';

    constructor(public rows: number) {}
}

export class SetColumns {
    static readonly type = '[Game] Set Columns';

    constructor(public columns: number) {}
}

export class CheckWinner {
    static readonly type = '[Game] Determine winner';

    constructor(public pawnPlayed: Pawn) {}
}