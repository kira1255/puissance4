import { Player } from "./player";

export interface Pawn{
    x: number;
    y: number;
    player: Player;
    isInWinningLine?: false;
}