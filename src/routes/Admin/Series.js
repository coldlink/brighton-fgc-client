import React from 'react'
import PropTypes from 'prop-types'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SaveIcon from 'material-ui-icons/Save'
import AddCircleIcon from 'material-ui-icons/AddCircle'
import CloseIcon from 'material-ui-icons/Close'
import DeleteIcon from 'material-ui-icons/Delete'
import Snackbar from 'material-ui/Snackbar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Switch from 'material-ui/Switch'

import { SeriesService } from '../../_services'

class SeriesRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      series: props.series
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveSeries = this.saveSeries.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handlePointsChange = this.handlePointsChange.bind(this)
  }

  handleChange (event) {
    const { series } = this.state
    series[event.target.name] = event.target.value
    this.setState({ series })
  }

  handleSwitch (event, changed) {
    const { series } = this.state
    series.isCurrent = changed
    this.setState({ series })
  }

  handlePointsChange (event) {
    const { series } = this.state
    series.points = event.target.value.split(',').map(v => +v)
    this.setState({ series })
  }

  saveSeries () {
    const { token } = this.props
    const { series } = this.state

    SeriesService
      .update(token, series.id, series)
      .then(series => {
        this.setState({ series, saved: true })
      })
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      saved: false
    })
  }

  render () {
    const { series } = this.state
    const { deleteSeries } = this.props

    return (
      <TableRow>
        <TableCell>{series.id}</TableCell>
        <TableCell>
          <TextField
            id='name'
            name='name'
            value={series.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='_gameId'
            name='_gameId'
            value={series._gameId || ''}
            onChange={this.handleChange}
            placeholder='Short'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='points'
            name='points'
            value={series.points || []}
            onChange={this.handlePointsChange}
            placeholder='Image URL'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <Switch
            id='isCurrent'
            name='isCurrent'
            checked={series.isCurrent || false}
            onChange={this.handleSwitch}
            aria-label='switch'
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={this.saveSeries} aria-label='Save'>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => deleteSeries(series.id)} aria-label='Delete'>
            <DeleteIcon />
          </IconButton>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={this.state.saved}
            autoHideDuration={6000}
            onClose={this.closeSnackbar}
            SnackbarContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id='message-id'>Saved</span>}
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                onClick={this.closeSnackbar}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </TableCell>
      </TableRow>
    )
  }
}

class NewSeriesRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      series: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handlePointsChange = this.handlePointsChange.bind(this)
  }

  handleChange (event, checked) {
    const { series } = this.state
    series[event.target.name] = event.target.value || checked
    this.setState({ series })
  }

  handleSwitch (event, changed) {
    const { series } = this.state
    series.isCurrent = changed
    this.setState({ series })
  }

  handlePointsChange (event) {
    const { series } = this.state
    series.points = event.target.value.split(',').map(v => +v)
    this.setState({ series })
  }

  render () {
    const { series } = this.state
    const { addSeries } = this.props
    series.points = series.points || [16, 12, 10, 8, 6, 6, 4, 4, 2, 2, 2, 2, 1, 1, 1, 1]

    return (
      <TableRow>
        <TableCell />
        <TableCell>
          <TextField
            id='name'
            name='name'
            value={series.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='_gameId'
            name='_gameId'
            value={series._gameId || ''}
            onChange={this.handleChange}
            placeholder='Game Id'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='points'
            name='points'
            value={series.points}
            onChange={this.handlePointsChange}
            placeholder='Points Array'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <Switch
            id='isCurrent'
            name='isCurrent'
            checked={series.isCurrent || false}
            onChange={this.handleSwitch}
            aria-label='switch'
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={() => addSeries(series)} aria-label='Save'>
            <AddCircleIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

class AdminSeries extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      serieses: []
    }

    this.handleAddSeries = this.handleAddSeries.bind(this)
    this.handleDeleteSeries = this.handleDeleteSeries.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.performDeleteSeries = this.performDeleteSeries.bind(this)
    this.closeDeleted = this.closeDeleted.bind(this)
  }

  componentWillMount () {
    SeriesService
      .getAll()
      .then(serieses => this.setState({ serieses }))
      .catch(error => this.setState({ error }))
  }

  handleAddSeries (body) {
    const { token } = this.props
    console.log(body)
    SeriesService
      .create(token, body)
      .then(series => {
        const { serieses } = this.state
        serieses.unshift(series)
        this.setState({ serieses, added: true })
      })
      .catch(error => this.setState({ error }))
  }

  handleDeleteSeries (id) {
    this.setState({
      deleteStart: true,
      id
    })
  }

  performDeleteSeries () {
    const { token } = this.props
    const { id } = this.state

    this.closeSnackbar()

    if (!id) {
      return
    }

    SeriesService
      .delete(token, id)
      .then(() => {
        let { serieses } = this.state
        serieses = serieses.filter(o => o.id !== id)
        this.setState({ serieses, deleted: true })
      })
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      added: false,
      deleteStart: false
    })
  }

  closeDeleted () {
    this.setState({
      id: null,
      deleted: false
    })
  }

  render () {
    const { serieses } = this.state
    const { token } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Game</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Is Current?</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <NewSeriesRow addSeries={this.handleAddSeries} />
            {
              serieses && serieses.map(series => (
                <SeriesRow series={series} key={series.id} token={token} deleteSeries={this.handleDeleteSeries} />
              ))
            }
          </TableBody>
        </Table>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.added}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Added</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.deleteStart}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Confirm Delete</span>}
          action={[
            <IconButton
              key='delete'
              aria-label='Delete'
              color='inherit'
              onClick={this.performDeleteSeries}
            >
              <DeleteIcon />
            </IconButton>,
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.deleted}
          autoHideDuration={6000}
          onClose={this.closeDeleted}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Deleted</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.closeDeleted}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

AdminSeries.propTypes = {
  token: PropTypes.string.isRequired
}

SeriesRow.propTypes = {
  series: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  deleteSeries: PropTypes.func.isRequired
}

NewSeriesRow.propTypes = {
  addSeries: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  const { user } = auth
  const token = get(user, 'token')

  return {
    token
  }
}

export default withRouter(connect(mapStateToProps)(AdminSeries))