import React from 'react';

function BasicUserCard(props) {

  const [ user ] = React.useState(props.user);

  function getAge () {
    var today = new Date();
    var birthDate = new Date(user.birthdate);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    return age_now;   
  }

  return(
    <div className="card">
      <div className="card-body">
        <div className="card-title">Account info</div>
        <div className="mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><line x1="3" y1="6" x2="3" y2="19"></line><line x1="12" y1="6" x2="12" y2="19"></line><line x1="21" y1="6" x2="21" y2="19"></line></svg>
          Name: <strong>{user.name}</strong>
        </div>
        <div className="mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path><line x1="12" y1="12" x2="12" y2="12.01"></line><path d="M3 13a20 20 0 0 0 18 0"></path></svg>
          Age: <strong>{getAge()}</strong>
        </div>
        <div className="mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="5 12 3 12 12 3 21 12 19 12"></polyline><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path></svg>
          Email: <strong>{user.email}</strong>
        </div>
        <div className="mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="12" cy="11" r="3"></circle><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"></path></svg>
             Role: <strong><span className="flag flag-country-si"></span>
          {user.type} Manager</strong>
        </div>
      </div>
    </div>
  )
}
export { BasicUserCard }; 