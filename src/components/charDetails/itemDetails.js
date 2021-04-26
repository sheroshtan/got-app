import React, {Component} from 'react';
import './itemDetails.css';

export const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{ label }</span>
            <span>{ item[field] || "N/A" }</span>
        </li>
    )
}

export default class ItemDetails extends Component {

    state = {
        item: {}
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    updateItem = () => {
        this.props.getSpecificData(this.props.itemId)
            .then(data => this.setState({item: data}));
    }

    render() {
        const { name } = this.state.item;
        const { item } = this.state;

        return (
            <div className="char-details rounded">
                <h4>{ name || "N/A" }</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}