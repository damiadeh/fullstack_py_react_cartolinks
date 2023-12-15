import { FileType } from '../interfaces/types';
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';


const dummyData: FileType[] = [
    { name: 'File1.txt', size: 10244444, type: 'file', id: 1 },
    { name: 'File2.jpg', size: 205548, type: 'file', id: 2 },
    { name: 'Folder1', size: 236633, type: 'dir', id: 3 },
    { name: 'File3.docx', size: 51552, type: 'file', id: 4 },
    // Add more dummy data as needed
  ];

interface GlobalState {
    isAuthenticated: boolean;
    isLoading: boolean;
    files: FileType[];
}

interface GlobalAction {
    type: string;
    payload?: any;
}

const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
    // put cases in constants to avoid magic string issues
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true, isLoading: false };
        case 'TOGGLE_ISLOADING':
            return { ...state, isLoading: !state.isLoading };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, files: [] };
        case 'SET_FILES':
            return { ...state, files: action.payload };
        default:
            return state;
    }
};

interface GlobalProviderProps {
    children: ReactNode;
}


// #persist state on refresh
const loadStateFromLocalStorage = (): GlobalState | null => {
    const storedState = localStorage.getItem('globalState');
    return storedState ? JSON.parse(storedState) : null;
  };

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);
const GlobalDispatchContext = createContext<React.Dispatch<GlobalAction> | undefined>(undefined);

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, loadStateFromLocalStorage() || {
        isAuthenticated: false,
        isLoading: false,
        files: dummyData,
    });

    useEffect(() => {
        localStorage.setItem('globalState', JSON.stringify(state));
      }, [state]);

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

//TODO: persist state to local storage
const useGlobalState = (): GlobalState => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalProvider');
    }
    return context;
};

const useGlobalDispatch = (): React.Dispatch<GlobalAction> => {
    const context = useContext(GlobalDispatchContext);
    if (!context) {
        throw new Error('useGlobalDispatch must be used within a GlobalProvider');
    }
    return context;
};

export { GlobalProvider, useGlobalState, useGlobalDispatch };