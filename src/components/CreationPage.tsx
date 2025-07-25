import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { PlacesContext, type Place } from './PlacesContext';
import axios from './mockAPI/mockedAxios';

const CreationPage = () => {
    const [formData, setFormData] = useState<Place>({
        name: '',
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
    try {
        const response = await axios.post<Place>('/api/place', formData);
        setPlaces([...places, response.data]);
        console.log('Submitted successfully' );
    } catch (error) {
        console.error('Failed to create place:', error);
    }};

    useEffect(() => {
        console.log('Places updated:', places);
    }, [places]);

    return (
        <div >
            <form >
                <label >Place Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>

                <label >Place Type:
                   <input type="text" name='type' value={formData.type} onChange={handleChange} />
                </label>
                
                <label >Place Address:
                    <input type="text" name='address' value={formData.address} onChange={handleChange} />
                </label>
                
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>Submit</button>
            <Link to="/places">Places</Link>
            </form>

        </div>
    )
}

export default CreationPage;
