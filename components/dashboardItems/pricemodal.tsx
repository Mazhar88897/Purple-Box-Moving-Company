"use client"

import { useEffect, useMemo, useState } from "react"

type PriceLineItem = {
  label: string
  amount: number
}

type PriceResult = {
  items: PriceLineItem[]
  total: number
  notes?: string[]
}

function extractCity(address: string): string {
  const lower = address.toLowerCase()
  const known = [
    "new york",
    "nyc",
    "brooklyn",
    "queens",
    "bronx",
    "staten island",
    "jersey city",
    "newark",
    "hoboken",
    "long island",
  ]
  for (const k of known) if (lower.includes(k)) return k
  const parts = address
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean)
  if (parts.length >= 2) return parts[1]
  if (parts.length >= 1) return parts[0]
  return ""
}

function estimateHours(fromAddr: string, toAddr: string, moversCount: number): number {
  let hours = 4
  const fromCity = extractCity(fromAddr)
  const toCity = extractCity(toAddr)
  if (fromCity && toCity && fromCity !== toCity) hours += 1
  const nyAreas = [
    "new york",
    "nyc",
    "brooklyn",
    "queens",
    "bronx",
    "staten island",
    "long island",
  ]
  const fromInNY = nyAreas.some((c) => fromCity.includes(c))
  const toInNY = nyAreas.some((c) => toCity.includes(c))
  const njAreas = ["jersey city", "hoboken", "newark"]
  const fromInNJ = njAreas.some((c) => fromCity.includes(c))
  const toInNJ = njAreas.some((c) => toCity.includes(c))
  if ((fromInNY && toInNJ) || (fromInNJ && toInNY)) hours += 1
  if (moversCount >= 4) hours = Math.max(3, hours - 1)
  return Math.max(2, Math.min(10, hours))
}

export type PackingData = {
  needsPacking?: string
  roomSize?: string
  numberOfBoxes?: string
  furnitureBed?: boolean
  furnitureSofa?: boolean
  furnitureCloset?: boolean
  furnitureBoxes?: boolean
  additionalFurniture?: string[]
  customFurnitureItems?: string[]
}

export type ComplexItemsData = {
  complexItemsList?: string[]
}

