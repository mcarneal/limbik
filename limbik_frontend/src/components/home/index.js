import React, { Component } from 'react'

let page = 1

class Home extends Component {


    state = {
        index : []
    }


    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/posts/?_limit=10&_page=${page}`)
            .then(res => res.json())
            .then(data => {
                this.setState({index : data})
            } )
    }

    renderData = () => {
        if(this.state.index.length > 0){
            return this.state.index.map(post => <h1>{post.id}</h1>)
        }
    }

    nextButtonHandler = () => {
        page += 1
        fetch(`http://localhost:3000/api/v1/posts/?_limit=10&_page=${page}`)
            .then(res => res.json())
            .then(data => {
                this.setState({index : data})
            } )
    }

    backButtonHandler = () => {

        if (page > 0){
            page -= 1
        fetch(`http://localhost:3000/api/v1/posts/?_limit=10&_page=${page}`)
            .then(res => res.json())
            .then(data => {
                this.setState({index : data})
            } )
        }
    }


    render(){
        return(
            <div>
                <h1>
                    Home
                </h1>
                {this.renderData()}

                <button onClick={this.backButtonHandler}>Back</button>
                <button onClick={this.nextButtonHandler}> Next </button>
        </div>
        )
    }
}

export default Home
