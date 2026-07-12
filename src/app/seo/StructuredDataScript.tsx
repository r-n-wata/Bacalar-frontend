import { useEffect } from 'react'

type JsonLd = Record<string, unknown>

type StructuredDataProps = {
  data: JsonLd | JsonLd[]
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const payload = Array.isArray(data) ? data : [data]
    const scripts = payload.map((entry, index) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-structured-data-index', String(index))
      script.text = JSON.stringify(entry)
      document.head.append(script)

      return script
    })

    return () => {
      for (const script of scripts) {
        script.remove()
      }
    }
  }, [data])

  return null
}
