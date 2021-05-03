import React, {Component} from "react"
import ItemList from "../../itemList";
import ErrorMessage from "../../errorMessage";
import { withRouter } from 'react-router-dom';
import GOT_Service from "../../../services/GOT_Service";

class BookPage extends Component {

    GOT_Service = new GOT_Service();

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList
                onItemSelected={(id) => {
                    this.props.history.push(`${id}`);
                }}
                getAllData={this.GOT_Service.getAllBooks}
                renderItem={({name, released}) => `${name} (${released})`}/>
        )
    }
}

export default withRouter(BookPage);
