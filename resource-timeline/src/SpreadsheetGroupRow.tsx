import { h, Fragment, BaseComponent, ComponentContext, CssDimValue, createRef, RenderHook, RefObject } from '@fullcalendar/core'
import { Group, isGroupsEqual } from '@fullcalendar/resource-common'
import { ExpanderIcon } from './ExpanderIcon'


export interface SpreadsheetGroupRowProps {
  spreadsheetColCnt: number
  id: string // 'field:value'
  isExpanded: boolean
  group: Group
  innerHeight: CssDimValue
}


export class SpreadsheetGroupRow extends BaseComponent<SpreadsheetGroupRowProps, ComponentContext> {

  innerInnerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()


  render(props: SpreadsheetGroupRowProps, state: {}, context: ComponentContext) {
    let hookProps = {
      groupValue: props.group.value
    }

    return (
      <tr>
        {/* 'header' is a bad name. should be 'label' instead. needed to do this because of GroupSpec */}
        <RenderHook name='header' options={props.group.spec} hookProps={hookProps} defaultContent={renderCellInner}>
          {(rootElRef, classNames, innerElRef, innerContent) => (
            <td class={[ 'fc-datagrid-cell', 'fc-resource-group', context.theme.getClass('tableCellShaded') ].concat(classNames).join(' ')} colSpan={props.spreadsheetColCnt} ref={rootElRef}>
              <div class='fc-datagrid-cell-frame' style={{ height: props.innerHeight }}>
                <div class='fc-datagrid-cell-cushion fc-scrollgrid-sync-inner' ref={this.innerInnerRef}>
                  <ExpanderIcon
                    depth={0}
                    hasChildren={true}
                    isExpanded={props.isExpanded}
                    onExpanderClick={this.onExpanderClick}
                  />
                  <span className='fc-datagrid-cell-main' ref={innerElRef}>
                    {innerContent}
                  </span>
                </div>
              </div>
            </td>
          )}
        </RenderHook>
      </tr>
    )
  }


  onExpanderClick = () => {
    let { props } = this

    this.context.dispatch({
      type: 'SET_RESOURCE_ENTITY_EXPANDED',
      id: props.id,
      isExpanded: !props.isExpanded
    })
  }

}

SpreadsheetGroupRow.addPropsEquality({
  group: isGroupsEqual
})


function renderCellInner(hookProps) {
  return hookProps.groupValue || <Fragment>&nbsp;</Fragment>
}
