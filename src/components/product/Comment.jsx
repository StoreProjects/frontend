import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { deleteComment } from '../../redux/actions/product';
const Comment = ({ productId, comment, i }) => {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const deleteCommentHandle = () => {
        dispatch(deleteComment( productId, comment._id, i ));
    }

    return (
        <div className='w-full bg-white rounded p-4 shadow-md'>
            <div className='flex flex-row'>
                <div className='mr-5'>
                    <img
                        src={`${ comment.user.image }`}
                        alt={`${ comment.user.username }_img`}
                        className={`w-14 max-w-full rounded-full`}
                        title={`${ comment.user._id }`}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <p className='font-semibold'>
                                { comment.user.username }
                            </p>
                            <p className='text-xs mt-1 text-gray-500 mx-3'>
                                { moment( comment.createdAt ).locale('es').format('LLL') }
                            </p>
                        </div>
                        {
                            userInfo && userInfo.id === comment?.user.id  ? (
                                <button
                                    type='button'
                                    className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-1 border border-red-500 hover:border-transparent rounded'
                                    onClick={ deleteCommentHandle }
                                >
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <p className='my-3 break-all'>
                        { comment.body }
                    </p>
                    <div>
                    <ReactStars 
                        count={5}
                        value={comment.rating}
                        size={25}
                        isHalf={true}
                        emptyIcon={ <i className="far fa-star"></i> }
                        halfIcon={ <i className="far fa-star-half"></i> }
                        fullIcon={ <i className="fas fa-star"></i> }
                        edit={false}
                    />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Comment;
