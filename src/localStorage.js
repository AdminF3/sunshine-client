export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return {};
    }

    const { user } = JSON.parse(serializedState);
    return { user: { ...user, isFetching: false } };
  } catch (err) {
    localStorage.removeItem('token');
    return {};
  }
}

export function saveState (state) {
  try {
    const serializedState = JSON.stringify({ user: state.user });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Dont do anything here.
  }
}
