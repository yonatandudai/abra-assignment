import { createContext, useState, type ReactNode } from "react";

export type Place = {
    name: string;
    type: string;
    address: string;  
};

type PlacesContextType = {
    places: Place[];
    setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
}

export const PlacesContext = createContext<PlacesContextType>({
    places: [],
    setPlaces: () => {},
});

type PlacesContextProviderProps = {
    children: ReactNode;
};

const PlacesContextProvider = ({ children }: PlacesContextProviderProps) => {
    const [places, setPlaces] = useState<Place[]>([]);

return (
    <PlacesContext.Provider value = {{places, setPlaces}}>
        { children }
    </PlacesContext.Provider>
    );
};

export default PlacesContextProvider;