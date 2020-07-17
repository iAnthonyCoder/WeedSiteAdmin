import React,{forwardRef, useRef, useImperativeHandle } from 'react'
// import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import { productService, categoryService, brandService, alertService } from '../_services';
import { LoaderBounce, NoResults } from '../_components'

function Table({columns, filterParams, title, data,fetchData,loading,pageCount: controlledPageCount, totalData,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
	setPageSize,
	setPageIndex,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      filterParams,
      data,
      initialState: { pageIndex: 0, pageSize: 100 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
    const searchQueryInitialState = ""
    const [searchQuery, setSearchQuery] = React.useState(searchQueryInitialState)
    const filterQueryInitialState = ""
    const [filterQuery, setFilterQuery] = React.useState(filterQueryInitialState)

  React.useEffect(() => {
    console.log(filterParams);
	fetchData({ pageIndex, pageSize, searchQuery, filterQuery })
  }, [fetchData, pageIndex, pageSize, searchQuery, filterQuery])

  // Render the UI for your table
  return (
    <>
          <div class="card">
            {(title)?<div class="card-header">
              <h3 class="card-title">{title}</h3>
              &nbsp;&nbsp;
              {
                (filterParams)
                ?(
                  <select onChange={e => {setFilterQuery(e.target.value)}} className="form-select" style={{width:"200px"}}>
                    {
                      filterParams.map(x=>
                        <option value={x.value}>{x.label}</option>
                      )
                    }
                  </select>
                )
                :""
              }
            </div>:""}


            
            <div class="card-body border-bottom py-3">
              <div class="d-flex">
                <div class="text-muted">
                  Show
                  {/* <div class="mx-2 d-inline-block">
                    <input type="text" class="form-control form-control-sm" value="8" size="3" />
                  </div> */}<div class="mx-2 d-inline-block">
                  <select class="form-control form-control-sm"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5,10,15,25,50,100].map(pageSize => (
            <option key={pageSize} value={pageSize}>{pageSize}</option>
          ))}
        </select></div>
                  entries
                </div>
                <div class="ml-auto text-muted">
                  Search:
                  <div class="ml-2 d-inline-block">
                    <input value={searchQuery} onChange={e => {
            setSearchQuery(e.target.value); setSearchQuery(e.target.value); gotoPage(0)
          }} type="text" class="form-control form-control-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
            {loading?<LoaderBounce></LoaderBounce>:totalData<1?<NoResults />:
      <table className={"table card-table table-vcenter text-nowrap datatable"} {...getTableProps()}>
        <thead>

          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>}
      </div>
      <div class="card-footer d-flex align-items-center">
		  	
              <p class="m-0 text-muted">Showing <span>{(pageIndex==0&&totalData<1)?0:pageIndex*pageSize==0?1:pageIndex*pageSize}</span> to <span>{((pageIndex*pageSize)+pageSize)>totalData?totalData:(pageIndex*pageSize)+pageSize}</span> of <span>{totalData}</span> entries</p>
              <ul class="pagination m-0 ml-auto">
              <li class={`page-item ${!canPreviousPage?"disabled":""}`}>
                  <button class="page-link" onClick={() => gotoPage(0)}  href="#" tabindex="-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="15 6 9 12 15 18"></polyline></svg>
                    first
                  </button>
                </li>
                <li class={`page-item ${!canPreviousPage?"disabled":""}`}>
                  <button class="page-link" href="#" onClick={() => previousPage(0)}  tabindex="-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="15 6 9 12 15 18"></polyline></svg>
                    prev
                  </button>
                </li>

                {(pageIndex -2 <0)?"":<li class="page-item "><button class="page-link" onClick={() => gotoPage(pageIndex -2)} href="#">{pageIndex -1}</button></li>}
                {(pageIndex -1 <0)?"":<li class="page-item "><button class="page-link" onClick={() => gotoPage(pageIndex -1)} href="#">{pageIndex }</button></li>}
                <li class="page-item active"><button class="page-link" onClick={() => gotoPage(pageIndex)} href="#">{pageIndex +1}</button></li>
                {(pageIndex +2 >pageCount)?"":<li class="page-item"><button class="page-link" onClick={() => gotoPage(pageIndex +1)} href="#">{pageIndex +2}</button></li>}
                {(pageIndex +3 >pageCount)?"":<li class="page-item"><button class="page-link" onClick={() => gotoPage(pageIndex +2)} href="#">{pageIndex +3}</button></li>}
                <li class={`page-item ${!canNextPage?"disabled":""}`}>
                  <button onClick={() => nextPage()} class="page-link" href="#">
                    next <svg xmlns="http://www.w3.org/2000/svg"   class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="9 6 15 12 9 18"></polyline></svg>
                  </button>
                </li>
                <li class={`page-item ${!canNextPage?"disabled":""}`}>
                  <button onClick={() => gotoPage(pageCount - 1)} class="page-link" href="#">
                    Last <svg xmlns="http://www.w3.org/2000/svg"    class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="9 6 15 12 9 18"></polyline></svg>
                  </button>
                </li>
              </ul>
            </div>
      </div>
    </>
  )
}



const MainTable = forwardRef((props, ref) => {
  const columns = React.useMemo(
    () => props.columns,
    []
  )
   	useImperativeHandle(ref, () => {
      	return {
			  fetchData:
				  ()=>{fetchData(currentQuery)}
 	  	};
	});

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [currentQuery, setCurrentQuery] = React.useState({})
  const [totalData, setTotalData] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex, searchQuery, filterQuery }) => {
	setCurrentQuery({ pageSize, pageIndex, searchQuery, filterQuery })
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize
        var endpoint = `?page=${pageIndex}&size=${pageSize}${searchQuery?`&search=${searchQuery}`:""}${filterQuery?filterQuery:""}`

        if(props.param){
          endpoint = `${props.param}?page=${pageIndex}&size=${pageSize}${searchQuery?`&search=${searchQuery}`:""}${filterQuery?filterQuery:""}`
        }
        props.endPoint(endpoint)
        .then(data => {
           
			      setData(data.totalData)
            console.log(data)
            if(data.totalCount.length>0){
                setPageCount(Math.ceil(data.totalCount[0].count / pageSize))
				        setTotalData(data.totalCount[0].count)
                setLoading(false)
                
            }
            else{
                setPageCount(0)
				        setTotalData(0)
				        setLoading(false)
            }
            
		})



        // Your server could send back total page count.
        // For now we'll just fake it, too


       
      }
    }, 1000)
  }, [])

  return (

      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
		    totalData={totalData}
        title={props.title}
        filterParams={props.filterParams}
      />

  )
})

export { MainTable }