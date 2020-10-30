import React from 'react';
import { Link } from 'react-router-dom';


function ProductCard(props) {

    return(
        (props.product.picture)?(  
            <div className="col-sm-6 col-lg-3">         
                <div className="card card-sm">
                    <div className="d-flex align-items-center">
                        <div className="ml-auto lh-1">
                            <div className="dropdown" style={{padding:"5px"}} >
                                <a className="dropdown- text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" >
                                    <a className="dropdown-item" onClick={()=>{props.scopeItem(props.product)}} href="#0">Edit</a>
                                    <a className="dropdown-item" onClick={()=>{props.deleteByID(props.product._id)}} href="#0">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" className="d-block" style={{backgroundImage: "url("+props.product.picture+")",height: "150px",backgroundSize: "cover"}}></a>
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="lh-sm" style={{width: "100%"}}>
                                <Link to={`products/${props.product._id}`}><div className="text-muted" style={{textTransform: "uppercase", fontWeight:"700", fontSize:"9px"}}>{(props.product.category)?(props.product.category.name):""}</div>
                                    <div style={{textTransform: "uppercase", fontSize:"1em", marginTop:"6px"}}>{props.product.name}</div>
                                </Link>
                                <div className="text-muted" style={{textTransform: "uppercase", fontSize:"11px"}}>BY {(props.product.brand)?(props.product.brand.name):""}</div>
                            </div>
                        </div>
                        <div className="text-muted" alt="Rating" style={{textAlign:"right", cursor:"pointer"}}>
                            <span style={{color:"#020202"}}>&#9733;&#9733;&#9733;</span><span style={{color:"#d2d2d2"}}>&#9733;&#9733;</span>
                        </div>  
                    </div>  
                </div>          
            </div>
        ):("")
    )
}

export { ProductCard }; 
