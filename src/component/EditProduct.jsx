import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { GetProduct,productSelectors,UpdateProduct } from '../features/ProductSlice';
import { useParams,useNavigate } from 'react-router-dom';


export const Editproduct = () => {
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState("");
    const dispacth = useDispatch();
    const Navigate= useNavigate();
    const {id} = useParams()

    const product = useSelector((state)=> productSelectors.selectById(state,id));

    useEffect(()=>{
        dispacth(GetProduct());
    },[dispacth]);
    
    useEffect(()=>{
       if(product){
        setTitle(product.title);
        setPrice(product.price);
       }
    },[product]);

    const handleUpdate = async (e)=>{
        e.preventDefault();
        await dispacth(UpdateProduct({id,title,price}));
        Navigate('/');
    }

  return (
    <div>
        <form onSubmit={handleUpdate} className='box mt-5'>
            <div className='field'>
                <label className='lable'>Title</label>
                <div className='control'>
                    <input 
                    type="text" 
                    className='input' 
                    value={title}
                    placeholder='Title'
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className='field'>
                <label className='lable'>Price</label>
                <div className='control'>
                    <input 
                    type="text" 
                    className='input'
                    value={price}
                    placeholder='Price'
                    onChange={(e)=>setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className='field'>
                <button className='button is-success'>Submit</button>
            </div>
        </form>
    </div>
  )
}
