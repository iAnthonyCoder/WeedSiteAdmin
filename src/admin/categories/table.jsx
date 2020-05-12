import React,{ useEffect, useState } from 'react';
import { PageHeader, NoResults } from '../../_components';
import { Create } from './create';
import { Update } from './update';
import { categoryService, alertService } from '../../_services';
import $ from 'jquery';

function Table({ match }) {
    const { path } = match;
    const categoriesInitialValue = "";
    const searchModeInitialValue = false;


    const objectScopedInitialValue="";
    const [objectScoped, setObjectScoped] = useState(objectScopedInitialValue)


    const [categories, setCategories] = useState(categoriesInitialValue)
    const [manipuledCategories, setManipuledCategories] = useState(categoriesInitialValue)
    const [searchMode, setSearchMode] = useState(searchModeInitialValue)

    const fetchCategories = async () => {
      await categoryService.getAll().then((res)=>{
        setCategories(res)
      })
    }

    useEffect(() => {
      fetchCategories()
    }, [])

    const handleSearch = async (e) => {
      const { value } = e.target;
      const lowervalue=value.toLowerCase();
      if (value.length < 1){
        setSearchMode(false)
        setManipuledCategories([]); 
      }
      else{
          setSearchMode(true)
          
          var searchResult = await categories.filter((category)=>{
            return  category.name.toLowerCase().includes(lowervalue) ||
                    category.description.toLowerCase().includes(lowervalue) ||
                    category._id.toLowerCase().includes(lowervalue)
          });
          setManipuledCategories(searchResult); 
      }
      
    }

    


    function addNew(category){
      setCategories([...categories, category])
    }
    function updateOne(_id, object){
      setCategories(categories.map(category => (category._id === _id ? object : category)))
    }

    function deleteByID(id, name){
      if(window.confirm("Are you sure do you want to delete "+name+"?")){
        categoryService.delete(id).then(()=>{
          let filteredState = categories.filter( category => category._id !== id );
          setCategories(filteredState)
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
          <Create addNew={addNew}/>
          <Update updateOne={updateOne} object={objectScoped}/>

            <PageHeader title="Admin/Categories" link="create" nameButton="Add category" subtitle="Categories list" toggle="modal" target="#modal-create" />
            <div class="box">
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">Categories</h3>
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
                        manipuledCategories?(

                          (manipuledCategories.length>0)?(manipuledCategories.map( (category) => 
                              <tr key={category._id}>
                              <td>{category.name}</td>
                              <td class="text-muted">
                                {category._id}
                              </td>
                              <td class="text-muted"><a href="#" class="text-reset">{category.description}</a></td>
                              <td class="text-muted">
                                {category.slug}
                              </td>
                              <td>
                                <a href="#" onClick={()=>{scopeObject(category)}}>MANAGE</a>&nbsp;&nbsp;
                                <a href="#" onClick={()=>{deleteByID(category._id, category.name)}}>DELETE</a>
                              </td>
                            </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
                        ):("")

                      ):(

                        categories?(

                          (categories.length>0)?(categories.map( (category) => 
                              <tr key={category._id}>
                              <td>{category.name}</td>
                              <td class="text-muted">
                                {category._id}
                              </td>
                              <td class="text-muted"><a href="#" class="text-reset">{category.description}</a></td>
                              <td class="text-muted">
                                {category.slug}
                              </td>
                              <td>
                                <a href="#" onClick={()=>{scopeObject(category)}}>MANAGE</a>&nbsp;&nbsp;
                                <a href="#" onClick={()=>{deleteByID(category._id, category.name)}}>DELETE</a>
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