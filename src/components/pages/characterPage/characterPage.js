import React, {Component} from "react"
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import RowBlock from "../../rowBlock";
import GOT_Service from "../../../services/GOT_Service";

export default class CharacterPage extends Component {

    GOT_Service = new GOT_Service();

    state = {
        selectedItem: 1,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getAllData={this.GOT_Service.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        );

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem}
                         getSpecificData={this.GOT_Service.getCharacter}>
                <Field field="gender" label="Gender"/>
                <Field field="born" label="Born"/>
                <Field field="died" label="Died"/>
                <Field field="culture" label="Culture"/>
            </ItemDetails>
        );

        return <RowBlock left={itemList} right={itemDetails}/>
    }
}
