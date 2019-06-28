import React from 'react';

const Notification = ( {message, notificationType} ) => {
  if (message === null) {
      return null;
  }

  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom:10,
  }

  if (notificationType === 1) {
    style.color = 'red'
  }
  return ( 
    <div style={style}>
      {message}
    </div>
  );
}

export default Notification;