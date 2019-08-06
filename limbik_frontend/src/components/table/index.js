import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {


  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

    clickHandler = () => {
       this.props.clickSortHandler()
        this.setState({
            clicked : !this.state.clicked
        })
    }


  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
        <TableCell
        onClick={this.clickHanlder}
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <button>{label}</button>
      </TableCell>
    );
  };

    render() {
        console.log('inside wierd table', this.props)
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
                  {columns.map(({ dataKey, ...other }, index) => {
              return (
                  <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);



const createData = (id, postid, clicks, impressions, currency, text, button) => {
  return { id, postid, clicks, impressions, currency, text, button };
}

const textShortener = (text) => {
    if (text && text.length > 20){
        return text.slice(0,20).concat('...')
    }
    else if (text && text.length < 20){
        return text
    }
    else {
        return 'no text provided'
    }
}

const rows = [];


class ReactVirtualizedTable extends Component {


    state = {
        clicked : false 
    }


    clickHandler = () => {
       this.props.clickSortHandler()
        this.setState({
            clicked : !this.state.clicked
        })
    }

    componentDidUpdate(prevProps){
            console.log('updating comp', prevProps, this.props)
    }

    render(){

        console.log('reacttable', this.state)

    for (let i = 0; i < this.props.data.length ; i += 1) {
        rows.push(createData(this.props.data[i].id, this.props.data[i].id, this.props.data[i].clicks, this.props.data[i].impressions, `${this.props.data[i].spend.amount} ${this.props.data[i].spend.currency}`, textShortener(this.props.data[i].text) , <button>View More</button>));
    }
  return (
    <Paper style={{ height: 600, width: '100%' }}>
        <VirtualizedTable
        clickSortHandler={this.clickHandler}
        data={this.props.data}
        rowCount={rows.length}
        rowGetter={({ clicks }) => rows[clicks]}
        columns={[
            {
            width: 120,
            label: 'Post ID:',
            dataKey: 'postid',
          },
          {
            width: 120,
            label: 'Clicks',
            dataKey: 'clicks',
            numeric: true,
          },
          {
            width: 120,
            label: 'Impressions',
            dataKey: 'impressions',
            numeric: true,
          },
          {
            width: 120,
            label: 'Currency',
            dataKey: 'currency',
          },
          {
            width: 240,
            label: 'Text',
            dataKey: 'text',
            numeric: true,
          },
          {
            width: 120,
            dataKey: 'button',
          },
        ]}
      />
    </Paper>
  );
}
}
export default ReactVirtualizedTable   
