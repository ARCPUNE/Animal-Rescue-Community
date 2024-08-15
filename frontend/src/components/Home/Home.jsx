import React from 'react'
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Listing from './Listing';
import ProductAndServices from './ProductAndServices';

export default function Home() {
    return (
        
<div className='w-auto h-auto'>
        <ImageSlider />
        <Listing />
        <ProductAndServices />

        </div>
    );
}