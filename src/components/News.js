import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=5687cea9ba474e18aafc836e79ed64bc&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData)
    this.setState({ articles: parsedData.articles,
        totalResults: parsedData.totalResults });
    // console.log(this.state.articles)
  }

  handlePrevClick = async () => {
    // console.log("previous");

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5687cea9ba474e18aafc836e79ed64bc&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };

  handleNextClick = async () => {
    // console.log("next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5687cea9ba474e18aafc836e79ed64bc&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
      });
    }
  };

  render() {
    return (
      <>
        <h2 className="container mt-4">Del's Daily News Dose</h2>
        <div className="container my-5">
          <div className="row">
            {this.state.articles.map((element) => {
              // console.log(element);
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    desc={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
