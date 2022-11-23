import Authorization from "./authorization";

class SwapiService {
  _apiKey = "544f8f911707c9ed5070d258fb62dbb5";
  _apiBase = new URL("https://api.themoviedb.org/");

  auth = new Authorization();
  guest_key = localStorage.getItem("guest_id");

  getResource = async (obj) => {
    const movies = new URL("3/search/movie?", this._apiBase);
    const params = new URLSearchParams({
      api_key: this._apiKey,
      language: obj.language,
      page: obj.page,
      query: obj.query,
    });
    const res = await fetch(`${movies + params.toString()}`);
    if (!res.ok) {
      throw new Error(`couldnt fetch, receive ${res.status}`);
    }
    return await res.json();
  };

  async getMovies(request) {
    const res = await this.getResource(request);
    return res;
  }

  async rateMovie(value, id) {
    if (!this.guest_key) {
      this.guest_key = await this.auth.getSessionToken();
    }
    const rate = new URL(`3/movie/${id}/rating?`, this._apiBase);
    const params = new URLSearchParams({
      api_key: this._apiKey,
      guest_session_id: this.guest_key,
    });
    const res = await fetch(`${rate + params.toString()}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        value: value,
      }),
    });
    if (!res.ok) {
      throw new Error(`can't set rate to ${id} with ${value} rate`);
    }
  }

  async getRatedMovies(page) {
    if (!this.guest_key) {
      this.guest_key = await this.auth.getSessionToken();
    }

    const ratedMovies = new URL(
      `3/guest_session/${this.guest_key}/rated/movies?`,
      this._apiBase,
    );
    const params = new URLSearchParams({
      api_key: this._apiKey,
      language: "en-US",
      page: page || 1,
      sort_by: "created_at.asc",
    });
    const res = await fetch(`${ratedMovies + params.toString()}`);
    if (!res.ok) {
      throw new Error("can't get rated list", res);
    }
    let json = await res.json();
    return json;
  }

  async getGenreList() {
    const genre = new URL("3/genre/movie/list?", this._apiBase);
    const params = new URLSearchParams({
      api_key: this._apiKey,
      language: "en-US",
    });
    const res = await fetch(`${genre + params.toString()}`);
    if (!res.ok) {
      throw new Error("genres are not found");
    }
    let json = await res.json();
    return json;
  }
}

export default SwapiService;
