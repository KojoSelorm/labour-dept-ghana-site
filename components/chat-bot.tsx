"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Upload, Bot, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm the Labour Department AI Assistant. I can help you with questions about labour laws, workplace rights, employment services, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Simulate API call with static responses
      const response = await simulateAIResponse(inputMessage)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm experiencing technical difficulties. Please try again later or contact our office at 0800 600 300.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateAIResponse = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("wage") || lowerMessage.includes("salary") || lowerMessage.includes("pay")) {
      return "Regarding wages and salaries: Under Ghana's Labour Act, employees must receive at least the national minimum wage. Wages should be paid no later than the 3rd working day of the following month. For current minimum wage rates and wage-related complaints, you can contact our office at 0800 600 300."
    }

    if (lowerMessage.includes("working hours") || lowerMessage.includes("overtime")) {
      return "Working hours in Ghana are regulated by the Labour Act. The standard working week is 40 hours (8 hours per day, 5 days per week). Overtime work should be compensated at a higher rate. Employees are entitled to at least 24 consecutive hours of rest per week."
    }

    if (lowerMessage.includes("complaint") || lowerMessage.includes("report")) {
      return "To file a complaint, you can: 1) Use our online complaint form on this website, 2) Call our hotline at 0800 600 400, 3) Visit any of our 16 regional offices, or 4) Email complaints@labour.gov.gh. All complaints are handled confidentially."
    }

    if (lowerMessage.includes("child labour") || lowerMessage.includes("children")) {
      return "Child labour is strictly prohibited in Ghana. The minimum working age is 15 years, and children under 18 cannot engage in hazardous work. If you suspect child labour, please report it immediately to our hotline at 0800 600 400."
    }

    if (lowerMessage.includes("safety") || lowerMessage.includes("accident")) {
      return "Workplace safety is a fundamental right. Employers must provide a safe working environment, safety training, and protective equipment. If you experience unsafe conditions, you can request a labour inspection through our office."
    }

    if (lowerMessage.includes("union") || lowerMessage.includes("organize")) {
      return "Workers have the right to form and join trade unions. This right is protected under Ghana's Labour Act and ILO conventions. Employers cannot discriminate against workers for union activities. For assistance with union formation, contact our Industrial Relations division."
    }

    if (lowerMessage.includes("dismissal") || lowerMessage.includes("fired") || lowerMessage.includes("termination")) {
      return "Dismissal must follow proper procedures under the Labour Act. Employees are entitled to notice or payment in lieu of notice. Unfair dismissal can be challenged. If you believe you were wrongfully dismissed, you can file a complaint with our office."
    }

    // Default response
    return "Thank you for your question. For specific labour law inquiries, I recommend contacting our office directly at 0800 600 300 or visiting our website's resources section. Our trained staff can provide detailed guidance on your specific situation."
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Please upload only PDF files.")
      return
    }

    const botMessage: Message = {
      id: Date.now().toString(),
      content:
        "Thank you for uploading the document. Please note that document processing is currently unavailable. For document review, please email your files to info@labour.gov.gh or visit our office.",
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#dd2a1b] hover:bg-[#c02419] shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <CardHeader className="bg-[#dd2a1b] text-white rounded-t-lg flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-lg">Labour Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="w-fit bg-white/20 text-white border-white/30">
              AI-Powered Labour Support
            </Badge>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "bg-[#dd2a1b] text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about labour laws, rights, services..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="icon"
                  className="bg-[#dd2a1b] hover:bg-[#c02419]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="text-xs"
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Upload PDF
                </Button>
                <p className="text-xs text-gray-500">Upload labour documents for AI analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
