import React,{ useEffect, useState } from 'react';
import { PageHeader, NoResults, TableCardHeader, SuperTable, LoadingSpinner } from '../../../_components';
import { Update } from './update';
import { purchaseService, alertService } from '../../../_services';
import $ from 'jquery';
import Pagination from "react-js-pagination";
const _thisService = purchaseService;
const _thisSection = "Purchase";
const _thisSectionPl = "Purchases";



function Pending({ match }) {
    const { path } = match;
    const [scopedItem, setScopedItem] = useState("")
    const [items, setItems] = useState("")
    const [mutatedItems, setMutatedItems] = useState("")
    const [fetched, setFetched] = useState(false);
    const defaultAvatar = "./static/user.png";
    const columns = [
      {
      dataField: 'method',
      text: 'Method',
      sort: true
    }, {
      dataField: 'date',
      text: 'Date',
      sort: true
    }, {
      dataField: 'reference',
      text: 'Reference',
      sort: true
      }, {
        dataField: 'amount',
        text: 'Amount',
        sort: true
        }, {
          dataField: 'status',
          text: 'Status',
          sort: true
          }
    ];

    // const firePagination = (length,pageChange, items) => {
    //   setTotalItems(res.length);
    //   _handlePageChange(1)
    //   setPaginatedItems(res.slice(0,itemsPerPage))
    // }


    const fetch = async () => {
      await _thisService.getAllPending()
        .then((res)=>{
          setItems(res)
          setMutatedItems(res)
          setFetched(true)
        })
    }
    
    useEffect(() => {
      fetch()
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
                  item._id.toLowerCase().includes(value.toLowerCase())
        });
        setMutatedItems(searchResult); 
      }
    }

    function updateOne(id, newItem){
      let filteredState = items.filter( item => item._id !== id );
      setItems(filteredState)
      setMutatedItems(filteredState)
    }

    // function deleteByID(id){
    //   console.log(id);
    //   if(window.confirm("Are you sure do you want to delete this item?")){
    //     _thisService.delete(id).then(()=>{
    //       let filteredState = items.filter( item => item._id !== id );
    //       setItems(filteredState)
    //       setMutatedItems(filteredState)
    //       alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
    //     });
    //   };     
    // }

    function scopeItem(object){
      setScopedItem(object);
      $("#modal-update").modal("show");
    }


function renderTable(){
  return  <div className="card">
            <TableCardHeader title={_thisSectionPl} handleSearch={handleSearch} />
              <div className="table-responsive">
                <SuperTable items={mutatedItems}  scopeItem={scopeItem}  columns={columns}/>
              </div>
          </div>
}

return (
  <>
    <Update updateOne={updateOne} object={scopedItem}/>
    <PageHeader title={`Admin/Requests/${_thisSection}`} link="create" subtitle={`${_thisSectionPl} list`} toggle="modal" target="#modal-create" />
    <div className="box">
    {
      (fetched) ? renderTable() : <LoadingSpinner />       
    }
    </div>
  </>
);
}

export { Pending };