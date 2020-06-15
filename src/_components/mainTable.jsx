import React from 'react'
// import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import { productService, categoryService, brandService, alertService } from '../_services';
import { LoaderBounce } from '../_components'

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  totalData,
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
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
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

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, searchQuery })
  }, [fetchData, pageIndex, pageSize, searchQuery])

  // Render the UI for your table
  return (
    <>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">PRODUCTS</h3>
            </div>
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
          {[5,10,15].map(pageSize => (
            <option key={pageSize} value={pageSize}>{pageSize}</option>
          ))}
        </select></div>
                  entries
                </div>
                <div class="ml-auto text-muted">
                  Search:
                  <div class="ml-2 d-inline-block">
                    <input value={searchQuery} onChange={e => {
            setSearchQuery(e.target.value)
          }} type="text" class="form-control form-control-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
            {loading?<LoaderBounce></LoaderBounce>:
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

              <p class="m-0 text-muted">Showing <span>{(pageIndex==0)?1:pageIndex*pageSize}</span> to <span>{((pageIndex*pageSize)+pageSize)>totalData?totalData:(pageIndex*pageSize)+pageSize}</span> of <span>{totalData}</span> entries</p>
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



function MainTable() {
  const columns = React.useMemo(
    () => [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Category',
            accessor: row => row.category.name
          },
          {
            Header: 'Brand',
            accessor: row => row.brand.name
          },
          {
            Header: 'Strain',
            accessor: "a",
          },
          {
			Header: 'Actions',
			width:"100px",
            Cell:({row})=>(
          
            		<span style={{width:"100px"}} class="dropdown ml-1 position-static">
                    	<button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
                        <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
                        	<a class="dropdown-item" href="#">
                        		Action
                        	</a>
                        	<a class="dropdown-item" href="#">
                        		Another action
                        	</a>
                        </div>
                    </span>
              
            )
          }
    ],
    []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [totalData, setTotalData] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex, searchQuery }) => {
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


        productService.getAll(`?page=${pageIndex}&size=${pageSize}${searchQuery?`&search=${searchQuery}`:""}`)
        .then(data => {
            console.log(data);
            setData(data.totalData)
            if(data.totalCount.length>0){
                setPageCount(Math.ceil(data.totalCount[0].count / pageSize))
                setTotalData(data.totalCount[0].count)
            }
            else{
                setPageCount(0)
                setTotalData(0)
            }
            
        })



        // Your server could send back total page count.
        // For now we'll just fake it, too


        setLoading(false)
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
      />

  )
}

export { MainTable }