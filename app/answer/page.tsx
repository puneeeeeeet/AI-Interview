'use client'

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useRouter } from "next/navigation"

export default function AnswerScreen() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  useEffect(() => {
    setupCamera()
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const mediaRecorder = new MediaRecorder(videoRef.current.srcObject as MediaStream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data])
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    }
  }

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Example of sending chunks to an API
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      const formData = new FormData()
      formData.append('video', blob)

      try {
        // Replace with your actual API endpoint
        await fetch('/api/submit-recording', {
          method: 'POST',
          body: formData
        })
        router.push('/completion')
      } catch (error) {
        console.error('Error submitting recording:', error)
      }
    }
  }

  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 text-white border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-center">Record Your Answer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Recording
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center gap-4">
          {!isRecording ? (
            <Button onClick={startRecording}>
              Start Recording
            </Button>
          ) : (
            <Button onClick={stopRecording} variant="destructive">
              Stop Recording
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}

