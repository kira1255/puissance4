import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { MaterialModule } from '../material/material.module';
import { CaseComponent } from './case/case.component';
import { EndGameComponent } from './dialogs/end-game/end-game.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    GameComponent,
    CaseComponent,
    EndGameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class GameModule { }
