class SwapiService {
  _apiKey = "544f8f911707c9ed5070d258fb62dbb5";
  _apiBase = new URL("https://api.themoviedb.org/");
  _apiSessionTokenURL =
    "https://api.themoviedb.org/3/authentication/guest_session/new";
  auth = new Authorization(this._apiKey, this._apiBase);
  guest_session_id =
    localStorage.getItem("guest_id") || this.auth.getSessionToken();

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
    const rate = new URL(`3/movie/${id}/rating?`, this._apiBase);
    const params = new URLSearchParams({
      api_key: this._apiKey,
      guest_session_id: this.guest_session_id,
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

  async getRatedMovies(page = 1) {
    const ratedMovies = new URL(
      `3/guest_session/${this.guest_session_id}/rated/movies?`,
      this._apiBase,
    );
    const params = new URLSearchParams({
      api_key: this._apiKey,
      language: "en-US",
      page: page,
      sort_by: "created_at.asc",
    });
    const res = await fetch(`${ratedMovies + params.toString()}`);
    if (!res.ok) {
      throw new Error("can't get rated list");
    }
    let json = await res.json();
    console.log(json);
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

class Authorization {
  constructor(key, baseUrl) {
    this.apiKey = key;
    this.apiBase = baseUrl;
  }

  async getSessionToken() {
    const guestSession = new URL(
      "3/authentication/guest_session/new?",
      this.apiBase,
    );
    const params = new URLSearchParams({
      api_key: this._apiKey,
    });
    if (!localStorage.getItem("guest_id")) {
      const res = await fetch(`${guestSession + params.toString()}`);
      let json = await res.json();
      localStorage.setItem("guest_id", json.guest_session_id);
    }
  }
}

export default SwapiService;
