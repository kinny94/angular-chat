export interface UiState{
	userId: number,
	currentThread: number
}

export const INITIAL_UI_STATE: UiState = {
	userId: 1,
	currentThread: undefined
}
