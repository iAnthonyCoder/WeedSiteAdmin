import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery'
import { menuproductService } from '../_services';
import { PageHeader, LoaderBounce } from '../_components';
import ReactStars from 'react-rating-stars-component'
import { PackagesTable } from './packagesTable'

function Details(props) {
   
    const fetchedInitialState = false;
    const scopedPictureInitialState = "";
    const [item, setItem] = useState("");
    const [retailers, setRetailers] = useState("");
    const [fetched, setFetched] = useState(fetchedInitialState)
    const [scopedPicture, setScopedPicture] = useState(scopedPictureInitialState)


    const fetchItems = () => {
      menuproductService.getById(props.match.params.id).then((res) => {
        setItem(res);
        if(res.picture.length>0){
            setScopedPicture(res.product.picture[0])
        }
        setFetched(true)
      })
    }

    useEffect(() => {
      fetchItems();
    }, [])

    const handleScopedPicture = picture => {
        setScopedPicture(picture)
    }

    if(!fetched) return <LoaderBounce />
    return (
        <>
        	<PageHeader title="Admin/Products" subtitle="Product Details" />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {/* <div className="card-header">
                            <h4 className="card-title">{item.name}</h4>
                        </div> */}
                        <div className="card-body">
                           <div className="row">
                               <div  className="col-lg-4">
                                    <div className="mb-3">
                                        <img className="w-100 h-100 object-cover" src={scopedPicture}></img>
                                    </div> 
                                    <div className="row">
                                    {
									    item.picture && item.picture.map( (picture) =>
									    	<div key={picture} className="col-auto">
									    		<a onClick={()=>handleScopedPicture(picture)} style={{width:"80px", border:"1px solid silver", height:"80px",backgroundSize:"cover",backgroundPositionX: "center", backgroundImage: `url(${picture})`}} className="avatar avatar-upload rounded">
               						  		    </a>
               						    	</div> 
									    )
								    } 
                                    </div>
                               </div>
                               <div className="col-lg-8">
                                    <span className="badge badge-success">{(item.category)?item.category.name:""}</span>
                                    <h1 style={{textTransform: "uppercase"}}>{item.name}</h1>
                                    <h4 className="text-muted">BY {(item.brand)?item.brand.name:""}</h4>
                                    <div className="row"><div className="col-auto"><p style={{color:"rgb(147, 152, 6)", fontSize:"1em", marginBottom:"0em"}}>★★★★★</p></div><div className="col-auto">500 Ratings</div></div>
                                   <hr style={{margin: "0 0"}}></hr>
                                     {/* <br></br>
                                    <div className="row">
                                        <div className="col-auto"><h1 style={{marginBottom:"0"}}>$59.59</h1></div><div className="col-auto" style={{display: "flex",alignItems: "flex-end"}}><h4 style={{marginBottom:"2px"}}>per 1g</h4></div></div>
                                     
                                        <hr></hr> */}<br></br>
                                    <p>{item.description}</p>
                               </div>
                           </div>
                        </div>
                    </div>
                    <div className="card-tabs">
                        <ul className="nav nav-tabs">
                          	<li className="nav-item"><a href="#tab-top-1" className="nav-link active" data-toggle="tab">Variants</a></li>
                          	<li className="nav-item"><a href="#tab-top-2" className="nav-link" data-toggle="tab">Reviews</a></li>
                        </ul>
                        <div className="tab-content">
                  			<div id="tab-top-1" className="card tab-pane show active">
                    			<div className="card-body" style={{padding: "0"}}>
                                    <PackagesTable menuProductId={item._id} menuProductName={item.name} />
                      				
                    			</div>
                  			</div>
                  			<div id="tab-top-2" className="card tab-pane">
								<div className="card-body">
                      				<div className="card-title">Content of tab #2</div>
                      				<p>
                        				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid distinctio dolorem expedita, fugiat hic magni molestiae molestias odit.
                      				</p>
                    			</div>
                  			</div>
                		</div>
                    </div>
               </div>
            </div>
        </>
    )
}

export { Details };