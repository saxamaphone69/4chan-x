LabelsLink =
  init: ->
    return unless g.VIEW in ['index', 'thread'] and Conf['Menu']

    div = $.el 'div',
      className: 'labels-link'
      textContent: 'Labels'

    entry =
      el: div
      order: 117
      open: ({@labels}) ->
        true

    Menu.menu.addEntry entry
###
      subEntries: [
        for label in @labels
          entry.subEntries.push @createSubEntry label
      ]

    Menu.menu.addEntry entry

    createSubEntry: (label) ->
      el = $.el 'a',
        textContent: label
###