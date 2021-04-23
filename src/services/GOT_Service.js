export default class GOT_Service {
    static API_URL = "https://www.anapioficeandfire.com/api"

    async getResource(url) {
        const response = await fetch(`${GOT_Service.API_URL}/${url}`);

        if(!response.ok) {
            throw new Error(`Couldn't fetch ${url}. Status: ${response.status}`);
        }

        return await response.json();
    }

    async getAllCharacters() {
        const res = await this.getResource(`characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const res = await this.getResource(`characters/${id}`);
        return this._transformCharacter(res);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}