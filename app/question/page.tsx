'use client'

import {  useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function QuestionScreen() {
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [questionText] = useState("Tell me about your experience with React and Next.js?")

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 text-white border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-center">Question 1</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-center">{questionText}</p>
          <div className="flex justify-center">
            <Button onClick={togglePlay} variant="outline" size="lg">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>
          <audio
            ref={audioRef}
            src="/placeholder.mp3"
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={() => router.push('/answer')}>
            Start Recording
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

