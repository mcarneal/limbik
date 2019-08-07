import React, { Component } from 'react'


class Compare extends Component{


    displayData = () => {
        if(this.props.data){
            return this.props.data.map(post => <tr id={`${post.id}`}>
                <td><button className='ui red button'>Remove</button></td>
                <td>{post.id}</td>
                <td>{this.postStringShortener(post.text)}</td>
                <td>{post.clicks}</td>
                <td>{post.impressions}</td>
                <td>{`${post.spend.amount ? post.spend.amount : 0} ${post.spend.currency ? post.spend.currency : ''}`}</td>
                </tr>)
        }
    }

    postStringShortener = (string) => {
        if(string && string.length > 50){
            return string.slice(0,50).concat('...')
        }
        else if(string && string.length < 50){
            return string
        }
        else 
            return 'no description'
    }

    render(){


        return(
            <div>
                <div className='compare box'>
                    <table style={{width : '95vw'}}>
                        <tr>
                            <th>Remove</th>
                            <th>Post ID</th>
                            <th>Text</th>
                            <th>Clicks</th>
                            <th>Impressions</th>
                            <th>Currency</th>
                        </tr>
                        {this.displayData()}
                    </table>
                </div>
                <button id='analyze' className='ui button blue'>Analyze</button>
            </div>
        )
    }
}

export default Compare
