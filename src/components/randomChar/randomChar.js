import React, {Component} from 'react';
import GOT_Service from "../../services/GOT_Service";
import './randomChar.css';
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;

    return (
        <>
            <h4>Random Character: { name || "N/A" }</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{ gender || "N/A" }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{ born || "N/A" }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{ died || "N/A" }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{ culture || "N/A" }</span>
                </li>
            </ul>
        </>
    )
}

export default class RandomChar extends Component {

    GOT_Service = new GOT_Service();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 11);
        this.GOT_Service.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => this.setState({
        char,
        loading: false
    })

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const { loading, char, error } = this.state;

        const content = loading ? <Spinner /> : <View char={char}/>;

        return (
            <div className="random-block rounded">
                {
                    error ? <ErrorMessage /> : content
                }
            </div>
        );
    }
}


