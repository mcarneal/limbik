import React, { Component } from 'react'

class Home extends Component {

    componentDidMount(){
        fetch("http://localhost:3000/api/v1/posts")
            .then(res => res.json())
            .then(console.log)
    }

    render(){

        return(
            <div>
                Home
        </div>
        )
    }
}

export default Home
