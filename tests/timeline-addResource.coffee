
describe 'timeline addResource', ->

	pushOptions
		defaultDate: '2016-05-31'

	# https://github.com/fullcalendar/fullcalendar-scheduler/issues/179
	it 'works when switching views', ->
		initCalendar
			defaultView: 'timelineDay',
			resources: [
				{ id: 'a', title: 'Auditorium A' }
				{ id: 'b', title: 'Auditorium B' }
				{ id: 'c', title: 'Auditorium C' }
			]
		expect(getTimelineResourceIds()).toEqual([ 'a', 'b', 'c' ])

		currentCalendar.changeView('timelineWeek')
		expect(getTimelineResourceIds()).toEqual([ 'a', 'b', 'c' ])

		currentCalendar.addResource({ id: 'd', title: 'Auditorium D' })
		expect(getTimelineResourceIds()).toEqual([ 'a', 'b', 'c', 'd' ])

		currentCalendar.changeView('timelineDay')
		expect(getTimelineResourceIds()).toEqual([ 'a', 'b', 'c', 'd' ])

	it 'works with scrollTo param', ->
		initCalendar
			defaultView: 'timelineDay',
			resources:
				for i in [0 ... 50]
					{ title: 'resource ' + i }

		currentCalendar.addResource({ id: 'last', title: 'last resource' }, true)

		spreadsheetRowEl = $('.fc-resource-area [data-resource-id="last"]')
		spreadsheetScrollerEl = $('.fc-body .fc-resource-area .fc-scroller')
		maxScroll = spreadsheetScrollerEl[0].scrollHeight - spreadsheetScrollerEl[0].clientHeight
		currentScroll = spreadsheetScrollerEl[0].scrollTop

		expect(spreadsheetRowEl.length).toBe(1)
		expect(maxScroll).toBe(currentScroll)
