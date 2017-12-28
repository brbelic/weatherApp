import React from 'react';

class Error extends React.Component {
    render() {
        const errorStatus = this.props.errorStatus;
        const searchFailed = this.props.searchFailed;

        if (searchFailed) {
            if(errorStatus === 404){
                return (
                    <div className="col-sm-6 col-sm-offset-3">
                        <span>City not found!</span>
                    </div>
                )
            }
            else {
                return (
                    <div className="col-sm-6 col-sm-offset-3">
                        <span>Something went wrong. Press F12 for more info.</span>
                    </div>
                )
            }
        }
        else{ return null}
    }
}

export default Error;