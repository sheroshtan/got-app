import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


class App extends React.Component {

    state = {
        showRandom: true
    }

    onToggleRandom = () => {
        this.setState((state) => ({showRandom: !state.showRandom}));
    }

    render() {

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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default App;