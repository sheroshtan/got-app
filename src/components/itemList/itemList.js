import React, {Component} from 'react';
import GOT_Service from "../../services/GOT_Service";
import './itemList.css';
import Spinner from "../spinner";


export default class ItemList extends Component {

    state = {
        itemList: [],
        loading: true
    }

    componentDidMount() {
        const { getAllData } = this.props;

        getAllData()
            .then(data => {
                this.setState({
                    itemList: data,
                    loading: false
                });
            })
    }

    render() {
        const { itemList, loading } = this.state;
        const { onItemSelected } = this.props;

        const items = itemList.map((item, i) => {
            const label = this.props.renderItem(item);

            return <li
                className="list-group-item"
                key={i}
                onClick={() => onItemSelected(i+1)}>
                        { label }
                   </li>
        })

        return (
            <ul className="item-list list-group">
                { loading
                    ? <Spinner />
                    : items
                }
            </ul>
        );
    }
}