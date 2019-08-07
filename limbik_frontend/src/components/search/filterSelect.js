import React ,{ Component } from 'react'
import { Select } from 'semantic-ui-react'

const types = []
let subTypes = []

const allTypes = {}

class FilterSelect extends Component{

    state = {
        targetFilter : ''
    }

    collectTargetTypes = () => {
        if(this.props.data){
            this.props.data.map((post)=> {
                console.log(Object.entries(post.targeting))
                Object.entries(post.targeting).map((item)=>{
                    if(item[1]){
                        Object.entries(item[1]).map((value)=>{
                            value.map((a)=>{
                                if(allTypes[`${item[0]}`]){
                                    if(!allTypes[`${item[0]}`].includes(a)){
                                        allTypes[`${item[0]}`].push(a)
                                    }
                                }
                                else{
                                    allTypes[`${item[0]}`]=[]
                                }
                            }) 
                        })
                    }
                })  
            })
        }
        console.log(allTypes)
    }

    assignKeys = () => {
        this.collectTargetTypes()
        if (types.length <= 0){
            let keyNumber = 1
            Object.keys(allTypes).map((attribute)=>{
                types.push({key :`${keyNumber}_${attribute}`, text: attribute.replace(/_/g,' '), value : attribute})
                keyNumber+=1
            })
        }
    }

    subTypesCollect = () => {
        subTypes = []
        if(Object.keys(allTypes).includes(this.state.targetFilter)){
            subTypes.push(allTypes[`${this.state.targetFilter}`])
        }
    }

    subTypesAssign = () => {
        let arr = []
        this.subTypesCollect()
        let cleanArray = subTypes[0].filter(post => typeof(post)=== 'string')
        cleanArray.forEach((sub)=>{
                arr.push({key : sub, text : sub, value : sub})
        })
        return arr
    }

    onChangeHandle = (e) =>{
        this.setState({
            targetFilter : e.target.innerText.replace(/ /g, '_')
        })
    }

    render(){
        this.assignKeys()
        return(
            <div>
                <Select options={types} defaultValue='articles' onChange={(e)=> this.onChangeHandle(e)}/>
                    {this.state.targetFilter ? <Select options={this.subTypesAssign()} defaultValue='articles' onChange={(e)=>this.props.filterChangeHandler(e, this.state.targetFilter)} /> : null }
    </div>
        )
    }
}

export default FilterSelect

