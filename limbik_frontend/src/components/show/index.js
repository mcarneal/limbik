import React,{ Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';


class Show extends Component{


    findTargetingKeys = () =>{
        let targeting = []
        Object.keys(this.props.data[0].targeting).map(prop => targeting.push(prop))
        return targeting
    }

    assignTargetingValues = () => {
        const keys = this.findTargetingKeys()
        return keys.map(key => this.props.data[0].targeting[key] instanceof Array ? <div><h3>{key} : {this.props.data[0].targeting[key]}</h3></div> : console.log('no', key) )
    }



    findTwitterHash = () =>{ 
       return this.props.data[0].text.split(' ').map(word => word[0]==='#' ? <div><p>{word}</p></div> : null )
    } 

    render(){

        this.findTwitterHash()
        return(
            <div>
            <Grid container
                justify='space-evenly'
            >
                <Grid xs={12} sm={6} md={4}
                >
                    <br></br>
                    <h2 style={{textDecoration : 'underline'}}>Post Info</h2>            
                    <h4>Post ID:{this.props.data[0].id}</h4>
                    <h4>Number of clicks:{this.props.data[0].clicks}</h4>
                    <h4>Impressions:{this.props.data[0].impressions}</h4>
                    <h4>Currency:{this.props.data[0].spend.amount} {this.props.data[0].spend.currency}</h4>
                    <h4>Created:  {this.props.data[0].created}</h4>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <br></br>
                    <h2 style={{textDecoration : 'underline'}}>Post Text</h2>
                    <br></br>
                    <h4>{this.props.data[0].text}</h4>
                </Grid>
            </Grid>
            <Grid container
                justify='space-evenly'
            >
            <Grid xs={12} sm={6} md={4}>
                <br></br>
                <h2 style={{textDecoration : 'underline'}}>Targeting Properties:</h2>
                {this.assignTargetingValues()}
            </Grid>
            <Grid xs={12} sm={6} md={4}>
                <br></br>
                <h2 style={{textDecoration : 'underline'}}>Resources</h2>
                <a href={this.props.data[0].url}>{this.props.data[0].url}</a>
                <p>{this.props.data[0].pdf}</p>
                <h2 style={{textDecoration : 'underline'}}>Twitter Hash's</h2>
                    {this.findTwitterHash()}
            </Grid>
        </Grid>
            </div>
        )
    }
}

export default Show
