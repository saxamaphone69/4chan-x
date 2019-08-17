FilterLabelsLink =
  init: ->
    return unless g.VIEW in ['index', 'thread'] and Conf['Menu'] and Conf['Filter Labels Link']

    div = $.el 'div',
      className: 'labels-link'
      textContent: 'Labels'
    
    entry = 
      el: div
      order: 117
      open: (post) ->
        return false unless post.labels.length
        @subEntries.length = 0
        #console.log('outside: ', post, post.labels)
        for label in post.labels
          #console.log(label)
          @subEntries.push el: $.el 'div', textContent: label
        true
      subEntries: []

    Menu.menu.addEntry entry
###
Labels =
  init: ->
    return if !Conf['Menu']

     $.event 'AddMenuEntry',
      type: 'post'
      el: $.el 'div', textContent: 'Labels'
      order: 60
      open: ({labels}, addSubEntry) ->
        return false unless labels.length
        @subEntries.length = 0
        for label in labels
          addSubEntry el: $.el 'div', textContent: label
        true
      subEntries: []
###