import React from 'react'
import Select from 'react-select';

class SingleSelect extends React.Component {
	handleChange = value => {
	    this.props.onChange(this.props.name, value);
	};
  
	handleBlur = () => {
	    this.props.onBlur(this.props.name, true);
	};
  
	render() {
	    return (
		    <div style={{ margin: '1rem 0' }}>
		        {this.props.title?<label htmlFor="color">{this.props.title}</label>:""}
		        <Select
		            getOptionLabel={values => values.name}
					getOptionValue={values => values._id}
			        isClearable={true}
			        isSearchable={true}
			        name={this.props.name}
		            options={this.props.values}
			        onChange={this.handleChange}
			        onBlur={this.handleBlur}
                    value={this.props.value}
                    placeholder={<div>{this.props.placeholder}</div>}
		        />

		        {!!this.props.error &&this.props.touched && (
			        <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
		        )}
		    </div>
	  );
	}
}

export { SingleSelect };