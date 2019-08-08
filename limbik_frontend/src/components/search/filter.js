import React, { Component } from 'react'
import { Select } from 'semantic-ui-react'


class NewFilter extends Component{

    state = {
        firstFilter : null
    }


    collectFilterKeys = () => {
        let keyArr = []
        this.props.data.forEach((attr)=>{
            Object.keys(attr.targeting).forEach((target)=>{
                if(!keyArr.includes(target)){
                    keyArr.push(target)
                }
            })
        })
        return keyArr
    }

    assignKeysToSelect = () => {
        let keys = this.collectFilterKeys()
        let index = 1
        const options = []

        keys.forEach((item)=>{
            options.push({ key : `${item}-${index}`, text : item.replace(/_/g, ' '), value : item  })
            index += 1
        })
    return options
    }

    firstFilterChangeHandeler = (e) => {
        let firstFilter = e.target.innerText.replace(/ /g, '_')
        this.setState({firstFilter})

    }

    collectSubCategory = () => {
        let postObj = {}
        let filterArray
        this.props.data.map((post) => {
           filterArray = this.props.data.filter(post => post.targeting[`${this.state.firstFilter}`])
        })
        return filterArray
    }

    cleanSubCategory = () => {
        let subArray = this.collectSubCategory()
        let cleanArray = []
        if(this.state.firstFilter){
            subArray.forEach((post)=>{
                Object.values(post.targeting[`${this.state.firstFilter}`]).forEach((target)=>{
                    if(!cleanArray.includes(target) && typeof(target)!=='object'){
                        cleanArray.push(target)
                    }
                })
            })

        }
        return cleanArray
    }

    assignSubCategory = () => {
        const options = []
        let cleanArray = this.cleanSubCategory()
        let index = 1

        cleanArray.forEach((attribute) => {
            options.push({ key: `${attribute}-${index}`, text : attribute.replace(/_/g, ' '), value : attribute})
            index += 1
        })
        return options
    }

    clearFilterHandeler = () => {
        this.setState({
            firstFilter : null
        })
        this.props.clearFilterHandeler()
    }

    render(){
        return(
            <div>
                <Select options={this.assignKeysToSelect()} value={this.state.firstFilter} onChange={this.firstFilterChangeHandeler} />
                    { this.state.firstFilter ? <Select options={this.assignSubCategory()} onChange={(e)=> this.props.filterHandeler(e, this.state.firstFilter)} /> : null  } 
                    <br></br> 
                    <br></br> 
                    <button class='ui blue button' onClick={this.clearFilterHandeler}>Clear Filters</button>
            </div>
        )
    }
 }

  export default NewFilter



