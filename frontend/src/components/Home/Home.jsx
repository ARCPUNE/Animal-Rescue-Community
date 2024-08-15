import ImageSlider from './ImageSlider';
import Listing from './Listing';
import ProductAndServices from './ProductAndServices';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../Features/authSlice';
import { login } from '../../Features/userSlice';

export default function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const refreshToken = urlParams.get("refreshToken");
        
        if (token) {
            dispatch(setTokens(token, refreshToken));
          axiosInstance
          .get("/api/users/token", {
            withCredentials: true,
          })
          .then((response) => {
            dispatch(login(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
          
        }
      }, [navigate,dispatch]);

    return (
        
<div className='w-auto h-auto'>
        <ImageSlider />
        <Listing />
        <ProductAndServices />

        </div>
    );
}