import React,{ useEffect, useState } from 'react';
import { PageHeader, NoResults } from '../../_components';
import { Create } from './create';
import { Update } from './update';
import { productService, alertService } from '../../_services';
import $ from 'jquery';

function Table({ match }) {
    const { path } = match;
    const productsInitialValue = "";
    const searchModeInitialValue = false;
    const [products, setProducts] = useState(productsInitialValue)
    const [manipuledProducts, setManipuledProducts] = useState(productsInitialValue)
    const [searchMode, setSearchMode] = useState(searchModeInitialValue)

    const objectScopedInitialValue="";
    const [objectScoped, setObjectScoped] = useState(objectScopedInitialValue)

    const fetchProducts = async () => {
      await productService.getAll().then((res)=>{
        setProducts(res)
      })
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
      fetchProducts()
    }, [])


    function addNew(product){
      setProducts([...products, product])
      $("#modal-create").modal("hide");
    }
    function updateOne(_id, object){
      let filteredState = products.filter( product => product._id !== _id );
      setProducts(filteredState)
      $("#modal-update").modal("hide");
    }

    function deleteByID(id, name){
      if(window.confirm("Are you sure do you want to delete "+name+"?")){
        productService.delete(id).then(()=>{
          let filteredState = products.filter( product => product._id !== id );
          setProducts(filteredState)
          alertService.success(name+' deleted sucessfully', { keepAfterRouteChange: true })
        });
      }; 
          
    }


    function scopeObject(object){
      
      const brandId = object.brand._id
      const categoryId = object.category._id
      object.brand=brandId;
      object.category=categoryId;
      setObjectScoped(object);
      $("#modal-update").modal("show");
    }

    return (
      
        <>
          <Create addNew={addNew} />
          <Update updateOne={updateOne} object={objectScoped}/>
            <PageHeader title="Admin/Requests/Products" link="create"  subtitle="Products list" toggle="modal" target="#modal-team" />
            <div class="box">
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">Products requests</h3>
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
                              <td>
                                <a href="#" onClick={()=>{scopeObject(product)}}>REVIEW</a>&nbsp;&nbsp;
                                <a href="#" onClick={()=>{deleteByID(product._id, product.name)}}>DECLINE</a>
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
                              <td>
                                <a href="#" onClick={()=>{scopeObject(product)}}>MANAGE</a>&nbsp;&nbsp;
                                <a href="#" onClick={()=>{deleteByID(product._id, product.name)}}>DELETE</a>
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