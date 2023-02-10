import React from 'react'
import './Card.css';

const Card = ({count, valor, lista, trm}) => {
   
    return ( 
        <div>
          <div className='table'>
            {count}
          </div>
          <div className='table'>
            {valor}
          </div>
          <div className='table' id='lista'>
            {lista}
          </div>
          <div className='table'>
            {trm}
          </div>
        </div>
     );
}
 
export default Card;