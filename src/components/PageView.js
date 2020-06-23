import React from 'react';

import AboutView from './AboutView';

class PageView extends React.Component {
    render() {
        switch (this.props.page) {
            default:
                return <h2>{this.props.page} selected</h2>
            case 'About':
                return <AboutView />
        }
    }
}

export default PageView;