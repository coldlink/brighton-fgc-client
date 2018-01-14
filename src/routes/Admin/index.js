import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from 'material-ui'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import { withStyles } from 'material-ui/styles'
import DateRangeIcon from 'material-ui-icons/DateRange'
import VideogameAssetIcon from 'material-ui-icons/VideogameAsset'
import PeopleIcon from 'material-ui-icons/People'
import StarsIcon from 'material-ui-icons/Stars'
import ViewListIcon from 'material-ui-icons/ViewList'

import AdminGame from './Game'
import AdminTournament from './Tournament'
import AdminPlayer from './Player'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  })
})

class Admin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, value) {
    this.setState({ value })
  }

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography type='display2' component='h1'>
          Admin
        </Typography>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label='Events' icon={<DateRangeIcon />} />
          <BottomNavigationAction label='Games' icon={<VideogameAssetIcon />} />
          <BottomNavigationAction label='Players' icon={<PeopleIcon />} />
          <BottomNavigationAction label='Series' icon={<ViewListIcon />} />
          <BottomNavigationAction label='Tournaments' icon={<StarsIcon />} />
        </BottomNavigation>
        {
          value === 0 && (
            <Typography type='headline' component='h3'>
              Events
            </Typography>
          )
        }
        {
          value === 1 && (
            <div>
              <Typography type='headline' component='h3'>
                Games
              </Typography>
              <AdminGame />
            </div>
          )
        }
        {
          value === 2 && (
            <div>
              <Typography type='headline' component='h3'>
                Players
              </Typography>
              <AdminPlayer />
            </div>
          )
        }
        {
          value === 3 && (
            <Typography type='headline' component='h3'>
              Series
            </Typography>
          )
        }
        {
          value === 4 && (
            <div>
              <Typography type='headline' component='h3'>
                Tournaments
              </Typography>
              <AdminTournament />
            </div>
          )
        }
      </Paper>
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Admin)
