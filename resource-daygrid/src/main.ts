import { createPlugin } from '@fullcalendar/core'
import resourceCommonPlugin from '@fullcalendar/resource-common'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ResourceDayTableView } from './ResourceDayTableView'

export { ResourceDayTableView }
export { ResourceDayTable } from './ResourceDayTable'

export default createPlugin({
  deps: [ resourceCommonPlugin, dayGridPlugin ],
  initialView: 'resourceDayGridDay',
  views: {

    resourceDayGrid: {
      type: 'dayGrid', // will inherit this configuration
      component: ResourceDayTableView,
      needsResourceData: true
    },

    resourceDayGridDay: {
      type: 'resourceDayGrid',
      duration: { days: 1 }
    },

    resourceDayGridWeek: {
      type: 'resourceDayGrid',
      duration: { weeks: 1 }
    },

    resourceDayGridMonth: {
      type: 'resourceDayGrid',
      duration: { months: 1 },

      // TODO: wish we didn't have to C&P from dayGrid's file
      monthMode: true, // a hidden option!?
      fixedWeekCount: true
    }

  }
})
