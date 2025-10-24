"use client"
import React from 'react'
import FetchingTest from '@/components/demo/FetchingTest'

export default function TestFetchingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Continuous Fetching Test
        </h1>
        <FetchingTest />
      </div>
    </div>
  )
}
