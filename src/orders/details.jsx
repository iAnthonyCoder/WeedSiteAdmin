import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { LoaderBounce, PageHeader } from '../_components';
import { Update } from './update';
import $ from 'jquery';
import { orderService, alertService } from '../_services';;


function Details(props) {

	const location = useLocation();
	const acceptedModalModeInitialValue = ""
	const [ acceptedModalMode, setAcceptedModalMode ] = useState(acceptedModalModeInitialValue)

	React.useEffect(() => {
		
		fetchItems();
	}, [location]);
   
    const fetchedInitialState = false;
    // const scopedPictureInitialState = "";
    const [item, setItem] = useState("");
    // const [retailers, setRetailers] = useState("");
    const [fetched, setFetched] = useState(fetchedInitialState)
    // const [scopedPicture, setScopedPicture] = useState(scopedPictureInitialState)


    const fetchItems = () => {
		const id = props.match.params.id
    	orderService.getById(id).then((res) => {
    	    setItem(res);
    	    setFetched(true)
    	})
	}
	
	const update = (_discount ) => {
		const newItem = {
			discount: _discount
		}
		orderService.update(props.match.params.id, newItem)
	}


	const handleProductOrderStatus = (status, discount, note) => {
		const newItem = {
			status: status,
			discount: discount,
			note:note
		}
		orderService.update(props.match.params.id, newItem)
			.then((res) => {
            	fetchItems()
            	alertService.success('Item updated successfully', { keepAfterRouteChange: true });
            })
            .catch(error => {
                // alertService.error(error);
            });
			
		
	}



	const showDiscountModal = () => {
		setAcceptedModalMode(true)
		$("#modal-update-order").modal("show");
	}

	const showNoteModal = () => {
		setAcceptedModalMode(false)
		$("#modal-update-order").modal("show");
	}

    if(!fetched) return <LoaderBounce />
    return (<>
		<Update item={item} handleProductOrderStatus={handleProductOrderStatus} confirm={acceptedModalMode}/>
        <PageHeader title="dispensary/orders" subtitle={`Order #${item.number} details`} />
        <div class="card">
            <div class="card-header d-print-none">
				<h3 class="card-title">STATUS:{
					(item.status=="PENDING")?(<>&nbsp;&nbsp;<span className="badge badge-info">{item.status}</span></>):
					(item.status=="ACCEPTED")?(<>&nbsp;&nbsp;<span className="badge badge-success">{item.status}</span></>):
					(item.status=="REJECTED")?(<>&nbsp;&nbsp;<span className="badge badge-danger">{item.status}</span></>):
					(item.status=="READY")?(<>&nbsp;&nbsp;<span className="badge badge-success">{item.status}</span></>):
					(item.status=="COMPLETED")?(<>&nbsp;&nbsp;<span className="badge badge-success">{item.status}</span></>):""
				}</h3>
                <div class="card-options">
					{
						item.status==="PENDING" && <>&nbsp;
							<button type="button" class="btn btn-success" onClick={()=>{showDiscountModal()}}>Confirm</button>&nbsp;
							<button type="button" class="btn btn-danger"  onClick={()=>{showNoteModal()}}>Reject</button>
						</>
					}
					{
						item.status==="ACCEPTED" && <>&nbsp;
							<button type="button" class="btn btn-primary"  onClick={()=>{handleProductOrderStatus("READY")}}>Ready for pickup</button>
						</>
					}
					{
						item.status==="REJECTED" && <>&nbsp;
							{/* <button type="button" class="btn btn-primary"  onClick={()=>{handleProductOrderStatus("READY")}}>Ready for pickup</button> */}
						</>
					}
					{
						item.status==="READY" && <>&nbsp;
							<button type="button" class="btn btn-primary"  onClick={()=>{handleProductOrderStatus("COMPLETED")}}>Mark as fullfilled</button>
							&nbsp;&nbsp;<button type="button" class="btn btn-success" onClick={()=>{window.print()}}><i class="si si-printer"></i>Print Invoice</button>
						</>
					}
					{
						item.status==="COMPLETED" && <>&nbsp;
							<button type="button" class="btn btn-success" onClick={()=>{window.print()}}><i class="si si-printer"></i>Print Invoice</button>
						</>
					}
			

					{/* {item.status==="CONFIRMED"||item.status!="FULLFILLED"?
						<>&nbsp;
							<button type="button" class="btn btn-primary"  onClick={()=>{markAsFullfilled()}}>MARK AS FULLFILLED</button>&nbsp;
							<button type="button" class="btn btn-success" onClick={()=>{window.print()}}><i class="si si-printer"></i> Print Invoice</button>
						</>
						:(item.status=="PENDING")?<>&nbsp;
					<button type="button" class="btn btn-success" onClick={()=>{showDiscountModal()}}> Confirm
                    </button>&nbsp;
					<button type="button" class="btn btn-danger"  onClick={()=>{rejectPurchase()}}> Reject
					</button></>:(item.status=="FULLFILLED")?<button type="button" class="btn btn-success" onClick={()=>{window.print()}}><i class="si si-printer"></i> Print Invoice</button>:<span className="badge badge-danger">REJECTED</span>
					} */}
                    
                </div>
            </div>
            <div class="card-body">
              	<div class="row">
                	<div class="col-6">
                  		<p class="h3">Company</p>
                  		<address>
                    		{item.package.menuProduct.dispensary.name}<br></br>
                    		{item.package.menuProduct.dispensary.city.state.name}, {item.package.menuProduct.dispensary.city.name}<br></br>
                    		{item.package.menuProduct.dispensary.addresszip}<br></br>
                    		{item.package.menuProduct.dispensary.email}
                  		</address>
                	</div>
                	<div class="col-6 text-right">
                  		<p class="h3">Client</p>
                  		<address>
                  		  {/* Street Address<br></br>
                  		  State, City<br></br>
                  		  Region, Postal Code<br></br> */}
							{item.user.name}<br></br>
                  		  {item.user.email}
                  		</address>
                	</div>
                	{/* <div class="col-12 my-5">
						<h1>Invoice Order #{item.number}</h1>
                	</div> */}
					<hr></hr>
              </div>
              <div class="table-responsive">
                	<table class="table">
                  		<thead>
                    		<tr>
                      			<th class="text-center" style={{width: "1%"}}></th>
                      			<th>Product</th>
                      			<th class="text-center" style={{width: "1%"}}>Qnt</th>
                      			<th class="text-right" style={{width: "1%"}}>Unit</th>
                      			<th class="text-right" style={{width: "1%"}}>Amount</th>
                    		</tr>
                  		</thead>
                  		<tbody>
							<tr>
                    			<td class="text-center">1</td>
                    			<td>
                      				<p class="strong mb-1">{item.package.menuProduct.name||item.package.menuProduct.product.name}</p>
                      				<div class="text-muted">{item.package.value+item.package.type}</div>
                    			</td>
                    			<td class="text-center">
                      				{item.quantity}
                    			</td>
                    			<td class="text-right">${item.package.price}</td>
                    			<td class="text-right">${item.quantity*item.package.price}</td>
                  			</tr>
                  			<tr>
                    			<td colspan="4" class="strong text-right">Subtotal</td>
                    			<td class="text-right">${item.subtotal}</td>
                  			</tr>
                  			<tr>
                  			  	<td colspan="4" class="strong text-right">Tax</td>
                  			  	<td class="text-right">{item.taxes}%</td>
                  			</tr>
                  			<tr>
                  			  	<td colspan="4" class="strong text-right">Discount</td>
                  			  	<td class="text-right">{item.discount}%</td>
                  			</tr> 
                  			<tr>
                  			  	<td colspan="4" class="font-weight-bold text-uppercase text-right">Total</td>
                  			  	<td class="font-weight-bold text-right">${item.total.toFixed(2)}</td>
                  			</tr>
                		</tbody>
					</table>
              	</div>
              	<p class="text-muted text-center">Thank you very much for doing business with us. We look forward to working with
                you again!</p>
        	</div>
        </div>
	</>)
}

export { Details };