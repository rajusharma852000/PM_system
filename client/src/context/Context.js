const { createContext } = require("react");

const carContext = createContext();
const authContext = createContext();
const getParkingSlotContext = createContext();
const bookSlotContext = createContext();
const userContext = createContext();
const slotContext = createContext(0);

export { authContext, carContext, getParkingSlotContext, bookSlotContext, userContext, slotContext };