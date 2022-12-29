export const fetchUser = () => {
    const userInfo = localStorage.getItem("user") !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : localStorage.clear();
    return userInfo;
}; // fetch the user from the local storage and return it 