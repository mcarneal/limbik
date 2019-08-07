import React, { Component } from 'react'
import Table from '../table/index.js'
import Search from '../search/index.js'
import FilterSelect from '../search/filterSelect.js'


class Home extends Component {


    state = {
        index : [],
        targetFilter : '',
        filteredData : []
    }


    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/posts`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    index : data
                })
            } )
    }

    onChangeHandler = (e) => {
        let searchWord = ''
        searchWord += e.target.value
        let filteredData = this.state.index.filter(post => post.id.toString().includes(searchWord))
        
        this.setState({filteredData : filteredData})
    }

    filterChangeHandler = (e, targetProp) => {
        let filteredData = []
        this.state.index.forEach((post)=>{
            Object.values(post.targeting).forEach((target)=>{
                if(target instanceof Array)
                    target.forEach((value)=>{
                        if(value===e.target.innerText){
                            filteredData.push(post)
                        }
                    })
            }) 
            
        })
        this.setState({filteredData : filteredData})
    }

    render(){
        return(
            <div className='home'>
                <Search
                    onChangeHandler={this.onChangeHandler}
                    searchInput={this.state.search} />
                <FilterSelect data={this.state.index} filterChangeHandler={this.filterChangeHandler}/>
               
                <Table data={this.state.filteredData.length > 0 ? this.state.filteredData : this.state.index} /> 

        </div>
        )
    }
}

export default Home
