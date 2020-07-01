import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { DesktopNotification } from "../_helpers/desktopNotifications"
import { notificationService } from '../_services'
import { getPublicApi } from '../_helpers/config'
import { history } from '../_helpers'
import { LoaderBounce } from '.'
import InfiniteScroll from "react-infinite-scroll-component";
const Moment = require('moment');


const socket = socketIOClient(getPublicApi.substr(0,getPublicApi.indexOf("api")));


function Notifications(props) {

	const itemsInitialState = [];
	const [items, setItems] = useState(itemsInitialState)
	const newItemInitialState = [];
	const [newItem, setNewItem] = useState(newItemInitialState)
	const isFetchedInitialState = false;
	const [isFetched, setIsFetched] = useState(isFetchedInitialState)
	const [existUnreaded, setExistUnreaded] = useState(false)
	const [existLayoutUnreaded, setExistLayoutUnreaded] = useState(false)
	const [hasMore, setHasMore] = useState(false)
	const [page, setPage] = useState(0)
	const length = 10;

	const markAllAsReaded = () => {
		notificationService.allReaded(props.user._id).then(res => {
			console.log(res);
			const updatedItems = items.map(item=>{
				item.readed = true;
				return item
			})
			setItems(updatedItems)
			setExistLayoutUnreaded(false)
			setExistUnreaded(false)
		});
	}

	const fetchData = () => {
		notificationService.getAll(`?size=${length}&page=${page}&sort=createdAt&sortDirection=asc`).then(res => {
			setItems(res.totalData);
			setHasMore(res.totalCount)
			if(res.alert) setExistUnreaded(true)
			setIsFetched(true);
			setPage(page+1)
		})
	}

	const fetchLastest = () => {
		notificationService.getAll("?size=1&page=0&sort=createdAt&sortDirection=asc").then(res => {
			setNewItem(res.totalData)
		})
	}

	const fetchMoreData = () => {
		notificationService.getAll(`?size=${length}&page=${page}&sort=createdAt&sortDirection=asc`).then(res => {
			setPage(page+1)
			setItems(items.concat(res.totalData))
			if(res.from===res.to){
				setHasMore(false)
			}
		})
	}

	const markAsReadedAndRedirect = async (item) => {
		
		if(!item.readed)
		{
			const newItem = { readed:true }
			item.readed=true;
			notificationService.update(item._id, newItem).then(res => {
				const updatedItems = items.map(x => {
					if(x._id===item._id){
						return item
					}else{
						return x
					}
				});
				
				setItems(updatedItems)
				checkLayoutReaded();
				history.push(`${props.user.type==="ADMIN"?"/admin/":"/"}${item.path}`)
			})
		}
		else{
		
			history.push(`${props.user.type==="ADMIN"?"/admin/":"/"}${item.path}`)
		}
	}

	const checkLayoutReaded = () => {
		var unreadedCount = 0;
		items.map(x => {
			if(x.readed==false){
				unreadedCount++
			}
		})
		if(unreadedCount<1){
			setExistLayoutUnreaded(false)
		}
	}

	const adminSocketsCotroller = () => {
		socket.on('newPlanPurchase', function (item) {
			DesktopNotification(item.description, item.picture, item.title)
			setExistLayoutUnreaded(true)
			fetchLastest()
		});
	}

	const dispensarySocketsController = () => {
		socket.on('updatedPurchaseStatus', function (item) {
			
			DesktopNotification(item.description, item.picture, item.title)
			setExistLayoutUnreaded(true)
			fetchLastest()
		});

	}
	
	
    useEffect(() => {
		socket.on("connect", () => {
			Notification.requestPermission();
		});

		socket.on('pushNotification', function (item) {
			
			DesktopNotification(item.description, item.picture, item.title)
			setExistLayoutUnreaded(true)
			fetchLastest()
		});

		socket.emit("setUserSocket", props.user._id);

		
		if(props.user.type === "ADMIN"){
			adminSocketsCotroller()
		}
		if(props.user.type === "DISPENSARY"){
			dispensarySocketsController()
		}
		fetchData();
	}, [])

	const addNewNotification = (item) => {
		const newItemsArray = [item[0], ...items]
		setItems(newItemsArray);
	}

	useEffect(() => {
		addNewNotification(newItem)
	}, [newItem])

	
	if(!isFetched) return (
		<div className="nav-item dropdown d-none d-md-flex mr-3">
				  <a href="#" className="nav-link px-0" data-toggle="dropdown" tabIndex="-1">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
						<span className="badge bg-red"></span>
				  </a>
				  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow dropdown-menu-card">
				  <LoaderBounce />
				 </div>
		  </div>
	  )

	const mapItems = () => {
		return (
		
			<InfiniteScroll
          		dataLength={length}
          		next={fetchMoreData}
				hasMore={hasMore}
				
				height={400}
          		loader={<h4>Loading...</h4>}
        	>
				{items && items.map((item, index) => 
					<a key={index} onClick={()=>{markAsReadedAndRedirect(item)}} className={`dropdown-item d-flex ${item.readed?"":"bg-light"} notification-item`} style={{height:"60px"}}><span className="avatar mr-3 align-self-center" style={{backgroundImage: "url(&quot;demo/faces/female/1.jpg&quot;)"}}></span><div>{(props.user.type==="ADMIN"||item.title.substr(0,6)=="placed")?<strong>{item.transmitter.name}</strong>:""} {item.title}: {item.description}.<div className="small">{Moment(item.createdAt).fromNow(true)} ago</div></div></a>
				)}
			</InfiniteScroll>
		
		)
	}



  return(
    <div className="nav-item dropdown d-none d-md-flex mr-3">
  	    	<a href="#" className="nav-link px-0" data-toggle="dropdown" tabIndex="-1">
  	      		<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
  	      		{!existUnreaded&&!existLayoutUnreaded?"":<span className="badge bg-red"></span>}
  	    	</a>
  	    	<div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow dropdown-menu-card" id="admin-notifications">
				<div className="notification-list">
				{
					(!isFetched)
					? <a className="dropdown-item d-flex bg-light"><span className="avatar mr-3 align-self-center" style={{backgroundImage: "url(&quot;demo/faces/female/1.jpg&quot;)"}}></span><div> <loaderBounce /></div></a>
					: (items.length>0)
					? (mapItems())
					: (<a className="dropdown-item d-flex bg-light" style={{marginTop:"0.5em"}}><span>No notifications</span></a>)
				}
				</div>
				{
					(items.length>0)
					?
					( 	
						<>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item text-center text-muted-dark" onClick={markAllAsReaded} style={{alignItems:"center", justifyContent:"center"}}>Mark all as read</a>
						</>
					)
					:("")
				}
			
		</div>
  	</div>
  )
}
export { Notifications };