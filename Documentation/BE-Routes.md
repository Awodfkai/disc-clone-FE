# Back-End Routes

* Servers
  * POST /servers, Create a new server
  * DELETE /servers/:id, Delete a server with id
  * POST /servers/:id, Join a server with id
  * PUT /servers/:id, Edit a server with id
* Users
  * POST /users/:id, (friend)
  * DELETE /users/:id, (unfriend)
  * POST /register, create a new user
* Channels
  * GET /server/:serverId/channel/:channelId get a list of the channel's messages (how many?)
  * POST /server/:serverId/channel, create a new channel
  * PUT /server/:serverId/channel/:channelId, update the channel with id
  * DELETE /server/:serverId/channel/:channelId, delete the channel with id
* Messages
  * DELETE /messages/:id, delete the message with id
  * POST /messages, creates a new message
  * PUT /messages/:id, edits the message with id
  * PUT /messages/:id/pin pins the message with id
* Reaction
  * POST /message/:messageId, creates a reaction to a message
  * DELETE /responses/:messageId, removes the reaction to the message
