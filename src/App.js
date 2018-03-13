import React, { Component } from 'react'

class EditableRow extends Component {
  constructor(props){
    super(props)

    this.state = {
      editable: false,
      title: this.props.title,
      author: this.props.author
    }
    this.toggleEditable = this.toggleEditable.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  toggleEditable() {
    const { bookId } = this.props

    if(this.state.editable) {
      this.setState({ editable: false })
      fetch(`http://mutably.herokuapp.com/books/${bookId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          author: this.state.author,
          image: this.props.imageURL,
        }),
        header: { 'Content-Type': 'application/json' },

      }).then(console.log())
      return
    }
    this.setState({ editable: true })
  }

  handleInput(e) {
    const name = e.target.name
    console.log(name);

    // this.setState([prevState, props] => {}) // formal way
    this.setState({
      [name]: e.target.value, // this works as well, new way?
    })
  }

  render(){
    const { imageURL } = this.props
    const { editable, title, author } = this.state


    return (
      <div>
        { editable ? (
          <div>
            <button className='btn btn-primary' onClick={this.toggleEditable}>Save</button>
            <input name='title' placeholder='title: ' value={title} className='form-control' onChange={this.handleInput} />
            <input name='author' placeholder='author: '  value={author} className='form-control' onChange={this.handleInput} />
          </div>
        ) : (
          <div>
            <button className='btn btn-success' onClick={this.toggleEditable}>Edit</button>
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
                <li key={book._id} className='list-group-item'>
                  <EditableRow
                    title={book.title}
                    author={book.author}
                    imageURL={book.image}
                    bookId={book._id}
                  />
                </li>
              ))
            }

        </div>
      </div>
    )
  }
}

export default App
