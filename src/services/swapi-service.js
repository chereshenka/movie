class SwapiService {
  _apiBase = "https://api.themoviedb.org/3/search/movie";
  _apiKey = "544f8f911707c9ed5070d258fb62dbb5";
  getResource = async (query) => {
    const res = await fetch(
      `${this._apiBase}?api_key=${this._apiKey}&language=en-US&page=1&query=${query}`
    );
    if (!res.ok) {
      throw new Error(`couldnt fetch, receive ${res.status}`);
    }
    return await res.json();
  };

  async getMovies(text) {
    const res = await this.getResource(text);
    return res.results;
  }
}

export default SwapiService;
