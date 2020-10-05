import React,{ useState } from 'react';
import {  accountService } from '../../_services';
const _thisService = accountService;

export default function Fixpassword(){

	const [ email, setEmail ] = useState('')

	const [ done, setDone ] = useState({
		email:'',
		password:'',
		done:false
	})

	const resetPassword = () => {
		console.log('asdasd');
		if(email && email.length>0){
			accountService.fixpassword(email)
                .then((res) => {
					console.log(res);
					setEmail('')
					setDone({
						email:res.email,
						password:res.password,
						done:true
					})
				})
				.catch(()=>{
					setDone({
						email:'',
						password:'',
						done:false
					})
					alert('Error changing the password in that dispensary')
				})
		} else {
			alert('input email')
		}
	}

	return(
		<>
		<div className="page-header">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <h2 className="page-title">
                                FIX PASSWORD
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <form className="card">
                            <div className="card-header">
                                <h4 className="card-title">Fix user password</h4>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-xl-8">
                                <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div className="row">
                                            <div className="">
                                                <div className="mb-3">
                                                    <label>Email</label><br></br>
                                                    <input name="name" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Input email"/>
                                                </div>
											</div>
										</div>
										{
											done.done === true ? (
												<>
													<h2>USER EMAIL: {done.email}</h2><br></br><br></br>
													<h2>PASSWORD: {done.password}</h2>
												</>
											) : ('')
										}
									</div>
									<button type='button' className='btn btn-primary' onClick={()=>resetPassword()}>RESET PASSWORD</button>
								</div>
							</div>
							
						</div>
					</div>
					
				</form>
			</div>
		</div></>
	)
}