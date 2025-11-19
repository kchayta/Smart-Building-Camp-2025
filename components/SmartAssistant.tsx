import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askSmartAssistant } from '../services/geminiService';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export const SmartAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะประจำ Smart Building Model Camp 2025 มีข้อมูลอะไรให้ผมช่วยค้นหาเกี่ยวกับตารางเวลา หรือความรู้เรื่อง Smart Building ไหมครับ?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await askSmartAssistant(input);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      // Error handled in service, but fallback here just in case
      setMessages(prev => [...prev, { role: 'model', text: 'ขออภัย เกิดข้อผิดพลาด', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="bg-harvard-black p-6 flex items-center space-x-4 border-b border-harvard-gold">
          <div className="bg-harvard-crimson p-2 rounded-full">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white">Camp AI Assistant</h2>
            <p className="text-xs text-gray-400">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-200' : 'bg-harvard-crimson'}`}>
                  {msg.role === 'user' ? <User className="h-5 w-5 text-gray-600" /> : <Bot className="h-5 w-5 text-white" />}
                </div>

                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-gray-800 rounded-tr-none border border-gray-100' 
                    : 'bg-white text-gray-800 rounded-tl-none border-l-4 border-harvard-crimson'
                }`}>
                  {msg.text}
                  <div className="text-[10px] text-gray-400 mt-2 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                <Loader2 className="h-4 w-4 animate-spin text-harvard-crimson" />
                <span className="text-xs text-gray-500">กำลังประมวลผล...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="ถามคำถามเกี่ยวกับค่าย หรือ Smart Building..."
              className="w-full pl-4 pr-12 py-4 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-harvard-crimson focus:bg-white transition-all text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-harvard-black text-white rounded-full hover:bg-harvard-crimson disabled:opacity-50 disabled:hover:bg-harvard-black transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="text-center mt-2">
             <p className="text-[10px] text-gray-400">AI อาจแสดงผลลัพธ์ที่ไม่ถูกต้อง โปรดตรวจสอบข้อมูลสำคัญกับเจ้าหน้าที่</p>
          </div>
        </div>

      </div>
    </div>
  );
};