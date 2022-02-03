import { useMemo } from 'react'
import { createPortal } from 'react-dom'

interface PortalPropType {
    children: React.ReactNode,
    elementId: string
}

function Portal({ children, elementId } : PortalPropType) {
  const rootElement : Element | null = useMemo(() => document.getElementById(elementId), [
    elementId,
  ])

  return rootElement && createPortal(children, rootElement);
}

export default Portal;