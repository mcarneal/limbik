import React, { Component } from 'react'
import Table from '../table/index.js'

class Home extends Component {


    state = {
        index : [],
        start : 0,
        end : 50,
        clickSortAssending : false
    }


    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/posts`)
            .then(res => res.json())
            .then(data => {
                this.setState({index : data})
            } )
    }

    render(){
        return(
            <div className='home'>
                <Table data={this.state.index} /> 

        </div>
        )
    }
}

export default Home
