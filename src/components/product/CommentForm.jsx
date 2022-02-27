import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment, listOneProduct } from '../../redux/actions/product';
export const CommentForm = ({ productId }) => {

  const dispatch = useDispatch();

  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment( productId, body )).then(() => {
      dispatch(listOneProduct(String(productId)));
    });
  }

  return (
    <div className='w-2/4 bg-white rounded p-4 shadow-md my-6'>
      <form onSubmit={handleSubmit}>

        <p className='font-bold text-xl mb-4'>Agregar un comentario</p>

        <div className='my-2'>

          <textarea
            placeholder="Ingrese un comentario..."
            name="body"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={({ target }) => setBody( target.value )}
          />

        </div>

        <button
          type="submit"
          className='float-right bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded py-2 px-5'
        >
          Comentar
        </button>

      </form>
    </div>
  )
}
