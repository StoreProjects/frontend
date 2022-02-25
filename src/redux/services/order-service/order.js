import axios from 'axios';
export const OrdersMine = async ( userInfo ) => {
    const { data } = await axios.get(`/api/order/mine`, {
        headers: {
            token: `${ userInfo.token }`
        }
    });
    return data;
}