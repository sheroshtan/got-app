import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages/characterPage";
import GOT_Service from "../../services/GOT_Service";
import ItemList from "../itemList";
import ItemDetails from "../charDetails";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage";

class App extends React.Component {
    GOT_Service = new GOT_Service();

    state = {
        showRandom: true,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true});
    }

    onToggleRandom = () => {
        this.setState((state) => ({showRandom: !state.showRandom}));
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage />
        }

        const { showRandom } = this.state;
        const randomChar = showRandom ? <RandomChar showRandom={showRandom}/> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {
                                randomChar
                            }
                            <button className="btn btn-primary"
                                    style={{marginBottom: "30px"}}
                                    onClick={this.onToggleRandom}>Toggle</button>
                        </Col>
                    </Row>

                    <CharacterPage
                        getAllData={this.GOT_Service.getAllCharacters}
                        getSpecificData={this.GOT_Service.getCharacter}/>

                    <BookPage
                        getAllData={this.GOT_Service.getAllBooks}
                        getSpecificData={this.GOT_Service.getBook}/>

                    <HousePage
                        getAllData={this.GOT_Service.getAllHouses}
                        getSpecificData={this.GOT_Service.getHouse}/>

                </Container>
            </>
        );
    }
}

export default App;