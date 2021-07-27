import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ToogleTheme } from './theme.actions';

export class ThemeStateModel {
    dark: boolean = false;
}

@State<ThemeStateModel>({
    name: 'theme',
    defaults: {
        dark: false
    }
})
export class ThemeState {

    @Selector()
    static getTheme(state: ThemeStateModel) {
        return state.dark;
    }

    @Action(ToogleTheme)
    toogleTheme({getState, patchState }: StateContext<ThemeStateModel>) {
        const state = getState();
        patchState({
            ...state, dark: !state.dark
        });
    }
}