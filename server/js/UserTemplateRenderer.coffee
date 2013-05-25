'''
  Simple wrapper for rendering a user-created Handlebars template.

  Could be built out in the future by supporting user-created handlebars helpers, etc.
'''
class window.UserTemplateRenderer

  constructor: ->
    @database = TAFFY();

  @renderTemplate: (source, context) =>
    console.log "HANDLEBARS"
    console.log source
    console.log context
    template = Handlebars.compile(source)
    return template(context)