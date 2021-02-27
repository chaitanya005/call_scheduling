import React , { Component } from 'react'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
const ReactQuill = typeof window === 'object' ? require('react-quill') :
 () => false;


class Quill extends Component {
    state = {
        text: '',
    }


    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <ReactQuill 
                value = {this.state.value}
                onChange = {this.handleChange}
                />
        )
    }
}

export default Quill