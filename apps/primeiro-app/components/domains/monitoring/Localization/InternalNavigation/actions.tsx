import * as localizations from '../index'

export function Actions() {
  const { setSlidePanelState } = localizations.useLocalization()
  const actions = [
    {
      title: 'Histórico',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
