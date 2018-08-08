'use strict'

const config = require('../config/slack.config')
const Slack = require('slack-api').promisify()

const authTest = () => {
  Slack.auth.test({ token: config.client_id })
    .then(data => {
      console.log('auth', data)
    })
    .catch(Slack.errors.SlackError, error => {
      console.log('Slack did not like what you did: ' + error.message)
    })
    .catch(Slack.errors.CommunicationError, error => {
      console.error('Error communicating with Slack. ' + error.message)
    })
    .catch(Slack.errors.SlackServiceError, error => {
      console.error('Error communicating with Slack. ' + error.message)
      // To get error details
      console.error(error.errorDetails)
    })
}

const apiTest = () => {
  Slack.api.test(config)
    .then(data => {
      console.log('api', data)
    })
    .catch(Slack.errors.SlackError, error => {
      console.log('Slack did not like what you did: ' + error.message)
    })
    .catch(Slack.errors.CommunicationError, error => {
      console.error('Error communicating with Slack. ' + error.message)
    })
    .catch(Slack.errors.SlackServiceError, error => {
      console.error('Error communicating with Slack. ' + error.message)
      // To get error details
      console.error(error.errorDetails)
    })
}

const searchAll = query => {
  Slack.search.all({ token: config.client_id, query })
    .then(data => {
      console.log('search', data)
      console.log('matches', data.messages.matches)
    })
    .catch(Slack.errors.SlackError, error => {
      console.log('Slack did not like what you did: ' + error.message)
    })
    .catch(Slack.errors.CommunicationError, error => {
      console.error('Error communicating with Slack. ' + error.message)
    })
    .catch(Slack.errors.SlackServiceError, error => {
      console.error('Error communicating with Slack. ' + error.message)
      // To get error details
      console.error(error.errorDetails)
    })
}

const fetchReactionsByUsers = () => {
  Slack.users.list({ token: config.client_id })
    .then(data => {
      return Promise.all(data.members.map(user => {
        return Slack.reactions.list({ token: config.client_id, user: user.id })
      }))
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}

const fetchChannels = () => {
  const options = {
    token: config.client_id,
    exclude_archived: true
  }

  Slack.channels.list(options)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}

const fetchChannelHistory = () => {
  const options = {
    token: config.client_id,
    channel: 'C026FPW91'
  }

  Slack.channels.history(options)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}

// authTest()
// apiTest()
// searchAll('has:[:upside_down_face:]')
// fetchReactionsByUsers()
// fetchChannels()
fetchChannelHistory()
