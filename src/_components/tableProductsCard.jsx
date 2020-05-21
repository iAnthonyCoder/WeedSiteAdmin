import React from 'react';

function TableProductsCard(props) {

    return( 
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Your lastest products added</h4>
            </div>
            <div className="table-responsive">
                <table className="table card-table table-vcenter">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Commit</th>
                            <th>Date</th>
                        </tr>
                	</thead>
                	<tbody>
                		<tr>
                	    	<td className="w-1">
                	      		<span className="avatar" style={{backgroundImage:"url(./static/avatars/000m.jpg)"}}></span>
                	    	</td>
                	    	<td className="td-truncate">
                	      		<div className="text-truncate">
                	        		Fix dart Sass compatibility (#29755)
                	      		</div>
                	    	</td>
                	    	<td className="text-nowrap text-muted">
								28 Nov 2019
							</td>
                	  	</tr>
                	  	<tr>
                	    	<td className="w-1">
                	      		<span className="avatar" style={{backgroundImage:"url(./static/avatars/000m.jpg)"}}></span>
                	    	</td>
                	    	<td className="td-truncate">
                	      		<div className="text-truncate">
                	        		Fix dart Sass compatibility (#29755)
                	      		</div>
                	    	</td>
                	    	<td className="text-nowrap text-muted">28 Nov 2019</td>
                	  	</tr>
                	  	<tr>
                	    	<td className="w-1">
                	      		<span className="avatar" style={{backgroundImage:"url(./static/avatars/000m.jpg)"}}></span>
                	   	 	</td>
                	    	<td className="td-truncate">
                	      		<div className="text-truncate">
                	        		Fix dart Sass compatibility (#29755)
                	      		</div>
                	    	</td>
                	    	<td className="text-nowrap text-muted">28 Nov 2019</td>
                	  	</tr>
                	  	<tr>
                	    	<td className="w-1">
                	      		<span className="avatar" style={{backgroundImage:"url(./static/avatars/000m.jpg)"}}></span>
                	    	</td>
                	    	<td className="td-truncate">
                	      		<div className="text-truncate">
                	        		Fix dart Sass compatibility (#29755)
                	      		</div>
                	    	</td>
                	    	<td className="text-nowrap text-muted">28 Nov 2019</td>
                	  	</tr>
                	  	<tr>
                	    	<td className="w-1">
                	      		<span className="avatar" style={{backgroundImage:"url(./static/avatars/000m.jpg)"}}></span>
                	    	</td>
                	    	<td className="td-truncate">
                	      		<div className="text-truncate">
                	        		Fix dart Sass compatibility (#29755)
                	      		</div>
                	    	</td>
                	    	<td className="text-nowrap text-muted">28 Nov 2019</td>
                	  	</tr>
                	  	<tr>
                	    	<td className="w-1">
                	      		<span className="avatar" style={{backgroundImage:"url(./static/avatars/000m.jpg)"}}></span>
                	    	</td>
                	    	<td className="td-truncate">
                	      		<div className="text-truncate">
                	        		Fix dart Sass compatibility (#29755)
                	      		</div>
                	    	</td>
                	    	<td className="text-nowrap text-muted">28 Nov 2019</td>
                	  	</tr>
                	</tbody>
            	</table>
        	</div>
    	</div>
    )
}

export { TableProductsCard }; 