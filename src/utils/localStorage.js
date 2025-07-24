// fetching the state from local storage
export const loadState = () => {
    try {
        const reduxState = localStorage.getItem("reduxState");
        if (reduxState === null) return undefined;
        return JSON.parse(reduxState);
    } catch (error) {
        console.error("Could not load state", error)
        return undefined;
    }
}

// saving the state to local storage
export const saveState = (state) => {
    try {
        const stringState = JSON.stringify(state);
        localStorage.setItem("reduxState", stringState)
    } catch (error) {
        console.error("Could not save state", error)
    }
}