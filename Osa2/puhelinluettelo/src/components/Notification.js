import React from 'react';
  
  const Notification = ({ errorMessage, successMessage }) => {
    if (errorMessage === null && successMessage === null) {
      return null
    } else if (errorMessage === null) {
        return(
            <div className="success">
                {successMessage}
            </div>
        )
    } else if (successMessage === null) {
        return(
            <div className="error">
                {errorMessage}
            </div>
        )
    }
    return (
        <div>
            <div className="error">
                {errorMessage}
            </div>
            <div className="success">
                {successMessage}
            </div>
        </div>
    )
  }

  export default Notification