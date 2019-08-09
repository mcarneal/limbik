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

    render(){


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
                <Grid xs={12} sm={6} md={4}
                >
                    <br></br>
                    {this.renderPost()}
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <br></br>
                    <h2 style={{textDecoration : 'underline'}}>Post Text</h2>
                </Grid>
            </Grid>
      </Dialog>
  </div>
  );
 }
}

export default FullScreenDialog

