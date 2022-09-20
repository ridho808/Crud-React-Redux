import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SaveProduct } from '../features/ProductSlice';

export const Addproduct = () => {
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState("");
    const Dispact = useDispatch();
    const Navigate = useNavigate();    
    const createproduct = async (e) => {
        e.preventDefault();
        await Dispact(SaveProduct({title,price}));
        Navigate('/')
    }
    
  return (
    <div>
        <form onSubmit={createproduct} className='box mt-5'>
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
