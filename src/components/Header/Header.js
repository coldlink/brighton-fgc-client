import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, AppBar, Toolbar, IconButton } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import MenuIcon from 'material-ui-icons/Menu'
import { Link } from 'react-router-dom'

const styles = theme => ({
  home: {
    flex: 1,
    textDecoration: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Header extends Component {
  render () {
    return (
      <AppBar position='static' color='primary'>
        <Toolbar>
          <IconButton className={this.props.classes.menuButton} color='contrast' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Link to='/' className={this.props.classes.home}>
            <Typography type='title' color='default'>
              Habrewken
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
