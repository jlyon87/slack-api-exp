'use strict'

const config = require('../config/slack.config')
const Slack = require('slack-api').promisify()

// console.log(Slack)
// console.log('config', config)

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

Slack.search.all({ token: config.client_id, query: 'has:[:upside_down_face:]' })
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
