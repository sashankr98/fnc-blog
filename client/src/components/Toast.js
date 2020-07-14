import React from 'react';
import './styles/Toast.css';

class Toast extends React.Component {
    render() {
        if (this.props.message === "") {
            return null;
        }
        return (
            <div
                key={Math.random()}
                className="toast">
                {this.props.message}
            </div>
        )
    }
}

export default Toast;