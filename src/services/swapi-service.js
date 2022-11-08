class SwapiService {
  _apiBase = "https://api.themoviedb.org/3/search/movie";
  _apiKey = "544f8f911707c9ed5070d258fb62dbb5";

  _apiSessionTokenURL =
    "https://api.themoviedb.org/3/authentication/guest_session/new";
  guest_session_id = "6e625b3f8592f87a8055c9b671f0aac9";

  getResource = async (obj) => {
    const res = await fetch(
      `${this._apiBase}?api_key=${this._apiKey}&language=${obj.language}&page=${obj.page}&query=${obj.query}`
    );
    if (!res.ok) {
      throw new Error(`couldnt fetch, receive ${res.status}`);
    }
    return await res.json();
  };

  async getMovies(request) {
    const res = await this.getResource(request);
    return res;
  }

  async getSessionToken() {
    const res = await fetch(
      `${this._apiSessionTokenURL}?api_key=${this._apiKey}`
    );
    let json = await res.json();
    return json.guest_session_id;
  }

  async rateMovie(value, id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${this.guest_session_id}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify({
          value: value
        })
      }
    );
    if (!res.ok) {
      throw new Error(`can't set rate to ${id} with ${value} rate`);
    }
  }

  async getRatedMovies() {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${this.guest_session_id}/rated/movies?api_key=${this._apiKey}&language=en-US&sort_by=created_at.asc`
    );
    if (!res.ok) {
      throw new Error("can't get rated list");
    }
    let json = await res.json();
    return json;
  }

  async getGenreList() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=en-US`
    );
    if (!res.ok) {
      throw new Error("genres are not found");
    }
    let json = await res.json();
    return json;
  }
}

export default SwapiService;
