import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

import { productService } from '../_services';
import { PageHeader, TableCardHeader, UserTable, LoadingSpinner } from '../_components';
import { alertService } from '../_services'
import { Add } from '../packages/add'
import { history } from "../_helpers";
import $ from 'jquery';
const _thisService = productService;

function Mylist({ match }) {
  const [scopedItem, setScopedItem] = useState("")
  const [mutatedItems, setMutatedItems] = useState("")
  const [items, setItems] = useState("");
  const [fetched, setFetched] = useState(false);




    const columns = [{
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (rowContent, row) => {
        return (    
          <div className="d-flex lh-sm py-1 align-items-center">
            <span className="avatar mr-2" style={{backgroundImage: `url("${(row && row.picture)?row.picture:''}")`}}></span>
            <div className="flex-fill"><div className="strong">{row.name}</div></div>
          </div>
        )
      }
    }, {
      dataField: 'description',
      text: 'Description',
      sort: true
    }, 
    // {
    //   dataField: 'brand.name',
    //   text: 'Brand',
    //   sort: true
    // }, 
    {
      dataField: 'slug',
      text: 'Slug',
      sort: true
      }
    ];

    const fetchItems = () => {
      productService.getMyList().then((res) => {setItems(res);setMutatedItems(res); setFetched(true)})
     
    }

    useEffect(() => {
      fetchItems();
      
    }, [])



    const handleSearch = async (e) => {
      const { value } = e.target;
      if(value.length < 1){
        setMutatedItems(items); 
      }
      else  {
        var searchResult = await items.filter((item)=>{
          return  item.name.toLowerCase().includes(value.toLowerCase()) ||
                  item.description.toLowerCase().includes(value.toLowerCase()) ||
                  item.category.name.toLowerCase().includes(value.toLowerCase()) ||
                  item.brand.name.toLowerCase().includes(value.toLowerCase())
        });
        setMutatedItems(searchResult); 
      }
    }



    // function scopeItem(object){
     
    //   setScopedItem(object);
    //   // $("#modal-update").modal("show");
    // }

    function deleteProductOfDispensary(id){
      if(window.confirm("Are you sure do you want to delete this item from your dispensary?")){
        _thisService.deleteFromDispensary(id).then(()=>{
          let filteredState = items.filter( item => item._id !== id );
          setItems(filteredState)
          setMutatedItems(filteredState)
          alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
        });
      };     
    }



    const edit = (id) => {
      history.push(`/packages/edit/${id}`)
    }







    function renderTable(){
      return  <div className="card">
                <TableCardHeader title="Products" handleSearch={handleSearch} />
                  <div className="table-responsive">
                    <UserTable items={mutatedItems} edit={edit} deleteByID={deleteProductOfDispensary} columns={columns}/>
                  </div>
              </div>
    }
  
    return (
      <>
        <Add product={scopedItem} />
        <PageHeader title="USER/MYLIST" link="/product/create" subtitle="Products in your dispensary"/>
        <div className="box">
        {
          (fetched) ? renderTable() : <LoadingSpinner />       
        }
        </div>
      </>
    );








    // return (
    //     <>
           
         
    //        <PageHeader title="User/Mylist" subtitle="Products in your dispensary"/>
    //       <div className="box">
    //         <div className="card">
    //         <div className="card-header">
    //           <h3 className="card-title">Products</h3>
    //           <div className="ml-auto text-muted">
    //               Search:
    //               <div className="ml-2 d-inline-block">
    //                 <input type="text" onChange={handleSearch} className="form-control form-control-sm"/>
    //               </div>
    //             </div>
    //         </div>
    //         {/* <div className="card-body border-bottom py-3">
    //           <div className="d-flex">
    //              <div className="text-muted">
    //               Show
    //               <div className="mx-2 d-inline-block">
    //                 <input type="text" className="form-control form-control-sm" value="8" size="3"/>
    //               </div>
    //               entries
    //             </div> 
                
    //           </div>
    //         </div> */}
    //           <div className="table-responsive">
    //             <table className="table table-vcenter card-table">
    //               <thead>
    //                 <tr>
    //                   <th>Name</th>
    //                   <th>ID</th>
    //                   <th>Description</th>
    //                   <th>Slug</th>
    //                   <th className="w-1">Actions</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {
    //                   searchMode?(
    //                     manipuledProducts?(

    //                       (manipuledProducts.length>0)?(manipuledProducts.map( (product) => 
    //                           <tr key={product._id}>

                
    //                           <td>
    //                           <div className="d-flex lh-sm py-1 align-items-center">
    //                             <span className="avatar mr-2" style={{backgroundImage: `url(${product.picture})`}}></span>
    //                             {product.name}
    //                             </div>
    //                             </td>


    //                           <td className="text-muted">
    //                             {product._id}
    //                           </td>
    //                           <td className="text-muted" style={{whiteSpace: "nowrap",textOverflow: "ellipsis", maxWidth: "200px",overflow: "hidden"}}><a href="#"  className="text-reset">{product.description}</a></td>
    //                           <td className="text-muted">
    //                             {product.slug}
    //                           </td>
    //                           <td>
    //                             <Link to={`/packages/edit/${product._id}`} className="btn btn-white">Edit</Link>
    //                           </td>
    //                         </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
    //                     ):("")

    //                   ):(

    //                     products?(

    //                       (products.length>0)?(products.map( (product) => 
    //                           <tr key={product._id}>
    //                           <td><div className="d-flex lh-sm py-1 align-items-center">
    //                             <span className="avatar mr-2" style={{backgroundImage: `url(${product.picture})`}}></span>
    //                             {product.name}
    //                             </div></td>
    //                           <td className="text-muted">
    //                             {product._id}
    //                           </td>
    //                           <td className="text-muted" style={{whiteSpace: "nowrap",textOverflow: "ellipsis", maxWidth: "200px",overflow: "hidden"}}><a href="#" className="text-reset">{product.description}</a></td>
    //                           <td className="text-muted">
    //                             {product.slug}
    //                           </td>
    //                           <td><Link to={`/packages/edit/${product._id}`} className="btn btn-white">Edit</Link>
    //                           <a href="#" className="btn btn-white" data-toggle="modal" onClick={()=>{deleteProductOfDispensary(product._id)}} >Kick from store</a></td>
                        
    //                         </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
    //                     ):("")
    //                   )
                      
                       
                      
    //                 } 
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //     </>
       

    // );
}

export { Mylist };