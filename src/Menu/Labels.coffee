Labels =
  init: ->
    return unless g.VIEW in ['index', 'thread'] and Conf['Menu']
    
    div = $.el 'div',
      textContent: 'Labels'
    
    entry =
      el: div
      order: 117
      open: (post) ->
        return false unless labels.length
        true
      subEntries: []
    
      Menu.menu.addEntry entry

###
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