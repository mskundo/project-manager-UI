import React from 'react';

export default class GetUser extends React.Component {

    renderUser() {
        return (
            this.props.userData.map(data =>
                <tbody>
                    <tr>
                        <td key={data.userId} className='jumbotron'>{data.firstName}</td>
                        <button type="button" className="btn btn-primary">UPDATE</button>
                    </tr>
                    <tr>
                        <td key={data.userId} className='jumbotron'>{data.lastName}</td>
                        <button type="button" className="btn btn-danger">DELETE</button>
                    </tr>
                    <tr>
                        <td key={data.userId} className='jumbotron'>{data.empId}</td>
                    </tr><br />
                </tbody>
            )
        )
    }
    render() {
        return (
            <div>
                <table className="table table-borderless table-condensed table-hover">
                    {this.renderUser()}
                </table>
            </div>
        )
    }
}