export function computeEstimate(
  fromDestination: string,
  toDestination: string,
  moversCount: number,
  packingData?: PackingData,
  complexItemsData?: ComplexItemsData
): PriceResult {
  const BASE_RATE_PER_2_MOVERS_PER_HOUR = 120
  const PACKING_RATE_PER_MOVER_PER_HOUR = 40
  const WRAP_FEE_FLAT = 40
  const COMPLEX_ITEM_FEE = 40
  const BOX_PACKING_RATE = 5 // per box if already packed
  
  // Calculate complex items count
  const complexItemsList = complexItemsData?.complexItemsList || []
  const COMPLEX_ITEMS_COUNT = complexItemsList.filter(item => item.trim().length > 0).length

  const derivedHours = estimateHours(fromDestination, toDestination, moversCount)
  const multiplier = Math.max(1, Math.round(moversCount / 2))
  const baseMove = BASE_RATE_PER_2_MOVERS_PER_HOUR * multiplier * derivedHours
  
  // Calculate packing costs based on user selection
  let packing = 0
  let packingLabel = ""
  
  if (packingData?.needsPacking === "yes") {
    // User needs packing - calculate based on room size
    const roomSize = packingData.roomSize || ""
    let estimatedBoxes = 0
    
    switch (roomSize) {
      case "1-bedroom":
        estimatedBoxes = 35 // average of 30-40
        break
      case "2-bedroom":
        estimatedBoxes = 45 // average of 40-50
        break
      case "3+-bedroom":
        estimatedBoxes = 60 // average of 50-70
        break
      case "large-house":
        estimatedBoxes = 80 // 70+
        break
      default:
        estimatedBoxes = 40 // default
    }
    
    // Adjust based on furniture count
    let furnitureMultiplier = 1
    if (packingData.furnitureBed) furnitureMultiplier += 0.1
    if (packingData.furnitureSofa) furnitureMultiplier += 0.15
    if (packingData.furnitureCloset) furnitureMultiplier += 0.1
    const additionalFurnitureCount = (packingData.additionalFurniture?.length || 0) + (packingData.customFurnitureItems?.filter(Boolean).length || 0)
    furnitureMultiplier += additionalFurnitureCount * 0.05
    
    estimatedBoxes = Math.round(estimatedBoxes * furnitureMultiplier)
    packing = moversCount * PACKING_RATE_PER_MOVER_PER_HOUR * derivedHours
    packingLabel = `Packing/Unpacking (${moversCount} movers x $${PACKING_RATE_PER_MOVER_PER_HOUR}/hr, ~${estimatedBoxes} boxes)`
  } else if (packingData?.needsPacking === "no") {
    // User already packed - charge per box
    const boxCount = parseInt(packingData.numberOfBoxes || "0") || 0
    packing = boxCount * BOX_PACKING_RATE
    packingLabel = `Box handling (${boxCount} boxes x $${BOX_PACKING_RATE}/box)`
  } else {
    // No packing selection - default packing cost
    packing = moversCount * PACKING_RATE_PER_MOVER_PER_HOUR * derivedHours
    packingLabel = `Packing/Unpacking (${moversCount} movers x $${PACKING_RATE_PER_MOVER_PER_HOUR}/hr)`
  }
  
  const furnitureWrap = WRAP_FEE_FLAT

  // City surcharge removed per requirements
  const disassembly = COMPLEX_ITEMS_COUNT * COMPLEX_ITEM_FEE

  const items: PriceLineItem[] = [
    {
      label: `Base move (${moversCount} movers x $${BASE_RATE_PER_2_MOVERS_PER_HOUR}/hr per 2 movers)`,
      amount: Math.round(baseMove),
    },
  ]

  // Only add packing if it's greater than 0
  if (packing > 0) {
    items.push({
      label: packingLabel,
      amount: Math.round(packing),
    })
  }

  items.push({ label: "Furniture protection / wrapping (flat)", amount: Math.round(furnitureWrap) })

  if (disassembly > 0)
    items.push({
      label: `Complex items handling (${COMPLEX_ITEMS_COUNT} items x $${COMPLEX_ITEM_FEE})`,
      amount: Math.round(disassembly),
    })
  const rawTotal = items.reduce((s, i) => s + i.amount, 0)
  const MIN_TOTAL = 399
  const notes = [
    `Estimated hours: ${derivedHours}`,
    "Packing materials (boxes, tape, blankets) included.",
    "Adjust rates within market ranges as needed.",
  ] as string[]

  const total = rawTotal < MIN_TOTAL ? MIN_TOTAL : rawTotal
  if (rawTotal < MIN_TOTAL) {
    notes.push(`Minimum service total applied: $${MIN_TOTAL}`)
  }

  return {
    items,
    total,
    notes,
  }
}

export type PriceModalProps = {
  open: boolean
  onClose: () => void
  fromDestination: string
  toDestination: string
  moveType?: string
  moversCountOverride?: number
  useAI?: boolean
  packingData?: {
    needsPacking?: string
    roomSize?: string
    numberOfBoxes?: string
    furnitureBed?: boolean
    furnitureSofa?: boolean
    furnitureCloset?: boolean
    furnitureBoxes?: boolean
    additionalFurniture?: string[]
    customFurnitureItems?: string[]
  }
  complexItemsData?: {
    complexItemsList?: string[]
  }
}

