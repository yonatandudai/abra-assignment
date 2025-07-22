import React, {useState, useContext} from 'react';
import axios, { type AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { PlacesContext } from './PlacesContext';

type Props = {};

interface Place {
    placeName: string,
    type: string,
    address: string
}

const CreationPage = (props: Props) => {
    const [formData, setFormData] = useState<Place>({
        placeName: '',
        type: '',
        address: '',
    });
    const { places, setPlaces } = useContext(PlacesContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response: AxiosResponse = await axios.post('/api/place', formData);
        setPlaces([
            { formData }, ...places]);
    }

    return (
        <div >
            <form >
                <label >Place Name:
                    <input type="text" name='name' />
                </label>

                <label >Place Type:
                   <input type="text" name='type' /> 
                </label>
                
                <label >Place Address:
                    <input type="text" name='address' />
                </label>
                
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>Submit</button>
            <Link to="/places"></Link>
            </form>

        </div>
    )
}

export default CreationPage;