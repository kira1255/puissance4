import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ToogleTheme } from './theme.actions';

/**
 * Theme state model
 */
export class ThemeStateModel {
    /**
     * true if dark theme is selected
     */
    dark: boolean = false;
}

/**
 * Theme state
 */
@State<ThemeStateModel>({
    name: 'theme',
    defaults: {
        dark: false
    }
})
@Injectable()
export class ThemeState {

    /**
     * Retrieves the theme
     */
    @Selector()
    static getTheme(state: ThemeStateModel) {
        return state.dark;
    }

    /**
     * Sets the theme in the state
     */
    @Action(ToogleTheme)
    toogleTheme({getState, patchState }: StateContext<ThemeStateModel>) {
        const state = getState();
        patchState({
            ...state, dark: !state.dark
        });
    }
}