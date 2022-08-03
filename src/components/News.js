import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

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
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=5687cea9ba474e18aafc836e79ed64bc&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
      let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData)
    this.setState({ articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false });
    // console.log(this.state.articles)
  }

  handlePrevClick = async () => {
    // console.log("previous");

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5687cea9ba474e18aafc836e79ed64bc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    });
  };

  handleNextClick = async () => {
    // console.log("next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5687cea9ba474e18aafc836e79ed64bc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false
      });
    }
  };

  render() {
    return (
      <>
        <h1 className="container mt-4 text-center">Del's Daily News Dose</h1>
        <div className="container my-5">
          {this.state.loading && <Spinner/>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
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
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)}
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
