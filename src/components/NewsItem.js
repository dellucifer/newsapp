import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, desc, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card my-2" style={{width: "18rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {desc}...
            </p>
            <a href={newsUrl} className="btn btn-sm btn-primary" target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
