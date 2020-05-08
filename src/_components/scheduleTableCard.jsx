import React from 'react';

function ScheduleTableCard(props) {

    return(
      <div class="card">
      <div class="card-header">
        <h4 class="card-title">Schedule</h4>
      </div>
      <table class="table card-table table-vcenter">
        <thead>
          <tr>
            <th>Day</th>
            <th colspan="">Opens at</th>
            <th colspan="">Closes at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>MONDAY</strong></td>
            <td>10:00</td>
            <td>10:00</td>
          </tr>
          <tr>
            <td><strong>TUESDAY</strong></td>
            <td>10:00</td>
            <td>10:00</td>
          </tr><tr>
            <td><strong>WEDNESDAY</strong></td>
            <td>10:00</td>
            <td>10:00</td>
          </tr><tr>
            <td><strong>THURSDAY</strong></td>
            <td>10:00</td>
            <td>10:00</td>
          </tr><tr>
            <td><strong>FRIDAY</strong></td>
            <td>10:00</td>
            <td>10:00</td>
          </tr><tr>
            <td><strong>SATURDAY</strong></td>
            <td>10:00</td>
            <td>10:00</td>
          </tr><tr>
            <td><strong>SUNDAY</strong></td>
            <td>10:00</td>
            <td>10:00</td>
          </tr>
        </tbody>
      </table>
    </div>
    )
}

export { ScheduleTableCard }; 