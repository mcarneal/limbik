import React, { Component } from 'react'


let rows = []

class PostTable extends Component {


    state = {
        initialOrder : [],
        direction : '',
        data : []
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
            return string.slice(0,50).concat('...')
        }
        else if(string && string.length < 50){
            return string
        }
        else 
            return 'no description'
    }

    getTableRows = () => {
            return rows.map(post => <tr>
                <td>{post.id}</td>
                <td>{this.postStringShortener(post.text)}</td>
                <td>{post.clicks}</td>
                <td>{post.impressions}</td>
                <td>{`${post.spend.amount ? post.spend.amount : 0} ${post.spend.currency ? post.spend.currency : ''}`}</td>
                </tr>)

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
            <table style={{width : '95vw'}}>
                <tr>
                <th>Post ID</th>
                <th>Text</th>
                <th><button
                    name='clicks'
                    id='Assc'
                    onClick={this.sortClickHandler}>Clicks</button></th>
            <th>
                <button
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
</div>
    )
  }
}

export default PostTable
