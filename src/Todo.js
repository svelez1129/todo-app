import React, { useState } from 'react';

export default function TodoCard({ title, description, onDelete, id }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to handle the click event
  const toggleDescription = () => {
    return setShowFullDescription(!showFullDescription);
  }

  const handleClick = () => {
    onDelete(id);
  };

  const renderDescription = () => {
    if (showFullDescription || description.length <= 100) {
      return description;
    } else {
      return description.substring(0, 100) + '...';
    }
  };


  return (
    <div className="card mb-4 mx-5 col-5 bg-warning">
      <div className="card-body text-bg-warning ">
        <div class = "d-flex justify-content-center">
            <h5 className="card-title">{title}</h5>
        </div>
        <hr />
        <p className="card-text">{renderDescription()}</p>
        {description.length > 100 && (
          <button className="btn btn-link" onClick={toggleDescription}>
            {showFullDescription ? 'Show Less' : 'Show More'}
          </button>
        )}
        <div class = "d-flex justify-content-center">
            <button className="btn btn-primary" onClick={handleClick}>
            Mark Completed
            </button>
        </div>
      </div>
    </div>
  );
}

