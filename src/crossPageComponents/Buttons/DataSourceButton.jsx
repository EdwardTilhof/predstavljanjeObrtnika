import React from 'react';
import { DATA_SOURCE } from '../../constants'; 

export const DataSourceButton = () => {
    const handleChange = (e) => {
        const newSource = e.target.value;
        localStorage.setItem('APP_DATA_SOURCE', newSource);
        window.location.reload(); 
    };

    return (
        <span style={{ marginLeft: '15px', display: 'inline-block' }}>
            <select 
                id="dataSourceSelect" 
                value={DATA_SOURCE} 
                onChange={handleChange}
                style={{ fontSize: '14px', padding: '2px 5px' }}
            >
                <option value="localStorage">Local Storage</option>
                <option value="memory">Memory</option>
                <option value="firebase">Firebase</option>
            </select>
        </span>
    );
};