import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { scheduleService, alertService } from '../_services';
import { LoadingSpinner } from './loadingSpinner'

function ScheduleTableCard(props) {

    const [openNow, setOpenNow] = useState(false)
    const [componentMode, setComponentMode] = useState(0); //0-> table - 1-> edit
    const [scopedItem, setScopedItem] = useState("")
    const [schedule, setSchedule] = useState("");

    const initialValues = {
		opens_at: (scopedItem.opens_at)?scopedItem.opens_at:'',
		closes_at: (scopedItem.closes_at)?scopedItem.closes_at:'',
		opens_at_type: (scopedItem.opens_at_type)?scopedItem.opens_at_type:'',
		closes_at_type: (scopedItem.closes_at_type)?scopedItem.closes_at_type:'',
		isEnabled:(scopedItem.isEnabled)?scopedItem.isEnabled:'',
    };

    const validationSchema = Yup.object().shape({
    	opens_at: Yup.string()
        	.required('Opens hour is required'),
        closes_at: Yup.string()
          	.required('Closes hour is required'),
  	});

    const setTodayInfo = async (schedul) => {
		schedul.map( (days) => 
		{
			
        	var daysa = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        	var d = new Date();
        	d.getHours(); 
        	var currentDay = daysa[d.getDay()];
        	var currentHour = d.getHours();
        	
        	if(days.day===currentDay){
		
				if(days.opens_at_type=="AM"){
					var opens_at_check = parseInt(days.opens_at, 10)
					if(days.opens_at==12){opens_at_check=0}
				}
				else{
					if(days.opens_at!=12)
					{var opens_at_check = parseInt(days.opens_at, 10)+12}
					else{var opens_at_check = parseInt(days.opens_at, 10)}
				};
				if(days.closes_at_type=="AM"){
					var closes_at_check = parseInt(days.closes_at, 10)
					if(days.closes_at==12){closes_at_check=0}
				}
				else{
					if(days.closes_at!=12)
					{var closes_at_check = parseInt(days.closes_at, 10)+12}
					else{var closes_at_check = parseInt(days.closes_at, 10)}
				};

				var hoursPerDay = closes_at_check-opens_at_check;
				var hoursAfterOpens = currentHour - opens_at_check;

			
				if((currentHour-opens_at_check>=0)&&(hoursPerDay>hoursAfterOpens)){
					setOpenNow(true)
				}
        	} 
      	})  
    }

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    	setStatus();
      	scheduleService.update(scopedItem._id,fields).then(data => {
        	alertService.success('Item saved successfully', { keepAfterRouteChange: true });
            setComponentMode(0);
            setSchedule(schedule.map(item => (item._id === data.payload._id ? data.payload : item)))
            resetForm({});
          })
          .catch(error => {
              setSubmitting(false);
          });
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


    useEffect(() => {
		setSchedule(sortDays(props.schedule))
    	setTodayInfo(props.schedule);
    }, [])

    function getBody(){
		
    	if(componentMode===0){return getTable()}
    	if(componentMode===1){return getForm()}
    }

    const handleComponentMode = (value, item) => {
    	setScopedItem(item)
    	setComponentMode(value);
    }


    const getForm = () => {
    	return (
        	<Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit}>
        		{({ errors, touched, setFieldValue, isSubmitting, handleReset }) => (
          			<Form className="modal-content">
						 
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
               						<Field name={`opens_at`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
									   <option value="">Select</option>
                                                            <option value="12">12:00</option>
                                                                <option value="1">1:00</option>
                                                                <option value="2">2:00</option>
                                                                <option value="3">3:00</option>
                                                                <option value="4">4:00</option>
                                                                <option value="5">5:00</option>
                                                                <option value="6">6:00</option>
                                                                <option value="7">7:00</option>
                                                                <option value="8">8:00</option>
                                                                <option value="9">9:00</option>
                                                                <option value="10">10:00</option>
                                                                <option value="11">11:00</option>
                                                                
                                    </Field>
                                    <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
								</div>
								<div className="col-6">
									<Field  name={`opens_at_type`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
									<option value="">Select</option>
                                           <option value="AM">AM</option>
                                           <option value="PM">PM</option>
                                           
                                       </Field>
                                       <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
               					</div>
             				</div>
             				<div className="row mb-3 align-items-end">
               					<div className="col-6">
               						<label className="form-label">Closes at</label>
               						<Field name={`closes_at`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
									   <option value="">Select</option>
                                                            <option value="12">12:00</option>
                                                                <option value="1">1:00</option>
                                                                <option value="2">2:00</option>
                                                                <option value="3">3:00</option>
                                                                <option value="4">4:00</option>
                                                                <option value="5">5:00</option>
                                                                <option value="6">6:00</option>
                                                                <option value="7">7:00</option>
                                                                <option value="8">8:00</option>
                                                                <option value="9">9:00</option>
                                                                <option value="10">10:00</option>
                                                                <option value="11">11:00</option>
                                                                
                                                            </Field>
                                                            <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
															</div>
								<div className="col-6">
									<Field  name={`closes_at_type`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
									<option value="">Select</option>
                                           <option value="AM">AM</option>
                                           <option value="PM">PM</option>
                                           
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
                	<h4 className="card-title">Hours of operation</h4>
                  	{
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
								<td>{day.opens_at}:00 {day.opens_at_type}</td>
                      			<td>{day.closes_at}:00 {day.closes_at_type}</td>
                      			<td>{(day.isEnabled)?<span className="badge badge-success">Enabled</span>:<span className="badge badge-danger">Disabled</span>}</td>
                      			{
                        			(props.edit)?<td><a onClick={()=>{handleComponentMode(1, day)}} href="#0">
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
    




	if(!schedule) return <LoadingSpinner />
    return(
    	<>
        {
          getBody()
        }
		</>
    )
}

export { ScheduleTableCard }; 