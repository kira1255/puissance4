import { Player } from "./player";

/**
 * Represents a pawn
 */
export interface Pawn{
    /**
     * x coordinate of the pawn
     */
    x: number;

    /**
     * y coordinate of the pawn
     */
    y: number;

    /**
     * player that played the pawn
     */
    player: Player;

    /**
     * true if the pawn is in a winning line, for display purpose
     */
    isInWinningLine?: false;
}