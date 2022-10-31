import { createContext } from "react";

const user = {
    username: ""
    password: ""
    name: ""
    birthdate: 0
    residentialAddress: ""
    currentAbilities: {
        pushUpCount: 0,
        sitUpCount: 0,
        runTimeInSeconds: 0
    },
    targetAbilities: {
        pushUpCount: 0,
        sitUpCount: 0,
        runTimeInSeconds: 0
    },
    IPPTPrevGrade: ""
}

export const AppContext = createContext(themes.user);
  