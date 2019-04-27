import React from 'react';

export default class GetUser extends React.Component {

    renderUser() {
        return (
            this.props.userData.map(data =>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <thead>
                            <tr key={data.userId} className='jumbotron'>{data.firstName}</tr>
                            <tr key={data.lastName} className='jumbotron'>{data.lastName}</tr>
                            <tr key={data.empId} className='jumbotron'>{data.empId}</tr><br />
                        </thead>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            )
        )
    }
    render() {
        return (
            <div>
                <td>{this.renderUser()}</td>
            </div>
        )
    }
}