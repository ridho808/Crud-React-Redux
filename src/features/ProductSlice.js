import {createSlice,createAsyncThunk,createEntityAdapter} from '@reduxjs/toolkit';
import  Axios  from 'axios';


// untuk get product dari API
export const GetProduct = createAsyncThunk("product/GetProduct",async ()=>{
    const response = await Axios.get('http://localhost:5000/product');
    return response.data; 
});

// untuk post/save new product
export const SaveProduct = createAsyncThunk("product/SaveProduct",async ({title,price})=>{
    const response = await Axios.post('http://localhost:5000/product',{title,price});
    return response.data; 
});

// untuk delete product
export const DeleteProduct = createAsyncThunk("product/DeleteProduct",async (id)=>{
    await Axios.delete(`http://localhost:5000/product/${id}`);
    return id; 
});

// edit product 
export const UpdateProduct = createAsyncThunk("product/UpdateProduct",async ({id,title,price})=>{
    const response = await Axios.patch(`http://localhost:5000/product/${id}`,{title,price});
    return response.data; 
});


const ProductEntity = createEntityAdapter({
    selectId : (product) => product.id
});

const ProductSlice= createSlice({
    name : "product",
    initialState : ProductEntity.getInitialState(),
    extraReducers : {
        [GetProduct.fulfilled] : (state,action) => {
            ProductEntity.setAll(state,action.payload);
        },
        [SaveProduct.fulfilled] : (state,action) => {
            ProductEntity.addOne(state,action.payload);
        },
        [DeleteProduct.fulfilled] : (state,action) => {
            ProductEntity.removeOne(state,action.payload);
        },
        [UpdateProduct.fulfilled] : (state,action) => {
            ProductEntity.updateOne(state,{id: action.payload.id,updates : action.payload});
        }
    }
});

export const productSelectors = ProductEntity.getSelectors(state => state.product);
export default ProductSlice.reducer;