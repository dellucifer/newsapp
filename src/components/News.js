import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: []
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=5687cea9ba474e18aafc836e79ed64bc"
    let data = await fetch(url)
    let parsedData = await data.json()
    // console.log(parsedData)
    this.setState({articles: parsedData.articles})
    // console.log(this.state.articles)
  }

  render() {
    return (
      <>
      <h2 className="container mt-4">Del's Daily News Dose</h2>
      <div className="container my-5">
        <div className="row">
        {this.state.articles.map((element)=>{
          // console.log(element);
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} desc={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
          </div>
        })}
        </div>
      </div>
      </>
    );
  }
}

export default News;
