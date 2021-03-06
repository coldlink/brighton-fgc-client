import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const styles = theme => ({
  home: {
    flex: 1,
    textDecoration: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appBar: {
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }
})

class Header extends Component {
  render () {
    return (
      <AppBar position='static' color='primary' className={this.props.classes.appBar}>
        <Toolbar>
          <IconButton
            className={this.props.classes.menuButton}
            aria-label='Menu'
            onClick={this.props.drawClick}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' className={this.props.classes.home}>
            <Typography variant='h6' color='default'>
              Habrewken - Brighton FGC
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  drawClick: PropTypes.func.isRequired
}

export default withStyles(styles)(Header)
