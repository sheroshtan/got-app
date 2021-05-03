import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages/characterPage";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage";
import BookItem from "../pages/bookPage/bookItem";
import './app.css';

class App extends React.Component {

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
            <BrowserRouter>
                <div className="app">
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

                        <Route path="/characters" render={() => <CharacterPage />}/>

                        <Route path="/houses" render={() => <HousePage />} exact />

                        <Route path="/books" render={() => <BookPage />} exact />

                        <Route path={`/books/:id`} render={
                            ({ match }) => {
                                const { id } = match.params;
                                return <BookItem id={id} />
                            }
                        }/>

                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;