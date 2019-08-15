LabelsLink =
  init: ->
    return unless g.VIEW in ['index', 'thread'] and Conf['Menu']

    div = $.el 'div',
      className: 'labels-link'
      textContent: 'Labels'
    
    labels = [
      'hey'
    ]
    
    
    entry =
      el: div
      order: 117
      open: ({labels}) ->
        return false unless labels.length
        @subEntries.length = 0
        for label in labels
          entry.subEntries.push @createSubEntry label
        true
      subEntries: []

    Menu.menu.addEntry entry
    
    createSubEntry: (label) ->
      el = $.el 'a',
        textContent: label