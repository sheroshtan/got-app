import React, {Component} from "react"
import ItemDetails, {Field} from "../../itemDetails";
import GOT_Service from "../../../services/GOT_Service";

export default class BookItem extends Component {

    GOT_Service = new GOT_Service();

    render() {
        return (
            <ItemDetails itemId={this.props.id}
                         getSpecificData={this.GOT_Service.getBook}>
                <Field field="numberOfPages" label="Pages"/>
                <Field field="publisher" label="Publisher"/>
            </ItemDetails>
        )
    }
}