import React, {Component} from "react"
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../charDetails";
import ErrorMessage from "../../errorMessage";
import RowBlock from "../../rowBlock";

export default class HousePage extends Component {
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
                renderItem={({name}) => `${name}`}/>
        );

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem}
                         getSpecificData={getSpecificData}>
                <Field field="region" label="Region"/>
                <Field field="words" label="Words"/>
            </ItemDetails>
        );

        return <RowBlock left={itemList} right={itemDetails}/>
    }
}
