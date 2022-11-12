class SwapiService {
  // _apiBase = "https://api.themoviedb.org/3/search/movie";
  _apiKey = "544f8f911707c9ed5070d258fb62dbb5";
  _apiBase = new URL("https://api.themoviedb.org/");
  _apiSessionTokenURL =
    "https://api.themoviedb.org/3/authentication/guest_session/new";
  guest_session_id = localStorage.getItem("guest_id");

  getResource = async (obj) => {
    const movies = new URL("3/search/movie", this._apiBase);
    const res = await fetch(
      `${movies.href}?api_key=${this._apiKey}&language=${obj.language}&page=${obj.page}&query=${obj.query}`,
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
    const guestSession = new URL(
      "3/authentication/guest_session/new",
      this._apiBase,
    );
    if (!localStorage.getItem("guest_id")) {
      const res = await fetch(`${guestSession}?api_key=${this._apiKey}`);
      let json = await res.json();
      localStorage.setItem("guest_id", json.guest_session_id);
    }
  }

  async rateMovie(value, id) {
    const rate = new URL("3/movie", this._apiBase);
    const res = await fetch(
      `${rate}/${id}/rating?api_key=${this._apiKey}&guest_session_id=${this.guest_session_id}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          value: value,
        }),
      },
    );
    if (!res.ok) {
      throw new Error(`can't set rate to ${id} with ${value} rate`);
    }
  }

  async getRatedMovies(page = 1) {
    const ratedMovies = new URL("3", this._apiBase);
    const res = await fetch(
      `${ratedMovies}/guest_session/${this.guest_session_id}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
    );
    if (!res.ok) {
      throw new Error("can't get rated list");
    }
    let json = await res.json();
    return json;
  }

  async getGenreList() {
    const genre = new URL("3/genre/movie/", this._apiBase);
    const res = await fetch(
      `${genre}list?api_key=${this._apiKey}&language=en-US`,
    );
    if (!res.ok) {
      throw new Error("genres are not found");
    }
    let json = await res.json();
    return json;
  }
}

export default SwapiService;
