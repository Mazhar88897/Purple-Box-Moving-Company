"use client"
import React, { useState } from 'react'
import SingleCharacterTest from '@/components/demo/SingleCharacterTest'

export default function TestSingleCharPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Single Character Search Test
        </h1>
        <SingleCharacterTest />
      </div>
    </div>
  )
}

