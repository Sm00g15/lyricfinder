import React, { Component, Fragment } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

class Lyrics extends Component {
  state = {
    lyrics: {},
    track: {}
  };
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ lyrics: res.data.message.body.lyrics });
      })
      .catch(err => console.log(err));
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }
  render() {
    if (
      this.state.track === undefined ||
      this.state.lyrics === undefined ||
      Object.keys(this.state.track).length === 0 ||
      Object.keys(this.state.lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <div>
              <h4 className="card-header">
                <strong>{this.state.track.artist_name} - </strong>
                {this.state.track.track_name}
              </h4>
            </div>
            <p className="card-body">{this.state.lyrics.lyrics_body}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>GENRE: </strong>
                {this.state.track.primary_genres.music_genre_list[0]
                  ? this.state.track.primary_genres.music_genre_list[0]
                      .music_genre.music_genre_name
                  : "Not Available"}
              </li>
              <li class="list-group-item">
                {" "}
                <strong>EXPLICIT WORDS: </strong>
                {this.state.track.explicit === 0 ? "No" : "Yes"}
              </li>
              <li class="list-group-item">
                {" "}
                <strong>RELEASE DATE: </strong>
                {Date(this.state.track.first_release_date)}
              </li>
            </ul>
          </div>
        </Fragment>
      );
    }
  }
}

export default Lyrics;
