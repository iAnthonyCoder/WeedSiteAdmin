import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { securityService, alertService } from '../_services';
import { PageHeader } from '../_components'
import {
    LineChart, Line, XAxis, AreaChart, ResponsiveContainer, Pie, Area, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

  
function Overview({ match }) {
    const { path } = match;

    const addedRecordsInitialState = []
    const monthInitialState = ""
    const [addedRecords, setAddedRecords] = useState(addedRecordsInitialState)
    const [month, setMonth] = useState(monthInitialState)
    const [tableData, setTableData] = useState(addedRecordsInitialState)
    const [totalRevenue, setTotalRevenue] = useState(monthInitialState)
    const [totalCount, setTotalCount] = useState(monthInitialState)

    const fetch = () => {
        securityService.getAddedRecords()
            .then(res => {
                if(res.totalRevenue>0){
                    const chartData = res.chartData[0].data
                    const data = chartData.sort(function (a, b) {
                        if (a.day > b.day) {
                          return 1;
                        }
                        if (a.day < b.day) {
                          return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });
                    setAddedRecords(data)
                    setMonth(res.chartData[0]._id)
                    setTableData(res.tableData)
                    setTotalCount(res.totalDataCount[0].count)
                    setTotalRevenue(res.totalRevenue)
                }
            })
            .catch()
    }


    useEffect(() => {
        fetch();
    }, [])


    return (
        <div>
            <PageHeader title="Admin/Overview" link="admin/products/create" nameButton="Add product" subtitle="Dashboard" />
            <div class="row"><div class="col-lg-9">
                <div class="card">
                    <div className="card-body">
                        <h3 class="card-title">Lastest added products</h3>
                    </div>
                    <ResponsiveContainer width='100%' height={300}>
                        <AreaChart
                            data={addedRecords}
                            syncId="anyId"
                            margin={{
                              top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis  dataKey="day" tickFormatter={(label) => `${month} ${label}`}  />
                            <YAxis  />
                            <Tooltip />
                            <Area name="Added Items" type="monotone" dataKey="count" stroke="#7223b5" fill="#7a39b1"  />
                        </AreaChart>
                    </ResponsiveContainer>
                    <br></br>
                    <div class="table-responsive">
                        <table class="table card-table table-vcenter">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map(dat => 
                                        <tr>
                                            <td><Link to={`admin/products/${dat.itemId}`}>{dat.itemId}</Link></td>
                                            <td>{dat.date.substr(0,dat.date.indexOf("T"))}</td>
                                            <td>{dat.date.substr(dat.date.indexOf("T")+1,8)}</td>
                                        </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 

            
                <div class="col-lg-3">
            <div class="card">
                <div class="card-body p-2 text-center">
                <div class="text-right text-green">
                        <span class="text-green d-inline-flex align-items-center lh-1">
                        </span>
                      </div>
                    <div class="text-right text-green">  
                </div>
                <div class="h1 m-0">{totalCount}</div>
                    <div class="text-muted mb-4">Added items</div>
                </div>
            </div>
            <div class="card">
                <div class="card-body p-2 text-center">
                <div class="text-right text-green">
                        <span class="text-green d-inline-flex align-items-center lh-1">
                        </span>
                      </div>
                    <div class="text-right text-green">  
                </div>
                <div class="h1 m-0">${Math.ceil(totalRevenue)}</div>
                    <div class="text-muted mb-4">Total revenue</div>
                </div>
            </div>
            </div>


            </div>

            


        </div>
        
    );
}

export { Overview };