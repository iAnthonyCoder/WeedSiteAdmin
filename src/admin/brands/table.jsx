import React,{ useEffect, useState } from 'react';
import { PageHeader, NoResults } from '../../_components';
import { Create } from './create';
import { Update } from './update';
import { brandService, alertService } from '../../_services';
import $ from 'jquery';

function Table({ match }) {
    const { path } = match;
    const brandInitialValue = "";
    const searchModeInitialValue = false;
    const [brands, setBrands] = useState(brandInitialValue)
    const [manipuledBrands, setManipuledBrands] = useState(brandInitialValue)
    const [searchMode, setSearchMode] = useState(searchModeInitialValue)

    const objectScopedInitialValue="";
    const [objectScoped, setObjectScoped] = useState(objectScopedInitialValue)

    const fetchBrands = async () => {
      await brandService.getAll().then((res)=>{
        setBrands(res)
      })
    }

    const handleSearch = async (e) => {
      const { value } = e.target;
      const lowervalue=value.toLowerCase();
      if (value.length < 1){
        setSearchMode(false)
        setManipuledBrands([]); 
      }
      else{
          setSearchMode(true)
          
          var searchResult = await brands.filter((brand)=>{
            return  brand.name.toLowerCase().includes(lowervalue) ||
                    brand.description.toLowerCase().includes(lowervalue) ||
                    brand._id.toLowerCase().includes(lowervalue)
          });
          setManipuledBrands(searchResult); 
      }
      
    }

    useEffect(() => {
      fetchBrands()
    }, [])


    function addNew(brand){
      setBrands([...brands, brand])
      $("#modal-create").modal("hide");
    }
    function updateOne(_id, object){
      setBrands(brands.map(brand => (brand._id === _id ? object : brand)))
      $("#modal-update").modal("hide");
    }

    function deleteByID(id, name){
      if(window.confirm("Are you sure do you want to delete "+name+"?")){
        brandService.delete(id).then(()=>{
          let filteredState = brands.filter( brand => brand._id !== id );
          setBrands(filteredState)
          alertService.success(name+' deleted sucessfully', { keepAfterRouteChange: true })
        });
      }; 
          
    }


    function scopeObject(object){
      setObjectScoped(object);
      $("#modal-update").modal("show");
    }

    return (
      
        <>
          <Create addNew={addNew} />
          <Update updateOne={updateOne} object={objectScoped}/>
            <PageHeader title="Admin/Brands" link="create" nameButton="Add brand" subtitle="Brands list" toggle="modal" target="#modal-team" />
            <div class="box">
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">Brands</h3>
              <div class="ml-auto text-muted">
                  Search:
                  <div class="ml-2 d-inline-block">
                    <input type="text" onChange={handleSearch} class="form-control form-control-sm"/>
                  </div>
                </div>
            </div>
            {/* <div class="card-body border-bottom py-3">
              <div class="d-flex">
                 <div class="text-muted">
                  Show
                  <div class="mx-2 d-inline-block">
                    <input type="text" class="form-control form-control-sm" value="8" size="3"/>
                  </div>
                  entries
                </div> 
                
              </div>
            </div> */}
              <div class="table-responsive">
                <table class="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Description</th>
                      <th>Slug</th>
                      <th class="w-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      searchMode?(
                        manipuledBrands?(

                          (manipuledBrands.length>0)?(manipuledBrands.map( (brand) => 
                              <tr key={brand._id}>

                
                              <td>
                              <div class="d-flex lh-sm py-1 align-items-center">
                                <span class="avatar mr-2" style={{backgroundImage: `url(${brand.picture})`}}></span>
                                {brand.name}
                                </div>
                                </td>


                              <td class="text-muted">
                                {brand._id}
                              </td>
                              <td class="text-muted"><a href="#" class="text-reset">{brand.description}</a></td>
                              <td class="text-muted">
                                {brand.slug}
                              </td>
                              <td>
                                <a href="#" onClick={()=>{scopeObject(brand)}}>MANAGE</a>&nbsp;&nbsp;
                                <a href="#" onClick={()=>{deleteByID(brand._id, brand.name)}}>DELETE</a>
                              </td>
                            </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
                        ):("")

                      ):(

                        brands?(

                          (brands.length>0)?(brands.map( (brand) => 
                              <tr key={brand._id}>
                              <td><div class="d-flex lh-sm py-1 align-items-center">
                                <span class="avatar mr-2" style={{backgroundImage: `url(${brand.picture})`}}></span>
                                {brand.name}
                                </div></td>
                              <td class="text-muted">
                                {brand._id}
                              </td>
                              <td class="text-muted"><a href="#" class="text-reset">{brand.description}</a></td>
                              <td class="text-muted">
                                {brand.slug}
                              </td>
                              <td>
                                <a href="#" onClick={()=>{scopeObject(brand)}}>MANAGE</a>&nbsp;&nbsp;
                                <a href="#" onClick={()=>{deleteByID(brand._id, brand.name)}}>DELETE</a>
                              </td>
                            </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
                        ):("")
                      )
                      
                       
                      
                    } 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
    );
}

export { Table };