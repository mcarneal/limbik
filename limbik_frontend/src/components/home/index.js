import React, { Component } from 'react'
import Table from '../table/index.js'
import Search from '../search/index.js'
import NewFilter from '../search/newFilter.js'
import Compare from '../compare/index.js'

class Home extends Component {


    state = {
        index : [],
        targetFilter : '',
        filteredData : [],
        compareData : []
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

    filterHandeler = (e, targetProp) => {
        let filteredData = []
        this.state.index.forEach((post)=>{
            if (post.targeting[`${targetProp}`]){
                Object.values(post.targeting[`${targetProp}`]).forEach((target)=>{
                    if(target === e.target.innerText || target.includes(e.target.innerText)){
                        filteredData.push(post)
                    }
                })
            }
        })
        console.log('filter', filteredData)
        this.setState({filteredData})
    }

    clearFilterHandeler = () => {
        this.setState({
            filteredData : ''
        })
    }

    compareDataHandeler = (id) => {
        let post = this.findPostById(id)
        if(this.state.compareData.includes(post[0])){
            let compareData = this.state.compareData.filter(postObj => postObj.id !== post[0].id )
            this.setState({compareData})
        }else {
            this.setState({
                compareData : [...this.state.compareData, post[0]]
            })
        }
    }

    findPostById = (id) =>{
        let post = this.state.index.filter(postObj => postObj.id === parseInt(id))
        return post
    }

    render(){
        return(
            <div className='home'>
                <Search
                    onChangeHandler={this.onChangeHandler}
                    searchInput={this.state.search} />

                <NewFilter data={this.state.index} filterHandeler={this.filterHandeler}  clearFilterHandeler={this.clearFilterHandeler}/>
                <Compare data={this.state.compareData} />
                <Table 
                    data={this.state.filteredData.length > 0 ? this.state.filteredData : this.state.index}
                    compareDataHandeler={this.compareDataHandeler}
                /> 

        </div>
        )
    }
}

export default Home
