import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GetProduct, productSelectors,DeleteProduct} from '../features/ProductSlice';

export const Showproduct = () => {
  const dispacth = useDispatch();

  const Product = useSelector(productSelectors.selectAll);
  useEffect(() => {
    dispacth(GetProduct());
  }, [dispacth]);


  return (
    <div className='box mt-5'>
      <Link to={'/add'} className="button is-success">Add new</Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Product.map((product, index) => {
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <Link to={`edit/${product.id}`} className='button is-info is-small'>Edit</Link>
                  <button onClick={()=>dispacth(DeleteProduct(product.id))} className='button is-danger is-small'>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
