import { createContext } from "react";

const AppContext = createContext({
    user: {
        username: "",
        password: "",
        name: "",
        birthdate: 0,
        residentialAddress: "",
        currentAbilities: {
            pushUpCount: 0,
            sitUpCount: 0,
            runTimeInSeconds: 0
        },
        targetAbilities: {
            pushUpCount: 0,
            sitUpCount: 0,
            runTimeInSeconds: 0,
        },
        IPPTPrevGrade: ""
    },
    setUser: (user) => {}
});

export default AppContext;

