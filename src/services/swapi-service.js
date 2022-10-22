class SwapiService {
  _apiBase = "https://api.themoviedb.org/3/search/movie";
  _apiKey = "544f8f911707c9ed5070d258fb62dbb5";
  getResource = async () => {
    const res = await fetch(
      `${this._apiBase}?api_key=${this._apiKey}&language=en-US&page=1&query=return`
    );
    if (!res.ok) {
      throw new Error(`couldnt fetch, receive ${res.status}`);
    }
    return await res.json();
  };

  async getMovies() {
    const res = await this.getResource();
    return res.results;
  }
}

export default SwapiService;
