import React, { useState } from 'react';
import './Navbar.css';

function Navbar(props) {
    const[focused, setFocused] = useState(props.focused)
    function handleClick(event) {
        setFocused(event.target.attributes.name.value);
        props.onPageClick(event.target.attributes.name.value);
    }
    return (
        <div className="Navbar">
            <ul>
                {
                    props.pages.map(function(page, index){
                        var style = '';
                        if(focused === page) {
                            style = 'focused';
                        }
                        return (
                        <li 
                        className={style} 
                        name={page}
                        key={page} 
                        onClick={handleClick}>
                            {page}
                        </li>);
                    })
                }
                
                {/* <li>Posts</li>
                <li>About</li> */}
            </ul>
        </div>
    );
}

export default Navbar;