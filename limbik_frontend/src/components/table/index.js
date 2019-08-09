import React, { Component } from 'react'
import Modal from '../modal/index.js'


let rows = []

class PostTable extends Component {


    state = {
        loaded : false,
        initialOrder : [],
        direction : '',
        data : [],
        singlePost : null,
        open : false 
    }

    sortImpressionsHandler = (e) => {
    
        console.log('yeah')

        let data = this.props.data
      
        if(e.target.id === 'Assc'){
            rows = data.sort((a,b)=>{
                return a.impressions-b.impressions
                })
            e.target.id = 'Desc'
            this.setState({ 
                direction : 'Assc',
            })
        }
        else if(e.target.id === 'Desc'){
            rows = data.sort((a,b)=>{
                return b.impressions-a.impressions
            })
            e.target.id = 'Assc'
            this.setState({ direction : 'Desc' })
            }
        else{
            return null
        }
    }

    sortClickHandler = (e) => {

        let data = this.props.data
      
        if(e.target.id === 'Assc'){
            rows = data.sort((a,b)=>{
                return a.clicks-b.clicks
                })
            e.target.id = 'Desc'
            this.setState({ 
                direction : 'Assc',
            })
        }
        else if(e.target.id === 'Desc'){
            rows = data.sort((a,b)=>{
                return b.clicks-a.clicks
            })
            e.target.id = 'Assc'
            this.setState({ direction : 'Desc' })
            }
        else{
            return null
        }
    }

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

    moreInfoClickHandeler = (e) => {
        this.handleClickOpen()
        let postId = e.target.parentNode.parentNode.id
        let post = this.props.data.filter((post => post.id === parseInt(postId)))
        this.setState({
            singlePost : post
        })
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


    getTableRows = () => {
        const table =  rows.map(post =>
            <tbody id={`${post.id}`}>
            <td><button 
                className='ui green button'  
                onClick={(e)=> this.props.compareDataHandeler(e.target.parentNode.parentNode.id)}>Add to compare</button></td>
        <td><button
                onClick={this.moreInfoClickHandeler}
                className='ui blue button'
                >More Info
            </button></td>
                <td>{post.id}</td>
                <td style={{textAlign : 'left'}}><a href={post.url} target="_blank">{post.url}</a></td>
                <td style={{textAlign : 'left'}}>{this.postStringShortener(post.text)}</td>
                <td style={{textAlign : 'left'}}>{post.clicks}</td>
                <td style={{textAlign : 'left'}}>{post.impressions}</td>
                <td style={{textAlign : 'left'}}>{`${post.spend.amount ? post.spend.amount : 0} ${post.spend.currency ? post.spend.currency : ''}`}</td>
                </tbody>)

        return table
        }

    collectRows = () => {
        if(rows.length <= 0){
            this.props.data.map(post => rows.push(post))
        } else if( rows.length !== this.props.data.length){
            rows = []
            this.props.data.map(post => rows.push(post))
        }
    }


render() {
        this.collectRows()
        return(
            <div className='table'>
            <table style={{width : '80vw'}}>
                <tr>
                <th>Check</th>
                <th>Details</th>
                <th>Post ID</th>
                <th>URL</th>
                <th>Text</th>
                <th><button
                    className='ui grey button'
                    name='clicks'
                    id='Assc'
                    onClick={this.sortClickHandler}>Clicks</button></th>
            <th>
                <button
                    className='ui grey button'
                    name='impressions'
                    id='Assc'
                    onClick={this.sortImpressionsHandler}>
                        Impressions
                </button>
            </th>
                <th>Currency</th>
            </tr>
            {this.getTableRows()}
        </table>
        <Modal
            handleClose={this.handleClose}
            data={this.state.singlePost}
            open={this.state.open} />
</div>
    )
  }
}

export default PostTable
