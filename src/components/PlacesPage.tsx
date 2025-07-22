import React, { useContext } from 'react';
import { PlacesContext } from './PlacesContext';

type Props = {}

const PlacesPage = (props: Props) => {
    const places = useContext(PlacesContext);

    return (
        <div>PlacesPage</div>
    )
}

export default PlacesPage;