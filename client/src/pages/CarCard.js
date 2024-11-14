// CarCard.js
import React from 'react';

const CarCard = ({ image, name }) => {
  return (
    <div className="bg-white w-[300px] rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:scale-[102%]">
      <img src={image} alt={name} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 text-center">{name}</h3>
      </div>
    </div>
  );
};

export default CarCard;