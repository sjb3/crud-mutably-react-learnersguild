import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class EditableRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editable: false,
      title: this.props.title,
      author: this.props.author
    }

    // this.toggleEditable = this.toggleEditable.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleSaveClick() {
    const { bookId, handleSave, imageURL } = this.props
    const { title, author } = this.state

    this.setState({ editable: false })
    handleSave({
      _id: bookId,
      title,
      author,
      image: imageURL
    })
  }

  handleEditClick() {
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
    const { imageURL, handleDelete } = this.props
    const { editable, title, author } = this.state


    return (
      <div>
        { editable ? (
          <div>
            <button className='btn btn-primary' onClick={this.handleSaveClick}>Save</button>
            <input name='title' placeholder='title: ' value={title} className='form-control' onChange={this.handleInput} />
            <input name='author' placeholder='author: '  value={author} className='form-control' onChange={this.handleInput} />
          </div>
        ) : (
          <div>
            <button className='btn btn-success' onClick={this.handleEditClick}>Edit</button>
            <span>{title}&nbsp; {author}</span>
            <img src={imageURL} style={{height: '50px', width: '50px'}} />
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
        )}
      </div>
      )
    }
}

EditableRow.propTypes = {
  bookId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired
}
