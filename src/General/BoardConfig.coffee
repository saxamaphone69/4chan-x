BoardConfig =
  cbs: []

  init: ->
    return unless g.SITE.software is 'yotsuba'
    now = Date.now()
    unless now - 2 * $.HOUR < (Conf['boardConfig'].lastChecked or 0) <= now
      $.ajax "#{location.protocol}//a.4cdn.org/boards.json",
        onloadend: @load
    else
      {boards} = Conf['boardConfig']
      @set boards

  load: ->
    if @status is 200 and @response and @response.boards
      boards = $.dict()
      for board in @response.boards
        boards[board.board] = board
      $.set 'boardConfig', {boards, lastChecked: Date.now()}
    else
      {boards} = Conf['boardConfig']
      err = switch @status
        when 0   then 'Connection Error'
        when 200 then 'Invalid Data'
        else          "Error #{@statusText} (#{@status})"
      new Notice 'warning', "Failed to load board configuration. #{err}", 20
    BoardConfig.set boards

  set: (@boards) ->
    for ID, board of g.boards
      board.config = @boards[ID] or {}
    for cb in @cbs
      $.queueTask cb
    return

  ready: (cb) ->
    if @boards
      cb()
    else
      @cbs.push cb

  sfwBoards: (sfw) ->
    board for board, data of (@boards or Conf['boardConfig'].boards) when !!data.ws_board is sfw

  isSFW: (board) ->
    !!(@boards or Conf['boardConfig'].boards)[board]?.ws_board

  domain: ->
    'boards.4chan.org'

  isArchived: (board) ->
    # assume archive exists if no data available to prevent cleaning of archived threads
    data = (@boards or Conf['boardConfig'].boards)[board]
    !data or data.is_archived

  noAudio: (boardID) ->
    return false unless g.SITE.software is 'yotsuba'
    boards = @boards or Conf['boardConfig'].boards
    boards and boards[boardID] and !boards[boardID].webm_audio

  title: (boardID) ->
    (@boards or Conf['boardConfig'].boards)?[boardID]?.title or ''
