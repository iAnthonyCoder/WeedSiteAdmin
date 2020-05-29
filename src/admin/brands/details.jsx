import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery'
import { brandService } from '../../_services';
import { PageHeader, LoaderBounce, TableCardHeader, ProductsTable } from '../../_components';
import ReactStars from 'react-rating-stars-component'

function Details(props) {

    const [item, setItem] = useState("");
	const [fetched, setfetched] = useState(false);
	const [products, setProducts] = useState([]);


    const fetchItems = () => {
    brandService.getProductsByBrandId(props.match.params.id).then((res) => {
	
		setItem(res.brand);
		setProducts(res.products)
        setfetched(true);
      })
    }

    useEffect(() => {
      fetchItems();
    }, [])


    if(!fetched) return  <LoaderBounce></LoaderBounce>
    return (
        <>
			<PageHeader title={`Admin/Categories/${item.name}`}  subtitle="Details" />
			<div class="row">
				<div className="col-lg-4">
					<div class="card">
                		<div class="card-header">
                	  		<h3 class="card-title">{item.name}</h3>
                		</div>
                		<div class="card-body">
							<img style={{marginBottom:"3em"}} src={item.picture}></img>
							
                	 		<h3>Description:</h3>
							<p>{item.description}</p>
                		</div>
              		</div>
				</div>
				<div className="col-lg-8">
				{
					products && <ProductsTable items={products} />
				}
				</div>
			</div>
        </>
    )
}

export { Details };