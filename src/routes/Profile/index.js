import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import set from 'lodash/set'
import get from 'lodash/get'
import CloseIcon from '@material-ui/icons/Close'

import { userActions } from '../../_actions'
import { PlayerService } from '../../_services'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  }),
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  item: {
    textAlign: 'center'
  },
  bigAvatar: {
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 75,
    height: 75
  },
  link: {
    color: theme.palette.text.primary
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

class Profile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: {},
      updated: false,
      updatedError: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.savePlayer = this.savePlayer.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
  }

  handleCloseSnackbar (event, reason) {
    this.setState({
      updated: false,
      updatedError: false
    })
  }

  handleChange (event) {
    const { player } = this.state
    if (event.target.value) {
      set(player, event.target.name, event.target.value)
    } else if (event.target.name === 'handle') {
      delete player[event.target.name]
    } else {
      set(player, event.target.name, '')
    }
    this.setState({ player })
  }

  async savePlayer () {
    const { player } = this.state
    const { auth } = this.props
    const { access_token: token } = auth

    try {
      await PlayerService.meUpdate(token, player)
      this.setState({ updated: true })
    } catch (error) {
      this.setState({ updatedError: true })
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(userActions.getProfile())
    dispatch(userActions.getPlayer())
  }

  render () {
    const { player } = this.state
    const { classes, auth } = this.props
    const { profile = {}, player: _player = null, USERS_GETPLAYER_FAILURE = null } = auth

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography variant='h3' component='h1'>
          User Profile
        </Typography>
        <Grid
          spacing={16}
          container
          className={classes.container}
        >
          <Grid item xs={12} className={classes.item}>
            <Typography variant='h4' component='h2'>
              {profile.name}
            </Typography>
            <Avatar
              className={classes.bigAvatar}
              alt={profile.name}
              src={profile.picture}
            />
            <Typography align='center' variant='caption'>
              Email:
            </Typography>
            <Typography align='center' gutterBottom>
              {profile.email}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant='h3' component='h1'>
          Habrewken Player Profile
        </Typography>
        <Grid
          spacing={16}
          container
          className={classes.container}
        >
          {
            USERS_GETPLAYER_FAILURE &&
            <Typography>
              {
                USERS_GETPLAYER_FAILURE.statusCode === 404 && <span>
                  No player found for your email. Contact <a className={classes.link} href='/players/5a5b943433e9a91eb8a6b993'>ColdLink</a> to attach a player to your user profile.
                </span>
              }
            </Typography>
          }
          {
            _player && <Grid item xs={12} className={classes.item}>
              <Tooltip title='Update Profile Picture on Challonge. Will be updated after the next tournament you partake in.' placement='top'>
                <Avatar
                  className={classes.bigAvatar}
                  alt={_player.handle}
                  src={_player.imageUrl}
                />
              </Tooltip>
              <Grid item xs={12} className={classes.item}>
                <Tooltip title='Your handle on this site' placement='top'>
                  <TextField
                    required
                    id='handle'
                    name='handle'
                    label='Handle'
                    placeholder='Handle'
                    value={get(player, 'handle', get(_player, 'handle', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Tooltip title='twitter.com/{profile}' placement='top'>
                  <TextField
                    id='profile.twitter'
                    name='profile.twitter'
                    label='Twitter'
                    placeholder='Twitter'
                    value={get(player, 'profile.twitter', get(_player, 'profile.twitter', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='instagram.com/{profile}' placement='top'>
                  <TextField
                    id='profile.instagram'
                    name='profile.instagram'
                    label='Instagram'
                    placeholder='Instagram'
                    value={get(player, 'profile.instagram', get(_player, 'profile.instagram', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='e.g: https://hbk.gg' placement='top'>
                  <TextField
                    id='profile.web'
                    name='profile.web'
                    label='Website'
                    placeholder='Website'
                    value={get(player, 'profile.web', get(_player, 'profile.web', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='Playstation Network Username' placement='top'>
                  <TextField
                    id='profile.playstation'
                    name='profile.playstation'
                    label='PSN'
                    placeholder='PSN'
                    value={get(player, 'profile.playstation', get(_player, 'profile.playstation', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='Xbox Live GamerTag' placement='top'>
                  <TextField
                    id='profile.xbox'
                    name='profile.xbox'
                    label='XBL'
                    placeholder='XBL'
                    value={get(player, 'profile.xbox', get(_player, 'profile.xbox', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='steamcommunity.com/id/{profile}' placement='top'>
                  <TextField
                    id='profile.steam'
                    name='profile.steam'
                    label='Steam'
                    placeholder='Steam'
                    value={get(player, 'profile.steam', get(_player, 'profile.steam', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='Discord Tag' placement='top'>
                  <TextField
                    id='profile.discord'
                    name='profile.discord'
                    label='Discord'
                    placeholder='Discord'
                    value={get(player, 'profile.discord', get(_player, 'profile.discord', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='twitch.tv/{profile}' placement='top'>
                  <TextField
                    id='profile.twitch'
                    name='profile.twitch'
                    label='Twitch'
                    placeholder='Twitch'
                    value={get(player, 'profile.twitch', get(_player, 'profile.twitch', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Button variant='contained' color='secondary' onClick={this.savePlayer} className={classes.button}>
                  Save
                </Button>
              </Grid>
            </Grid>
          }
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.updated}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Profile Updated!</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.handleCloseSnackbar}
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
          open={this.state.updatedError}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Uh oh! Something went wrong. :(</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Paper>
    )
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    auth
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Profile)))
