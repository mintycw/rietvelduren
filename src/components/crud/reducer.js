// Initial state of the reducer, an empty array
export const initialState = [];

// Reducer function to manage the state
function reducer(state, action) {
	switch (action.type) {
		case "add":
			// Adds a new item to the state
			return [...state, action.payload];
		case "edit":
			// Updates a specific item in the state
			const updatedState = [...state];
			updatedState[action.payload.index] = action.payload.value;
			return updatedState;
		case "remove":
			// Removes an item from the state by its index
			return state.filter((_, i) => i !== action.payload);
		case "move":
			// Reorders the state with the provided new order
			const { from, to } = action.payload;
			const updatedItems = [...state];
			const [movedItem] = updatedItems.splice(from, 1);
			updatedItems.splice(to, 0, movedItem);
			return updatedItems;
		case "init":
			// Initializes the state with the provided payload
			return action.payload;
		default:
			// Returns the current state if the action type is not recognized
			return state;
	}
}

export default reducer;
