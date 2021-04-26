import React, {Component} from "react"
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../charDetails";
import ErrorMessage from "../../errorMessage";
import RowBlock from "../../rowBlock";

export default class CharacterPage extends Component {
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

        const {getAllData, getSpecificData} = this.props;

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getAllData={getAllData}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        );

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem}
                         getSpecificData={getSpecificData}>
                <Field field="gender" label="Gender"/>
                <Field field="born" label="Born"/>
                <Field field="died" label="Died"/>
                <Field field="culture" label="Culture"/>
            </ItemDetails>
        );

        return <RowBlock left={itemList} right={itemDetails}/>
    }
}
