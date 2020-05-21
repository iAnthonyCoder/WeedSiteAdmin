import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

import { productService } from '../_services';
import { PageHeader, TableCardHeader, UserTable, LoadingSpinner } from '../_components';
import { Add } from '../packages/add'
import $ from 'jquery';

function Table({ match }) {
    const [scopedItem, setScopedItem] = useState("")
    const [mutatedItems, setMutatedItems] = useState("")
    const [items, setItems] = useState("");
    const [fetched, setFetched] = useState(false);

    const columns = [{
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (rowContent, row) => {
        return (    
          <div className="d-flex lh-sm py-1 align-items-center">
            <span className="avatar mr-2" style={{backgroundImage: `url("${(row && row.picture)?row.picture:''}")`}}></span>
            <div className="flex-fill"><div className="strong">{row.name}</div></div>
          </div>
        )
      }
    }, {
      dataField: 'category.name',
      text: 'Category',
      sort: true
    }, {
      dataField: 'brand.name',
      text: 'Brand',
      sort: true
    }, {
      dataField: 'slug',
      text: 'Slug',
      sort: true
      }
    ];

    const fetchItems = () => {
      productService.getAll().then((res) => {setItems(res);setMutatedItems(res); setFetched(true)})
     
    }

    useEffect(() => {
      fetchItems();
      
    }, [])

  

    const handleSearch = async (e) => {
      const { value } = e.target;
      if(value.length < 1){
        setMutatedItems(items); 
      }
      else  {
        var searchResult = await items.filter((item)=>{
          return  item.name.toLowerCase().includes(value.toLowerCase()) ||
                  item.description.toLowerCase().includes(value.toLowerCase()) ||
                  item.category.name.toLowerCase().includes(value.toLowerCase()) ||
                  item.brand.name.toLowerCase().includes(value.toLowerCase())
        });
        setMutatedItems(searchResult); 
      }
    }

    
    function scopeItem(object){
      setScopedItem(object);
      $("#modal-new-package").modal("show");
    }


    function renderTable(){
      return  <div className="card">
                <TableCardHeader title="Products" handleSearch={handleSearch} />
                  <div className="table-responsive">
                    <UserTable items={mutatedItems} scopeItemAdd={scopeItem} columns={columns}/>
                  </div>
              </div>
    }
  
    return (
      <>
        <Add product={scopedItem} />
        <PageHeader title="Available products" link="/product/create" nameButton="Request a product inclussion" subtitle="Right click on an Item and select Add option"/>
        <div className="box">
        {
          (fetched) ? renderTable() : <LoadingSpinner />       
        }
        </div>
      </>
    );
}

export { Table };