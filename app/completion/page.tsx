import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CompletionScreen() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 text-white border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-center">Interview Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <p>
            Thank you for completing the interview. Your responses have been recorded successfully.
          </p>
          <p className="text-sm text-slate-400">
            You will receive feedback on your interview within 24-48 hours.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

