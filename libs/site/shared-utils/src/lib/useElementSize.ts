import { RefObject, useCallback, useEffect, useState } from 'react'
import useEventListener from './useEventListener'

export interface Size {
  width: number
  height: number
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(
  elementRef: RefObject<T>,
): Size {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  const updateSize = useCallback(() => {
    const node = elementRef?.current
    if (node) {
      setSize({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0,
      })
    }
  }, [elementRef])

  useEffect(() => {
    updateSize()
  }, [])

  useEventListener('resize', updateSize)

  return size
}

export default useElementSize
