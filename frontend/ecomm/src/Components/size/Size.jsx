import React, { useState, useEffect } from 'react';

    const ProductSizeSelector = ({ category }) => {
      const [sizes, setSizes] = useState([]);
    
      useEffect(() => {
        // If-else conditions to set different sizes based on category
        if (category === 'Mens') {
          setSizes([6, 7, 8, 9, 10, 11, 12]); // Men's sizes
        } else if (category === 'Womens') {
          setSizes([5, 6, 7, 8, 9, 10]); // Women's sizes
        } else if (category === 'Kids') {
          setSizes([3, 4, 5, 6, 7, 8]); // Kids' sizes
        } else {
          setSizes([]); // Default: No sizes if no category
        }
      }, [category]);
    
      return (
        <div>
          <h2>{category} Footwear Sizes</h2>
          {sizes.length > 0 ? (
            <ul>
              {sizes.map((size) => (
                <li key={size}>Size: {size}</li>
              ))}
            </ul>
          ) : (
            <p>No sizes available for this category.</p>
          )}
        </div>
      );
    };
    
    export default ProductSizeSelector;
