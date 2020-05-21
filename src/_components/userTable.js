import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Menu, Item, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { NoResults } from './noResults';


class UserTable extends Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const deleteRow = ({ event, props }) => {this.props.deleteByID(props.row._id)}
        const editRow =({event,props})=>{this.props.edit(props.row._id)}
        const addRow =({event,props})=>{this.props.scopeItemAdd(props.row)}
        const viewRow =({event,props})=>{(props.row.city)?(this.props.details(props.row.user._id)):(this.props.details(props.row._id))}

        var MyMenu = () => (
            <Menu id='menu_id'>
                <Item disabled={(this.props.details)?false:true} onClick={viewRow}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="4" y1="6" x2="9.5" y2="6"></line><line x1="4" y1="10" x2="9.5" y2="10"></line><line x1="4" y1="14" x2="9.5" y2="14"></line><line x1="4" y1="18" x2="9.5" y2="18"></line><line x1="14.5" y1="6" x2="20" y2="6"></line><line x1="14.5" y1="10" x2="20" y2="10"></line><line x1="14.5" y1="14" x2="20" y2="14"></line><line x1="14.5" y1="18" x2="20" y2="18"></line></svg>&nbsp;See details</Item>
                <Item disabled={(this.props.scopeItemAdd)?false:true} onClick={addRow}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>&nbsp;Add</Item>
                <Item disabled={(this.props.edit)?false:true} onClick={editRow}><svg style={{marginTop:"4px"}}xmlns="http://www.w3.org/2000/svg" className="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path><line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line></svg>&nbsp;Edit</Item>
                <Item disabled={(this.props.deleteByID)?false:true} onClick={deleteRow}><svg style={{marginTop:"4px"}} xmlns="http://www.w3.org/2000/svg" className="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="4" y1="7" x2="20" y2="7"></line><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>  &nbsp; Delete all packages</Item>
            </Menu>
        );
        
        const indication = () => {
            return <NoResults />
        }

        const MySearch = (props) => { props.onSearch(this.props.search); return (""); };

        const rowEvents = {
            onContextMenu: (e, row, rowIndex) => {
                e.preventDefault();
                contextMenu.show({
                    id: 'menu_id',
                    event: e,
                    props: {
                        id:row.id,
                        row:row
                    }
                });
            },
        };

        const options = {
            
        };

        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                Showing { from } to { to } of { size } Results
            </span>
        );

        return(
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={ this.props.items }
                    columns={ this.props.columns }
                >

                {
                    props => (
                        <div>
                            <BootstrapTable
                                editIem = {this.props.editItem}
                                deleteIem = {this.props.deleteItem}
                                keyField='id'
                                data={  this.props.items }
                                columns={ this.props.columns }
                                rowEvents={rowEvents}
                                striped
                                hover
                                classes="table table-vcenter card-table"
                                bordered={ false }
                                responsive
                                pagination={ paginationFactory(options) }
                                noDataIndication={ indication }
                                { ...props.baseProps }
                            />
                        </div>
                    )
                }
                </ToolkitProvider>
                <MyMenu />
            </div>
        )
    }
}

export {UserTable};
