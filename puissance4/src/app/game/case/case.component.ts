import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pawn } from 'src/app/models/pawn';

/**
 * Case component, all the cells that composes the game grid
 */
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseComponent {
  /**
   * Pawn to set in the cell
   * @type {Pawn}
   */
  @Input('pawn') pawn!: Pawn;

}
