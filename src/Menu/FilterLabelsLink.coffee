FilterLabelsLink =
  init: ->
    return unless g.VIEW in ['index', 'thread'] and Conf['Menu'] and Conf['Filter Labels Link']

    a = $.el 'a',
      className: 'not'
      href: 'javascript:;'
      textContent: 'NO Copy Text'
    $.on a, 'click', FilterLabelsLink.copy

    Menu.menu.addEntry
      el: a
      order: 117
      open: (post) ->
        FilterLabelsLink.text = (post.origin or post).commentOrig()
        true

  copy: ->
    el = $.el 'textarea',
      className: 'hey',
      value: FilterLabelsLink.text
    $.add d.body, el
    el.select()
    try
      d.execCommand 'copy'
    $.rm el
