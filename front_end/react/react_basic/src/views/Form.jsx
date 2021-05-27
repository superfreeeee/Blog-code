import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      lazy: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleLazyChange = this.handleLazyChange.bind(this)
    this.file = React.createRef()
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(e) {
    console.log('handleNameChange', e, e.target.value)
    this.setState({ name: e.target.value })
  }

  handlePasswordChange(e) {
    console.log('handlePasswordChange', e, e.target.value)
    this.setState({ password: e.target.value })
  }

  handleTextChange(e) {
    console.log('handleTextChange', e, e.target.value)
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  handleLazyChange(e) {
    console.log('handleLazyChange', e, e.target.value)
    this.setState({ lazy: e.target.value })
  }

  handleFileChange(e) {
    console.log('handleFileChange', e)
    const fileInput = this.file.current
    const file = fileInput.files[0]
    console.log(fileInput, file)
    console.log(`file: ${file.name}`)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('handleSubmit')
    console.log('form:', this.state)
  }

  render() {
    const {
      handleNameChange,
      handlePasswordChange,
      handleTextChange,
      handleLazyChange,
      handleSubmit,
      handleFileChange,
      file,
      state: { name, password, lazy },
    } = this
    return (
      <>
        <h2>6. 表单</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              名称:{' '}
              <input name="name" value={name} onChange={handleTextChange} />
            </label>
            <br />
            <label>
              密码:{' '}
              <input
                name="password"
                value={password}
                onChange={handleTextChange}
              />
            </label>
            <br />

            <label>
              懒惰程度:{' '}
              <select value={lazy} onChange={handleLazyChange}>
                <option value="lazy">懒</option>
                <option value="aBitLazy">极懒</option>
                <option value="superLazy">超级懒</option>
              </select>
            </label>
            <br />

            <label>
              上传文件:{' '}
              <input type="file" ref={file} onChange={handleFileChange} />
            </label>
            <br />

            <button type="submit">提交表单</button>
          </form>
        </div>
      </>
    )
  }
}

export default Form
