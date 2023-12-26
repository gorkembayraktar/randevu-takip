export const getLocalStorage = (keyName, defaultValue, withJson = true) => {
    try {
        const value = window.localStorage.getItem(keyName);
        if(!withJson && value){
          return value;
        }
        
        if (withJson && value) {
          return JSON.parse(value);
        } 
        window.localStorage.setItem(keyName, withJson ? JSON.stringify(defaultValue) : defaultValue);
        return defaultValue;
    } catch (err) {
        return defaultValue;
    }
};
export const setLocalStorage = (keyName, value, withJson = true) => {
  try {
       window.localStorage.setItem(keyName, withJson ? JSON.stringify(value) : value);
  } catch (err) {
     
  }
};

export const removeLocalStorage = (keyName) => {
  window.localStorage.removeItem(keyName);
};