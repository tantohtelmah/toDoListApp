import React, { useState } from 'react';

const AddTag = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/tags/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className='flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2'>
            <div className='flex flex-col m-4 p-4'>
                <div>
                    <h1 className='font-bold text-l'>Add tag</h1><br />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                            <input
                                className='rounded-md m-2 p-2 w-1/2' 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Enter tag name"
                            />
                            <div className='flex justify-center items-center m-4'>
                                <button className='roundrd-l m-2 p-2 w-1/3 bg-amber-400 hover:bg-amber-700 text-white font-bold' type="submit">Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTag;
