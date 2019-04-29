import React from 'react'

export default class ShowTask extends React.Component {
    renderTask() {
        return (
            this.props.taskData.map(data =>
                <tr>
                    <td key={data.taskId} className='jumbotron'>{data.taskName}</td>
                    <td key={data.startDate} >{data.startDate}</td>
                    <td key={data.endDate} >{data.endDate}</td>
                    <td key={data.priority}>{data.priority}</td>
                    <button type="button" className="btn btn-primary">UPDATE</button>
                    <button type="button" className="btn btn-danger">SUSPEND</button>
                </tr>

            )
        )
    }
    render() {
        return (
            <div>
                <table className="table table-borderless table-condensed table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">TASK NAME</th>                           
                            <th className="text-center">START DATE</th>
                            <th className="text-center">END DATE</th>
                            <th className="text-center">PRIORITY</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTask()}
                    </tbody>
                </table>
            </div>
        )
    }
}