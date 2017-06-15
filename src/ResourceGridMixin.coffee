
ResourceGridMixin = # expects a Grid


	# whether we should attempt to render selections or resizes that span
	# across different resources
	allowCrossResource: true


	eventRangeToEventFootprints: (eventRange) ->
		resourceIds = eventRange.eventDef.getResourceIds()

		for resourceId in resourceIds # returns the accumulation
			new EventFootprint(
				new ResourceComponentFootprint(
					eventRange.unzonedRange
					eventRange.eventDef.isAllDay()
					resourceId
				)
				eventRange.eventDef
				eventRange.eventInstance # might not exist
			)


	# DnD
	# ---------------------------------------------------------------------------------


	computeEventDropMutation: (startFootprint, endFootprint) ->
		mutation = super

		if startFootprint.resourceId != endFootprint.resourceId
			mutation.oldResourceId = startFootprint.resourceId
			mutation.newResourceId = endFootprint.resourceId

		mutation


	computeExternalDrop: (resourceComponentFootprint, meta) ->
		eventDef = super
		eventDef.addResourceId(resourceComponentFootprint.resourceId)
		eventDef


	# Selection
	# ---------------------------------------------------------------------------------


	computeSelectionFootprint: (startFootprint, endFootprint) ->

		if not @allowCrossResource and startFootprint.resourceId != endFootprint.resourceId
			return

		plainFootprint = super

		new ResourceComponentFootprint(
			plainFootprint.unzonedRange,
			plainFootprint.isAllDay,
			startFootprint.resourceId
		)
