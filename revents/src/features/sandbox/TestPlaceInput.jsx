import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

export default function LocationSearchInput({setLocation}) {
    const [address, setAddress] = useState("");


    function handleChange(address) {
        setAddress(address);
    };

    function handleSelect(address) {
        console.log('select', address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { 
                console.log('Success', latLng); 
                setLocation(latLng); 
            })
            .catch(error => console.error('Error', error));
        setAddress(address);
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {/* {console.log('suggesions', suggestions)} */}
                        {suggestions.map(suggestion => {

                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            
                            return (
                                <div
                                    key={suggestion.id}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}