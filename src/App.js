import React, { Component } from 'react'
import EditableRow from './EditableRow'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      loading: true,
    }

    this.updateRow = this.updateRow.bind(this)
  }

  componentDidMount() {
    this.fetchAllElements()
  }

  fetchAllElements() {
    return fetch('http://mutably.herokuapp.com/books')
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

  updateRow(book) {
    const { _id, title, author, image } = book

    return fetch(`http://mutably.herokuapp.com/books/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        author: author,
        image: image,
      }),
      header: { 'Content-Type': 'application/json' },

    }).then(console.log)
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
                    handleSave={this.updateRow}
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
