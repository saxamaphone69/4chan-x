LabelsLink =
  init: ->
    return unless g.VIEW in ['index', 'thread'] and Conf['Menu']

    div = $.el 'div',
      textContent: 'Labels'

    Menu.menu.addEntry
      el: div
      order: 117
      open: (post) ->
        return false unless post.labels.length
        for label in post.labels
          createSubEntry: (label) ->
            el: $.el 'div'
            textContent: label
        true
      subEntries: []