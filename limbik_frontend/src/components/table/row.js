import React, { Component } from 'react'


class Row extends Component{


    postStringShortener = (string) => {
        if(string && string.length > 50){
            return string.slice(0,47).concat('...')
        }
        else if(string && string.length < 50){
            return string
        }
        else 
            return 'no description'
    }


    render(){

        

        return(
            <tbody id={`${this.props.id}`}>
            <td><button 
                className='ui green button'  
                >Add to compare</button></td>
        <td><button
                className='ui blue button'
                >More Info
            </button></td>
                <td>{this.props.id}</td>
                <td style={{textAlign : 'left'}}><a href={this.props.url} target="_blank">{this.props.url}</a></td>
                <td style={{textAlign : 'left'}}>{this.postStringShortener(this.props.text)}</td>
                <td style={{textAlign : 'left'}}>{this.props.clicks}</td>
                <td style={{textAlign : 'left'}}>{this.props.impressions}</td>
                <td style={{textAlign : 'left'}}>{`${this.props.spend.amount ? this.props.spend.amount : 0} ${this.props.spend.currency ? this.props.spend.currency : ''}`}</td>
                </tbody>


        )
    }
}


export default Row
