class Authorization {
  _apiKey = "544f8f911707c9ed5070d258fb62dbb5";
  _apiBase = new URL("https://api.themoviedb.org/");

  _guestSessionKey = localStorage.getItem("guest_id") || this.getSessionToken();

  async getSessionToken() {
    const guestSession = new URL(
      "3/authentication/guest_session/new?",
      this._apiBase,
    );
    const params = new URLSearchParams({
      api_key: this._apiKey,
    });
    if (!localStorage.getItem("guest_id")) {
      const res = await fetch(`${guestSession + params.toString()}`);
      let json = await res.json();
      localStorage.setItem("guest_id", json.guest_session_id);
      return json.guest_session_id;
    }
  }
}

export default Authorization;
