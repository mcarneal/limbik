import React, { Component } from 'react'
import Modal from '../modal/analyze.js'

class Compare extends Component{

    state = {
        open : false
    }


    displayData = () => {
        if(this.props.data){
            return this.props.data.map(post => <tr id={`${post.id}`}>
                <td><button
                    onClick={this.removeDataEntry}
                    className='ui red button'>Remove</button></td>
                <td>{post.id}</td>
                <td>{this.postStringShortener(post.text)}</td>
                <td>{post.clicks}</td>
                <td>{post.impressions}</td>
                <td>{`${post.spend.amount ? post.spend.amount : 0} ${post.spend.currency ? post.spend.currency : ''}`}</td>
                </tr>)
        }
    }

    removeDataEntry = (e) => {
        let id = e.target.parentNode.parentNode.id
        this.props.removeData(id)
    }


    createTable = () => {
        return(
                <div>
                    <table style={{width : '80vw'}}>
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
        )

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


    handleClickOpen = ()=> {
        this.setState({
            open : true
        })
  }

    handleClose =()=> {
        this.setState({
            open : false
        })
  }

    collectTargetingProps = () => {
        let dupArr = []
        this.props.data.map((post)=>{
            Object.keys(post.targeting).map((key)=>{
                if(post.targeting[`${key}`] instanceof Array){
                    post.targeting[`${key}`].map((value)=>{
                        dupArr.push(value)
                    })
                } 
            })
        })
        return dupArr
    }


    findDuplicates = (data)=> {
        let result = [];
        data.forEach((element, index)=> {
            if (data.indexOf(element, index + 1) > -1) {
                if (result.indexOf(element) === -1) {
                    result.push(element);
                }
            }
        });
        return result;
    }


    renderDuplicates = () => {
        let valueArray = this.collectTargetingProps()
        let duplicates = this.findDuplicates(valueArray)
        return duplicates 
    }



    render(){

        let duplicates = this.renderDuplicates()

        return(
            <div>
            <div className='compare box'>
                    {this.props.data.length > 0 ? this.createTable() : <h3>Compare data sets currently empty</h3>}
            </div>
                {this.props.data.length > 0 ?  <button onClick={this.handleClickOpen} id='analyze' className='ui button blue'>Analyze</button> : null }
            <Modal
            duplicates={duplicates}
            handleClose={this.handleClose}
            data={this.props.data}
            open={this.state.open} />
        </div>
        )
    }
}

export default Compare
