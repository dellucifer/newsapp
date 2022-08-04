import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, desc, imageUrl, newsUrl, author, date} = this.props;
    return (
      <div>
        <div className="card my-2">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {desc}...
            </p>
            <p class="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
