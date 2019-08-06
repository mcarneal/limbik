import React ,{ Component } from 'react'
import { Icon, Input } from 'semantic-ui-react'

class Search extends Component{



    render(){
        return(
            <Input
                icon={<Icon onClick={this.searchHandler} name='search' inverted circular link />} 
                placeholder='Search...' 
                name='search'
                onChange={(e)=>this.props.onChangeHandler(e)}
            />
        )
    }
}

export default Search
