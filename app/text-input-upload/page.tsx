'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast, useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

export default function TextInputAndUploadPage() {
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFileName(file.name)
        // Here you would typically send the file to your server or process it
        toast({
          title: "File uploaded",
          description: `Successfully uploaded ${file.name}`,
        })
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file",
          variant: "destructive",
        })
      }
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the text and file to your server or process them
    console.log('Submitted text:', text)
    console.log('Uploaded file:', fileName)
    toast({
      title: "Form submitted",
      description: "Your text and file have been submitted",
    })
    // Navigate to the output report page
    router.push('/output-report')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Enter information about your industry, line of products and raw materials</CardTitle>
          <CardDescription>Provide details or upload a DOCX/PDF file</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Textarea
                id="text-input"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload">File Upload</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
                <span className="text-sm text-gray-500">
                  {fileName || "No file chosen"}
                </span>
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

