import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

import { productService } from '../_services';
import { PageHeader, NoResults } from '../_components/'

function Table({ match }) {
    const { path } = match;
    const productsInitialState = "";
    const searchModeInitialValue = "";
    const [products, setProducts]=useState(productsInitialState);
    const [manipuledProducts, setManipuledProducts] = useState(productsInitialState)
    const [searchMode, setSearchMode] = useState(searchModeInitialValue)

     const fetchProducts = async () => {
        await productService.getAll().then(
          async(res) => {
            setProducts(res);
          }
        )
        
    }

    const handleSearch = async (e) => {
      const { value } = e.target;
      const lowervalue=value.toLowerCase();
      if (value.length < 1){
        setSearchMode(false)
        setManipuledProducts([]); 
      }
      else{
          setSearchMode(true)
          
          var searchResult = await products.filter((product)=>{
            return  product.name.toLowerCase().includes(lowervalue) ||
                    product.description.toLowerCase().includes(lowervalue) ||
                    product._id.toLowerCase().includes(lowervalue)
          });
          setManipuledProducts(searchResult); 
      }
      
    }

    useEffect(() => {
       fetchProducts();
      
    }, [])

    return (
        <>
           
         
           <PageHeader title="Available products" link="/product/create" nameButton="Request a product inclussion" subtitle="Click on Add button to put it into your store"/>
          <div class="box">
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">Products</h3>
              <div class="ml-auto text-muted">
                  Search:
                  <div class="ml-2 d-inline-block">
                    <input type="text" onChange={handleSearch} class="form-control form-control-sm"/>
                  </div>
                </div>
            </div>
            {/* <div class="card-body border-bottom py-3">
              <div class="d-flex">
                 <div class="text-muted">
                  Show
                  <div class="mx-2 d-inline-block">
                    <input type="text" class="form-control form-control-sm" value="8" size="3"/>
                  </div>
                  entries
                </div> 
                
              </div>
            </div> */}
              <div class="table-responsive">
                <table class="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Description</th>
                      <th>Slug</th>
                      <th class="w-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      searchMode?(
                        manipuledProducts?(

                          (manipuledProducts.length>0)?(manipuledProducts.map( (product) => 
                              <tr key={product._id}>

                
                              <td>
                              <div class="d-flex lh-sm py-1 align-items-center">
                                <span class="avatar mr-2" style={{backgroundImage: `url(${product.picture})`}}></span>
                                {product.name}
                                </div>
                                </td>


                              <td class="text-muted">
                                {product._id}
                              </td>
                              <td class="text-muted"><a href="#" class="text-reset">{product.description}</a></td>
                              <td class="text-muted">
                                {product.slug}
                              </td>
                            </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
                        ):("")

                      ):(

                        products?(

                          (products.length>0)?(products.map( (product) => 
                              <tr key={product._id}>
                              <td><div class="d-flex lh-sm py-1 align-items-center">
                                <span class="avatar mr-2" style={{backgroundImage: `url(${product.picture})`}}></span>
                                {product.name}
                                </div></td>
                              <td class="text-muted">
                                {product._id}
                              </td>
                              <td class="text-muted"><a href="#" class="text-reset">{product.description}</a></td>
                              <td class="text-muted">
                                {product.slug}
                              </td>
                        
                            </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
                        ):("")
                      )
                      
                       
                      
                    } 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
       

    );
}

export { Table };