export default class GOT_Service {
    static API_URL = "https://www.anapioficeandfire.com/api"

    getResource = async (url) => {
        const response = await fetch(`${GOT_Service.API_URL}/${url}`);

        if(!response.ok) {
            throw new Error(`Couldn't fetch ${url}. Status: ${response.status}`);
        }

        return await response.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`characters?page=1&pageSize=10`);
        return res.map(this._transformCharacter);
    }

     getCharacter = async (id) => {
        const res = await this.getResource(`characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`books`);
        return res.map(this._transformBook);
    }

    getBook = async (id) =>  {
        const res = await this.getResource(`books/${id}`);
        return this._transformBook(res);
    }

     getAllHouses = async() => {
        const res = await this.getResource(`houses`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const res = await this.getResource(`houses/${id}`);
        return this._transformHouse(res);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
}