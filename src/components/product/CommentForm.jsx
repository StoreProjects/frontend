import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { createComment, listOneProduct } from '../../redux/actions/product';
export const CommentForm = ({ productId }) => {

  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ rating, setRating ] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment( productId, body, rating )).then(() => {
      dispatch(listOneProduct(String(productId)));
    });
  }

  return (
    <div className='w-full bg-white rounded p-4 shadow-md my-6'>
      <form onSubmit={handleSubmit}>

        <p className='font-bold text-xl mb-4'>Agregar un comentario</p>

        <div className='my-6'>

          <textarea
            placeholder="Ingrese un comentario..."
            name="body"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={({ target }) => setBody( target.value )}
          />

        </div>

        <div className='flex flex-row justify-between'>
          
          <ReactStars 
            count={5}
            onChange={(rate) => setRating( rate )}
            value={0}
            size={30}
            isHalf={true}
            emptyIcon={ <i className="far fa-star"></i> }
            halfIcon={ <i className="far fa-star-half"></i> }
            fullIcon={ <i className="fas fa-star"></i> }
               
          />

          <button
            type="submit"
            className='px-2 h-10 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded'
          >
            Comentar
          </button>
        </div>

      </form>
    </div>
  )
}
