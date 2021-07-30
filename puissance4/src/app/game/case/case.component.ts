import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Pawn } from 'src/app/models/pawn';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseComponent implements OnInit {

  @Input('pawn') pawn!: Pawn;

  constructor() { }

  ngOnInit(): void {
  }

}