export default function PriceModal({
  open,
  onClose,
  fromDestination,
  toDestination,
  moveType,
  moversCountOverride,
  useAI,
  packingData,
  complexItemsData,
}: PriceModalProps) {
  const inferredMovers = useMemo(() => {
    if (typeof moversCountOverride === "number" && moversCountOverride > 0) return moversCountOverride
    const mt = (moveType || "").toLowerCase()
    if (mt.includes("office")) return 3
    if (mt.includes("long")) return 3
    return 2
  }, [moveType, moversCountOverride])

  const canEstimate = useMemo(
    () => Boolean(fromDestination?.trim() && toDestination?.trim()),
    [fromDestination, toDestination]
  )

  const result = useMemo(() => {
    if (!canEstimate) return null
    return computeEstimate(fromDestination, toDestination, inferredMovers, packingData, complexItemsData)
  }, [canEstimate, fromDestination, toDestination, inferredMovers, packingData, complexItemsData])

  const [isOpen, setIsOpen] = useState(open)
  if (isOpen !== open) setIsOpen(open)

  // AI estimate integration
  const [aiResult, setAiResult] = useState<PriceResult | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  useEffect(() => {
    if (!canEstimate || !useAI) {
      setAiResult(null)
      setAiError(null)
      setAiLoading(false)
      return
    }

    const endpoint = "https://api.openai.com/v1/responses"

    const controller = new AbortController()
    setAiLoading(true)
    setAiError(null)

    const packingInfo = packingData?.needsPacking === "yes" 
      ? `needsPacking=yes, roomSize=${packingData.roomSize || ""}, furniture: bed=${packingData.furnitureBed || false}, sofa=${packingData.furnitureSofa || false}, closet=${packingData.furnitureCloset || false}, additionalItems=${(packingData.additionalFurniture?.length || 0) + (packingData.customFurnitureItems?.filter(Boolean).length || 0)}`
      : packingData?.needsPacking === "no"
      ? `needsPacking=no, boxes=${packingData.numberOfBoxes || 0}`
      : "needsPacking=not specified"
    
    const complexItemsInfo = complexItemsData?.complexItemsList?.filter(Boolean).length || 0
    
    const prompt = `Return JSON only. Fields: items[ {label, amount:number} ], total:number, notes:string[].
Given: from=${fromDestination}, to=${toDestination}, movers=${inferredMovers}, moveType=${moveType || ""}, ${packingInfo}, complexItemsCount=${complexItemsInfo}.
Use reasonable NYC/NJ local move pricing heuristics. No prose.`

    const token = process.env.OPENAI_API_KEY

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
        response_format: { type: "json_object" },
        temperature: 0.2,
      }),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        // OpenAI Responses API returns structured output under output[0].content[0].text
        const text = data?.output?.[0]?.content?.[0]?.text || "{}"
        const json = JSON.parse(text)
        const parsed: PriceResult = {
          items: Array.isArray(json?.items) ? json.items : [],
          total: typeof json?.total === "number" ? json.total : 0,
          notes: Array.isArray(json?.notes) ? json.notes : [],
        }
        setAiResult(parsed)
      })
      .catch((err: any) => {
        if (err?.name === "AbortError") return
        setAiError(err?.message || "AI estimate failed")
      })
      .finally(() => setAiLoading(false))

    return () => controller.abort()
  }, [canEstimate, useAI, fromDestination, toDestination, inferredMovers, moveType, packingData, complexItemsData])

  const displayResult = aiResult || result

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Estimated Price</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        <div className="mt-4 space-y-3">
          <div className="text-sm text-gray-600">
            <div><span className="font-medium text-gray-800">From:</span> {fromDestination || "—"}</div>
            <div><span className="font-medium text-gray-800">To:</span> {toDestination || "—"}</div>
            <div><span className="font-medium text-gray-800">Movers:</span> {inferredMovers}</div>
          </div>
          {displayResult ? (
            <div className="space-y-2">
              <ul className="divide-y divide-gray-100 border border-gray-100 rounded-md">
                {displayResult.items.map((it) => (
                  <li key={it.label} className="flex items-center justify-between p-3 text-sm">
                    <span className="text-gray-700">{it.label}</span>
                    <span className="font-medium text-gray-900">${it.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-2">
                <span className="text-base font-semibold text-gray-900">Estimated total</span>
                <span className="text-base font-bold text-purple-700">${displayResult.total.toLocaleString()}</span>
              </div>
              {displayResult.notes?.length ? (
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <div className="font-medium text-gray-700">Notes</div>
                  <ul className="list-disc pl-5">
                    {displayResult.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="mt-2 flex items-center gap-2 text-xs">
                {useAI ? (
                  <span className="inline-flex items-center rounded bg-purple-50 px-2 py-1 text-purple-700 border border-purple-100">AI estimate</span>
                ) : (
                  <span className="inline-flex items-center rounded bg-gray-50 px-2 py-1 text-gray-700 border border-gray-100">Quick estimate</span>
                )}
                {aiLoading ? <span className="text-gray-500">Fetching...</span> : null}
                {aiError ? <span className="text-red-600">{aiError}</span> : null}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                This is an estimate based on provided addresses. Please wait for exact confirmation.
              </p>
            </div>
          ) : (
            <div className="text-sm text-gray-600">Enter both addresses to see an estimate.</div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => {
              const price = displayResult?.total.toString() || '0';
              sessionStorage.setItem('price', price);
              onClose();
            }} 
            className="inline-flex items-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            Submit
          </button>
      </div>  </div>
    </div>
  );
}
