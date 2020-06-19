import React from 'react'
import AsyncSelect  from 'react-select/async';
import _ from 'lodash';



class SingleSelect extends React.Component {
	constructor(props) {
		super(props);
		this.getOptions = _.debounce(this.getOptions.bind(this), 500);
	  }
	
	  handleChange = selectedOption => {
		  this.props.onChange(this.props.name, selectedOption);
	  };

	  handleBlur = () => {
	    this.props.onBlur(this.props.name, true);
		};
	
	  mapOptionsToValues = options => {
		return options
	  };
	
	  getOptions = (inputValue, callback) => {
		if (!inputValue) {
		  return callback([]);
		}

		var endPointQuery=`?page=0&size=10&search=${inputValue}`

		if(this.props.extraQuery){
			endPointQuery += `&state=${this.props.extraQuery._id}`;
		}
		
		console.log(endPointQuery);

		this.props.endPoint(endPointQuery).then(data => {
			const results = data.totalData;
			callback(this.mapOptionsToValues(results));
		 
		});
	  };
	
	  render() {
		const { defaultOptions, placeholder,  } = this.props;
		return (
			<div style={{ margin: '1rem 0' }}>
			{this.props.title?<label htmlFor="color">{this.props.title}</label>:""}
		  <AsyncSelect
		  	getOptionLabel={values => values.name}
			getOptionValue={values => values._id}
			cacheOptions={(this.props.extraQuery)?false:true}
			value={this.props.value}
			defaultOptions={defaultOptions}
			loadOptions={this.getOptions}
			onBlur={this.handleBlur}
			placeholder={this.props.placeholder}
			onChange={this.handleChange}
		  />
		  {!!this.props.error &&this.props.touched && (
			        <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
		        )}
		    </div>
		);
	  }
}

export { SingleSelect };



// const response = await this.props.endPoint(`?page=0&size=10&search=${inputValue}`).then(response=>
// 	{return response.totalData;}
//   )