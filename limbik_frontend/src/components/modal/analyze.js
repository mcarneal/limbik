import React,{ Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Show from '../show/index'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends Component{



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
    renderPost = () =>{
        return this.props.data.map(post=> <Show data={[post]} />)
    }

    renderDuplicates = () => {
        if (this.props.duplicates.length > 0){
            return this.props.duplicates.map(value => <h4>{value}</h4>)
        }
    }

    render(){
    
        console.log('found my dups', this.props.duplicates)

  return (
    <div>
      <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={Transition}>
        <AppBar style={{position : 'relative'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
                    Analyzing Posts
            </Typography>
          </Toolbar>
      </AppBar>
            <Grid container
                justify='space-evenly'
            >
                <Grid xs={12} sm={6} md={4}>
                    <br></br>
                    <br></br>
                    <h2 align='center' style={{textAllign : 'center'}}>Selected Posts</h2>
      <div style={{ marginTop : '8vh',height : '75vh', overflowY : 'scroll'}}>
                        {this.renderPost()}
            </div>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <br></br>
                    <h2 style={{textDecoration : 'underline'}}>Two or More of these post have the following targeting values in common</h2>
                        {this.renderDuplicates()}
                </Grid>
            </Grid>
      </Dialog>
  </div>
  );
 }
}

export default FullScreenDialog

