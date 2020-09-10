import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

export default function ArticlesList() {
  /* constructor(props) {
    super(props)
    this.state = {
      username: '',
      articles: [],
      lenguages: [],
      lenguage: '',
    }
  } */

  /* componentDidMount() {
    // get the lenguages before the render
    axios.get('http://localhost:5000/lenguages/')
    .then( res => {
      if( res.data.length > 0 ) {
        this.setState({
          lenguages: res.data.map( lenguages => lenguages.lenguage),
          lenguage: res.data[0].lenguage
        })
      }
    })

    // get the articles before the render
    const token = 'bearer ' + this.props.authToken;
    axios.get('http://localhost:5000/articles', {
      headers: {
        'Authorization': token
      }
    })
    .then( res => {
      this.setState({ articles: res.data })
    })
    .catch( error => this.props.history.push('/') )

    this.setState({
      username: this.props.username
    })
  } */

  /* articleList() {
    return this.state.articles.length 
    ? this.state.articles.map
      (currentarticle => {
      return <Link to={ '/details/' + currentarticle._id } key={ currentarticle._id }>
                <div 
                  className="card"
                  article={ currentarticle } 
                  deleteArticle={ this.deleteArticle } 
                  key={ currentarticle._id }
                  >{ currentarticle.title }
                </div>
              </Link>
        }
      )
    :<Link 
      to={ '/create' } 
      className=""
    >Add a new one</Link>
  } */
  
    /* const main = authToken !== null ?
    <div>
      <h3 className="">Articles</h3>
      {
        this.state.articles.length ? 
          <div className="">{ this.articleList() }</div> 
          : 
          <div></div>
      }
    </div>
    :
    '' */

  const [articles, setArticles] = useState([])
  const authToken = useSelector( store => store.main.authToken)
  
  useEffect( () => {
    const token = 'bearer ' + authToken;  
    axios.get('http://localhost:5000/articles', {
      headers: {
        'Authorization': token
      }
    })
    .then( res => {
      setArticles(res.data)
    })
    .catch( error => console.log(error) )
    //.catch( error => this.props.history.push('/') )
  }, [authToken])

  console.log('articles', articles)

  const taggedArticles = articles.length ? 
  articles.map
    (currentarticle => {
      return (
        <Link to={ '/details/' + currentarticle._id } key={ currentarticle._id }>
          <div 
            className="card"
            article={ currentarticle } 
            key={ currentarticle._id }
            >{ currentarticle.title }
          </div>
        </Link>)
    })
    : 
  <Link to={'/create'} class="btn">Add an Article</Link>

  const moveContentValue = useSelector( store => store.main.moveContentValue)
  const margin = moveContentValue ?
  "60px" :  "250px" 

  return (
    <div className="wrapper content" style={{ marginLeft: margin }}>
      <h2>Articles</h2> 
      {taggedArticles}
    </div>
  )
}