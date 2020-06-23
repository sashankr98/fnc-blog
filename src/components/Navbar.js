import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: this.props.focused
        };
    }

    handlePageClick(event) {
        this.setState({
            focused: event.target.attributes.name.value
        });
        this.props.onPageClick(event.target.attributes.name.value);
    }

    render() {
        var self = this;
        return (
            <div className="Navbar">
                <h1>Friendly Neighbourhood Cucumber</h1>
                <ul id='pages'>
                    {
                        this.props.pages.map((page) => {
                            var style = this.state.focused === page ? 'focused ' : '';
                            style = style + 'page'
                            return (
                                <li
                                    className={style}
                                    name={page}
                                    key={page}
                                    onClick={self.handlePageClick.bind(self)}>
                                    {page}
                                </li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Navbar;