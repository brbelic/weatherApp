import React from 'react';

class Error extends React.Component {
    render() {
        const searchFailed = this.props.searchFailed;
            if(searchFailed) {
                return (
                <div className="col-sm-6 col-sm-offset-3">
                    <span>City was not found!</span>
                </div>
                )
            }
            else{ return null}
    }
}

export default Error;