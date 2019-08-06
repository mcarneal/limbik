import _ from 'lodash'
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

const tableData = []



class PostTable extends Component {

  state = {
    column: null,
    data: tableData,
    direction: null,
  }

    postStringShortener = (string) => {
        if (string && string.length > 50){
            return string.slice(0, 50).concat('...')
        } else if (string && string.length < 50) {
            return string
        } else {
            return 'no description'
        }
    }
    

    getTableData = () => {
        this.props.data.forEach((post)=>{
            tableData.push({postid: post.id , text: this.postStringShortener(post.text), clicks: post.clicks, impressions: post.impressions, currency : `${post.spend.amount > 0 ? post.spend.amount : ''}  ${post.spend.currency ? post.spend.currency : 'None'}`})
        })
    }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

    render() {
        this.getTableData()
      const { column, data, direction } = this.state
        return (
            <div className='table'>
      <Table sortable celled fixed>
        <Table.Header className='table-head'>
          <Table.Row>
              <Table.HeaderCell
              sorted={column === 'postid' ? direction : null}
              onClick={this.handleSort('postid')}
            >
              Post ID
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'text' ? direction : null}
              onClick={this.handleSort('text')}
            >
              Text
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'clicks' ? direction : null}
              onClick={this.handleSort('clicks')}
            >
              Clicks
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'impressions' ? direction : null}
              onClick={this.handleSort('impressions')}
            >
              Impressions
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'currency' ? direction : null}
              onClick={this.handleSort('currency')}
            >
              Currency
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className='table-body'>
          {_.map(data, ({ postid, text, clicks, impressions, currency }) => (
            <Table.Row key={postid}>
              <Table.Cell>{postid}</Table.Cell>
              <Table.Cell>{text}</Table.Cell>
              <Table.Cell>{clicks}</Table.Cell>
              <Table.Cell>{impressions}</Table.Cell>
              <Table.Cell>{currency}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
    </Table>
    </div>
    )
  }
}

export default PostTable
