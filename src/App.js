import React, { Component } from 'react'

class EditableRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      editable: false,
    }
    this.makeEditable = this.makeEditable.bind(this)
  }

  makeEditable() {
    this.state({editable: true})
  }

  render(){
    const {title, author, imageURL} = this.state;
    const { editable } = this.state;

    return(
      <div>
        {editable? (
          <div>
            <button className='btn btn-promary'>Save</button>
            <input value={title} className='form-control' />
            <input value={author} className='form-control' />
          </div>
        ):(
          <div>
            <button className='btn btn-success' onClick={this.makeEditable}>Edit</button>
            <span>{title}&nbsp; {author}</span>
            <img src={imageURL} style={{height: '50px', width: '50px'}} />
        </div>
        )}
      </div>
      )
    }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })

    fetch('http://mutably.herokuapp.com/books')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          books: data.books,
          loading: false,
        })
      })
      .catch((err) => {
        console.error('error', err)
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const { books, loading } = this.state

    return (
      <div>
        <h1>Hello</h1>
        <div className="col-sm-8 col-sm-offset-2">
          <nav className="navbar navbar-default">
            <a className="navbar-brand" href="/">Mutably?</a>
          </nav>

          <div className="panel panel-default">
            <div className="panel-heading" />Books/Author
          </div>
          {(loading) ? <div>loading...</div> : ''}

          <ul className="list-group" />
          {
              books.map(book => (
                <li className='list-group-item'>
                  <EditableRow title={book.title} author={book.author} imageURL={book.image}/>
                </li>
              ))
            }

        </div>
      </div>
    )
  }
}

export default App
