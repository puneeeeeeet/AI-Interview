import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function InstructionScreen() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 text-white border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to Your AI Interview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Instructions:</h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>Ensure stable internet and choose a clean, quiet location. </li>
              <li>Permission for access of camera, microphone, entire screen sharing is required</li>
              <li>Be in professional attire and avoid distractions.</li>
              <li>Give a detailed response, providing as much information as you can.</li>
              <li>Answer the question with examples and projects you&apos;ve worked on.</li>
              <li>Make sure your face is clearly visible in the camera</li>
            </ul>
          </div>
         
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Technical Requirements:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Stable internet connection</li>
              <li>Working webcam</li>
              <li>Working microphone</li>
              <li>Google Chrome browser</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/permissions" className="">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-600 rounded-[8px]">Start Interview</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

