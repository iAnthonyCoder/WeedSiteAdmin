import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

import { productService, categoryService, brandService, alertService } from '../../_services';
import { PageHeader, NoResults, ProductCard } from '../../_components'
import { Create } from './create';
import $ from "jquery"
import { Update } from './update'


function List({ match }) {
    const { path } = match;
    const [mutatedItems, setMutatedItems] = useState("")
    const [searchMode, setSearchMode] = useState("")
    const [categories, setCategories] = useState("");
    const [brands, setBrands] = useState("");
    const [items, setItems] = useState("");
    const [filtering, setFiltering] = useState("");
    const [scopedItem, setScopedItem] = useState("")

    const fetchItems = () => {
      categoryService.getAll().then((res) => {setCategories(res)})
      brandService.getAll().then((res) => {setBrands(res)})
      productService.getAll().then((res) => {setItems(res);setMutatedItems(res)})
    }

    
    
    // const setActive = (e) => {
    //   const el=e.target;
    //   console.log(el);
    //   var cusid_ele = document.getElementsByClassName('categoryFilter');
    //   for (var i = 0; i < cusid_ele.length; ++i) {
    //     var item = cusid_ele[i];  
    //     if(item.classList.contains("active")){item.classList.remove("active")}
    //   }
    //   el.classList.add("active");
    // }

    const handleFilter = (e) => {
      const { name, value } = e.target;
      setFiltering({...filtering, [name]:value })
    }

    // const handleBrandFilter = (e) => {
    //   const value = e.target.value;
    //   setCategoryFilter(value)
    // }

    // const handleFilters = async (e) => {
    //       setSearchMode(!searchMode)
       
    //       var searchResult = await products.map((product)=>{
    //         return  product.category.id
    //       });
    //       setMutatedProducts(searchResult); 
    //   }

    // const filterProducts = async () => {
    //   var filterRules = [];
    //   var searchResult="";
    //   for (var n in filtering) {
    //     if (filtering.hasOwnProperty(n)) {
    //       filterRules.push(filtering[n])
    //     }
    //   }
    

     
    //   var searchResult = await products.map((product)=>{
    //     return  product.category.id.includes(filterRules)
    //   })
    //   console.log(searchResult);
    // }
   
    // const filterProducts = async (filterRules) => {

    //      var searchResult = await products.filter((product)=>{
         
    //         return  product.brand._id.includes(filtering) || product.category._id.includes(filtering)
    //       });
    //     }
      
    

  

    // useEffect(() => {
    //   var filterRules = [];
    //   var searchResult="";
    //   for (var n in filtering) {
    //     if (filtering.hasOwnProperty(n)) {
    //       filterRules.push(filtering[n])
    //     }
    //   }

    //   filterProducts(filterRules);
    // }, [filtering])



    function addNew(item){
  
      setItems([...items, item])
      setMutatedItems([...items, item]); 
    }



    function deleteByID(id){
      if(window.confirm("Are you sure do you want to delete this item?")){
        productService.delete(id).then(()=>{
          let filteredState = items.filter( item => item._id !== id );
          setItems(filteredState)
          setMutatedItems(filteredState)
          alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
        });
      };     
    }

    function scopeItem(object){
      setScopedItem(object);
    
      $("#modal-update-product").modal("show");
    }
    
    function updateOne(_id, newItem){
      setItems(items.map(item => (item._id === _id ? newItem : item)))
      setMutatedItems(items.map(item => (item._id === _id ? newItem : item)));
      $("#modal-update-product").modal("hide");
    }
    

    useEffect(() => {
      fetchItems();
    }, [])

    return (
        <>
      
          <Create addNew={addNew}/>
          <Update updateOne={updateOne} object={scopedItem}/>
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-auto">
                <h2 className="page-title">
                  Products
                </h2>
              </div>
              <div className="col-auto">
                <a className="btn btn-primary ml-3 d-none d-sm-inline-block" data-toggle="modal" data-target="#modal-new-product" href="/admin/create">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add new</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <form action="" method="get">
                {/*<div className="subheader mb-2">Category</div>
                 <div className="list-group list-group-transparent mb-3">
                  {
                    categories && categories.map((category) => 
                      <a onClick={filter} id={category._id} className="categoryFilter list-group-item list-group-item-action d-flex align-items-center" href="#">
                        {category.name}
                        <small className="text-muted ml-auto">24</small>
                      </a>
                    )
                  }
                </div> */}
                <div className="subheader mb-2">Categories</div>
                <div className="mb-3" style={{maxHeight: "200px",overflow: "scroll"}}>
                <div className="mb-3">
                  {
                    categories && categories.map((category) => 
                    <label className="form-check mb-1">
                      <input type="radio" value={category._id} onChange={handleFilter} id={category._id} className="form-check-input" name="category"  />
                      <span className="form-check-label">{category.name}</span>
                    </label>
                    )
                  }
                  
                </div></div>
                <div className="subheader mb-2">Brands</div>
                <div className="mb-3" style={{maxHeight: "200px",overflow: "scroll"}}>
                <div className="mb-3">
                  {
                    brands && brands.map((brand) => 
                    <label className="form-check mb-1">
                      <input type="radio"  value={brand._id} onChange={handleFilter} className="form-check-input" name="brand"  />
                      <span className="form-check-label">{brand.name}</span>
                    </label>
                    )
                  }
                </div></div>
                {/* <div className="subheader mb-2">Tags</div>
                <div className="mb-3">
                  <label className="form-check mb-1">
                    <input type="checkbox" className="form-check-input" name="form-tags[]" value="business" checked="" />
                    <span className="form-check-label">business</span>
                  </label>
                  <label className="form-check mb-1">
                    <input type="checkbox" className="form-check-input" name="form-tags[]" value="evening" />
                    <span className="form-check-label">evening</span>
                  </label>
                  <label className="form-check mb-1">
                    <input type="checkbox" className="form-check-input" name="form-tags[]" value="leisure" />
                    <span className="form-check-label">leisure</span>
                  </label>
                  <label className="form-check mb-1">
                    <input type="checkbox" className="form-check-input" name="form-tags[]" value="party" />
                    <span className="form-check-label">party</span>
                  </label>
                </div> */}
                <div className="subheader mb-2">Price</div>
                <div className="row row-sm align-items-center mb-3">
                  <div className="col">
                    <div className="input-group">
                      <span className="input-group-text">
                        $
                      </span>
                      <input type="text" className="form-control" placeholder="from" value="" />
                    </div>
                  </div>
                  <div className="col-auto">—</div>
                  <div className="col">
                    <div className="input-group">
                      <span className="input-group-text">
                        
                      </span>
                      <input type="text" className="form-control" placeholder="to" />
                    </div>
                  </div>
                </div> 
                <div className="mt-5">
                  <button className="btn btn-primary btn-block">
                    Confirm changes
                  </button>
                  <a href="#" className="btn btn-link btn-block">
                    Reset to defaults
                  </a>
                </div>
              </form>
            </div>
            <div className="col-9">
              <div className="row">
                  {
                    mutatedItems && mutatedItems.map( product => 
                      <ProductCard deleteByID={deleteByID} scopeItem={scopeItem} product={product} />
                    )
                  }
              </div>
            </div>
          </div>
        
      </>
       

    );
}

export { List };