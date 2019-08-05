import React, { Component } from 'react'

class Home extends Component {


    state = {
        index : [],
        start : 0,
        end : 50,
        clickSortAssending : false
    }


    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/posts`)
            .then(res => res.json())
            .then(data => {
                this.setState({index : data})
            } )
    }

    postStringShortener = (string) => {
        if (string){
            return string.slice(0,29).concat('...')
        } else {
            return 'no destriction'

        }
    }

    renderData = () => {
        if(this.state.index.length > 0){
            return this.state.index.slice(this.state.start, this.state.end).map(post => <p>post id: {post.id} , number of clicks :{post.clicks}, text : {this.postStringShortener(post.text)} , {post.targeting.location}</p>)
        }
    }

    nextButtonHandler = () => {
        this.setState({
            start : this.state.start += 50,
            end : this.state.end += 50
        })
    }

    backButtonHandler = () => {
        if (this.state.start > 0){
            this.setState({
                start : this.state.start -= 50,
                end : this.state.end -= 50
            })
        }
    }

    clickSortHandler = () => {
        if (this.state.clickSortAssending){
            let sortedArray = this.state.index.sort(function(a,b){
                return a.clicks-b.clicks
            })
            this.setState({
                index : sortedArray,
                clickSortAssending : !this.state.clickSortAssending,
                start : 0,
                end : 50
            })
        } else {
            let sortedArray = this.state.index.sort(function(a,b){
                return b.clicks-a.clicks
            })
            this.setState({
                index : sortedArray,
                clickSortAssending : !this.state.clickSortAssending,
                start : 0,
                end : 50
            })

        }
    }
    


    render(){
        return(
            <div>
                <h1>
                    Home
                </h1>
                <button onClick={this.backButtonHandler}>back</button>
                <button onClick={this.nextButtonHandler}>next</button>
                <button onClick={this.clickSortHandler}> sort up </button>
                <button> sort down </button>
                {this.renderData()}

        </div>
        )
    }
}

export default Home
