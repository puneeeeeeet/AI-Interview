'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Mic, Monitor, CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from "next/navigation"

type PermissionStatus = 'unchecked' | 'granted' | 'denied';

export default function PermissionsCheck() {
  const router = useRouter()
  const [permissions, setPermissions] = useState({
    camera: 'unchecked' as PermissionStatus,
    microphone: 'unchecked' as PermissionStatus,
    screen: 'unchecked' as PermissionStatus,
  })

  const checkPermission = async (type: 'camera' | 'microphone' | 'screen') => {
    try {
      let stream;
      if (type === 'screen') {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({
          video: type === 'camera',
          audio: type === 'microphone'
        });
      }
      stream.getTracks().forEach(track => track.stop());
      setPermissions(prev => ({ ...prev, [type]: 'granted' }));
    } catch (error: unknown) {
      console.error(`${type} permission error:`, error);
      setPermissions(prev => ({ ...prev, [type]: 'denied' }));
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert(`${type} permission denied. Please enable ${type} access in your browser settings and try again.`);
        } else if (error.name === 'NotFoundError') {
          alert(`No ${type} found. Please check your ${type} connection and try again.`);
        } else {
          alert(`An error occurred while trying to access the ${type}: ${error.message}`);
        }
      } else {
        alert(`An unknown error occurred while trying to access the ${type}. Please try again.`);
      }
    }
  }

  const allPermissionsGranted = 
    permissions.camera === 'granted' && 
    permissions.microphone === 'granted';

  useEffect(() => {
    const checkBrowserCompatibility = () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        alert("Your browser doesn't support screen sharing. Please use a modern version of Chrome, Firefox, or Edge.")
      }
    }
    checkBrowserCompatibility()
  }, [])

  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 text-white border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-center">Device Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {['camera', 'microphone', 'screen'].map((type) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {type === 'camera' && <Camera className="h-5 w-5" />}
                  {type === 'microphone' && <Mic className="h-5 w-5" />}
                  {type === 'screen' && <Monitor className="h-5 w-5" />}
                  <span className="capitalize">{type}</span>
                </div>
                {permissions[type as keyof typeof permissions] === 'granted' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => checkPermission(type as 'camera' | 'microphone' | 'screen')} 
                      variant="outline" 
                      size="sm"
                    >
                      Check
                    </Button>
                    {permissions[type as keyof typeof permissions] === 'denied' && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center space-y-4">
          {permissions.screen === 'denied' && (
            <p className="text-yellow-400 text-sm text-center">
              Warning: Screen sharing is not enabled. You may continue, but some features might be limited.
            </p>
          )}
          {(permissions.camera === 'denied' || permissions.microphone === 'denied') && (
            <p className="text-red-400 text-sm text-center">
              Error: Camera and microphone access are required for the interview. Please grant permission and try again.
            </p>
          )}
          <Button
            onClick={() => router.push('/question')}
            disabled={!allPermissionsGranted}
            className="bg-blue-900 hover:bg-blue-600"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

