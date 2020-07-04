import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { scheduleService, alertService } from '../_services';
import { LoadingSpinner } from './loadingSpinner'
const Moment = require('moment');

function ScheduleTableCard(props) {

    const [openNow, setOpenNow] = useState(false)
    const [componentMode, setComponentMode] = useState(0); //0-> table - 1-> edit
    const [scopedItem, setScopedItem] = useState("")
	const [schedule, setSchedule] = useState("");
	const [isFetch, setIsFetch] = useState(false)
	const [formMulti, setFormMulti] = useState(false)
	
    const initialValues = {
		opens_at: (scopedItem.opens_at)?scopedItem.opens_at:'',
		closes_at: (scopedItem.closes_at)?scopedItem.closes_at:'',
		isEnabled:(scopedItem.isEnabled)?scopedItem.isEnabled:false,
    };

    const validationSchema = Yup.object().shape({
    	opens_at: Yup.string()
        	.required('Opens hour is required'),
        closes_at: Yup.string()
          	.required('Closes hour is required'),
  	});

    

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
		setStatus();
		if(formMulti==0){
			scheduleService.update(scopedItem._id,fields).then(data => {
				alertService.success('Item saved successfully', { keepAfterRouteChange: true });
				setComponentMode(0);
				resetForm({});
				setIsFetch(false)
				fetch()
			  })
			  .catch(error => {
				  setSubmitting(false);
			  });
		}
		if(formMulti==1){
			var id;
			const newObj = schedule.map(x => {
				x.opens_at=fields.opens_at
				x.closes_at=fields.closes_at
				x.isEnabled=fields.isEnabled
				delete x.__v
				delete x.opens_at_type
				delete x.closes_at_type
				id=x._id
				return x
			})
			
			scheduleService.updateMany(id,newObj).then(data => {
				alertService.success('Item saved successfully', { keepAfterRouteChange: true });
				setComponentMode(0);
				resetForm({});
				setIsFetch(false)
				fetch()
			  })
			  .catch(error => {
				  setSubmitting(false);
			  });
			
		}
      	
	}
	   
	   	const sortDays = (data) => {
			const sorter = {
				"SUNDAY": 0, 
				"MONDAY": 1,
				"TUESDAY": 2,
				"WEDNESDAY": 3,
				"THURSDAY": 4,
				"FRIDAY": 5,
				"SATURDAY": 6,
			}
			const sorted = data.sort(function sortByDay(a, b) {
				return sorter[a.day] - sorter[b.day];
			});
			return sorted;
	   }

	const setTodayInfoa = (schl) => {
		setOpenNow(false)
		var format = 'HH:mm'
		var time = Moment().format(format);
		var this_day = Moment().format('dddd').toUpperCase()
		schl.map(x => {
			if(x.day === this_day){
				if (Moment(time, format).isBetween(Moment(x.opens_at, format), Moment(x.closes_at, format), null, '[]')){
					setOpenNow(true)
					console.log("actualizando si esta abierto");
				}
			}
		})
	}

	const fetch = () => {
		scheduleService.getAll()
			.then(res => {
				setSchedule(sortDays(res));
				setTodayInfoa(res);
				setIsFetch(true)
			})
	}

    useEffect(() => {
		fetch()
    }, [])

    function getBody(){
		
    	if(componentMode===0){return getTable()}
    	if(componentMode===1){return getForm()}
    }

    const handleComponentMode = (type, value, item) => {
		setFormMulti(type)
		
		if(type==0){
			setScopedItem(item)
    		setComponentMode(value);
		}
		else{
			setScopedItem(false)
			setComponentMode(value);
		}
    }


    const getForm = () => {
    	return (
        	<Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit}>
        		{({ errors, touched, setFieldValue, isSubmitting, handleReset }) => (
          			<Form className="modal-content">
						 
						 {console.log(scopedItem)}
           				<div className="modal-header">
            				<h5 className="modal-title">Edit {scopedItem.day}</h5>
             				<button type="button" className="close" onClick={()=>{setComponentMode(0)}} aria-label="Close">
               					<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             				</button>
           				</div>
           				<div className="modal-body">
             				<div className="row mb-3 align-items-end">
               					<div className="col-6">
               						<label className="form-label">Opens at</label>
               						<Field name={`opens_at`} type="time" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                                
                                    </Field>
                                    <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
								</div>
								
             				</div>
             				<div className="row mb-3 align-items-end">
               					<div className="col-6">
               						<label className="form-label">Closes at</label>
               						<Field name={`closes_at`} type="time" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
									  
                                                            </Field>
                                                            <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
															</div>
							
             				</div>
             				<div className="row mb-3 align-items-end">
               					<div className="col">
               						<Field type="checkbox" name="isEnabled" className={'form-check-input ' + (errors.isEnabled && touched.isEnabled ? ' is-invalid' : '')} />
                	            	<label htmlFor="isEnabled" className="form-check-label">&nbsp;Enabled</label>
                	            	<ErrorMessage name="isEnabled" component="div" className="invalid-feedback" />
               					</div>
             				</div>
         				</div>
         				<div className="card-footer text-right">
   							<div className="d-flex">
     							<a href="#" className="btn btn-link"  onClick={handleReset}>Reset Form</a>
     							<button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
								{   
									isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> 
								}
         							Save
     							</button>
   							</div>
 						</div>
					</Form>
        		)}
        	</Formik>
        )
    }




    const getTable = () => {
    	return(  
			<div className="card">
				
            	<div className="card-header" style={{justifyContent:"space-between"}}>
                	<div style={{alignItems:"center", display:"flex"}}><h4 className="card-title" style={{paddingRight:"1em"}}>Hours of operation</h4><button type="button" onClick={()=>{handleComponentMode( 1 ,1)}} className="btn btn-primary">Edit All<svg xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path><line x1="16" y1="5" x2="19" y2="8"></line></svg></button>
                  </div>	{
                  	  	(openNow)?<h4 className="card-title" style={{color: "green"}}>OPEN NOW</h4>:<h4 className="card-title" style={{color: "red"}}>CLOSED</h4>
                  	}
                </div>
                <table className="table card-table table-vcenter">
                	<thead>
                    	<tr>
                      		<th>Day</th>
                      		<th colSpan="">Opens at</th>
                      		<th colSpan="">Closes at</th>
                      		<th colSpan="">Status</th>
                      		{(props.edit)?<th colSpan="">Actions</th>:""}
                    	</tr>
                  	</thead>
                	<tbody>
                  	{
                    	schedule && schedule.map( (day, index) => 
                    	(
							<tr key={index}>
                      			<td><strong>{day.day}</strong></td>
								<td>{Moment(day.opens_at,'HH:mm').format('hh:mm A')}</td>
								<td>{Moment(day.closes_at,'HH:mm').format('hh:mm A')}</td>
                      			<td>{(day.isEnabled)?<span className="badge badge-success">Enabled</span>:<span className="badge badge-danger">Disabled</span>}</td>
                      			{
                        			(props.edit)?<td><a onClick={()=>{handleComponentMode(0,1, day)}} href="#0">
                        			Edit<svg xmlns="http://www.w3.org/2000/svg"  className="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path><line x1="16" y1="5" x2="19" y2="8"></line></svg>
                      				</a></td>:""
                      			}     
							</tr>
						))
                  	}
                  	</tbody>
              	</table>
            </div>
		)
    }
    




	if(!isFetch) return <LoadingSpinner />
    return(
    	<>
        {
          getBody()
        }
		</>
    )
}

export { ScheduleTableCard }; 