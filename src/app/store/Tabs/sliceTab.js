import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0
};
export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		updatedTabs: (state, action) => {
			const { value } = action.payload;
			state.value = value;
		}
	}
});
