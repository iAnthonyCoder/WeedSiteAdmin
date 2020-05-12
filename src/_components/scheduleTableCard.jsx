import React, { useEffect, useState } from 'react';

function ScheduleTableCard(props) {

    const [openNow, setOpenNow] = useState(false)


    const setTodayInfo = async (schedul) => {

        schedul.map( (days) => {
              
            
        var daysa = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        var d = new Date();
        d.getHours(); 
        var currentDay = daysa[d.getDay()];
        var currentHour = d.getHours();

        var hoursPerDay = days.closes_at - days.opens_at;
        var hoursAfterOpens = currentHour - days.opens_at;
      
        if(days.day===currentDay){
          if((hoursPerDay>hoursAfterOpens)&&(currentHour-days.opens_at>=0))
          {
            setOpenNow(true)
          }
        }else{
        }
      }
      )  
    }


    useEffect(() => {
      
      setTodayInfo(props.schedule);
      
    }, [])

    

    return(
      <div class="card">
      <div class="card-header" style={{justifyContent:"space-between"}}>
        {console.log(props)}
        <h4 class="card-title">Schedule</h4>
        {
          (openNow)?<h4 class="card-title" style={{color: "green"}}>OPEN NOW</h4>:<h4 class="card-title" style={{color: "red"}}>CLOSED</h4>
        }
        
      </div>
      {console.log(props)}
      <table class="table card-table table-vcenter">
        <thead>
          <tr>
            <th>Day</th>
            <th colspan="">Opens at</th>
            <th colspan="">Closes at</th>
          </tr>
        </thead>
        <tbody>
          {
            props.schedule && props.schedule.map( (days) => 
              (<tr>
                <td><strong>{days.day}</strong></td>
              
                <td>{days.opens_at}:00</td>
                <td>{days.closes_at}:00</td>
              </tr>)
            )
          }
          
        </tbody>
      </table>
    </div>
    )
}

export { ScheduleTableCard }; 