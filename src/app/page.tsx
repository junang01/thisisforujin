"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [input, setInput] = useState("");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "오류가 발생했습니다.");
      setResult(data);
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 임시: 3세트 답변 구조 예시 (실제 API 응답에 맞게 조정 필요)
  const answerSets = result?.sets || [
    {
      memorable: ["기억에 남는 문장1", "기억에 남는 문장2", "기억에 남는 문장3"],
      reflection: ["성찰1", "성찰2", "성찰3"],
      plan: ["계획1", "계획2", "계획3"],
    },
    {
      memorable: ["기억에 남는 문장4", "기억에 남는 문장5", "기억에 남는 문장6"],
      reflection: ["성찰4", "성찰5", "성찰6"],
      plan: ["계획4", "계획5", "계획6"],
    },
    {
      memorable: ["기억에 남는 문장7", "기억에 남는 문장8", "기억에 남는 문장9"],
      reflection: ["성찰7", "성찰8", "성찰9"],
      plan: ["계획7", "계획8", "계획9"],
    },
  ];

  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 relative">
      {/* 상단 응원 문구 */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-3xl sm:text-4xl font-extrabold text-pink-600 drop-shadow-lg animate-bounce">
        유진아 파이팅! 💖
      </div>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 bg-white/80 dark:bg-white/60 rounded-xl shadow-2xl p-6 md:p-10 mt-24 mb-16 border border-pink-200">
        {/* 입력 영역 */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 min-w-[260px] max-w-md"
        >
          <h2 className="text-xl font-bold mb-2 text-pink-500">입력</h2>
          <textarea
            className="w-full border-2 border-pink-200 rounded p-2 min-h-[80px] resize-y focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            placeholder="원문을 입력하세요"
            value={input}
            onChange={e => setInput(e.target.value)}
            required
          />
          <textarea
            className="w-full border-2 border-pink-200 rounded p-2 min-h-[40px] resize-y focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            placeholder="요약 및 성찰 주제를 입력하세요"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="mt-2 bg-pink-500 hover:bg-pink-400 text-white font-bold shadow-pink-200 shadow-md"
            disabled={loading || !input || !topic}
          >
            {loading ? "전송 중..." : "전송"}
          </Button>
          {error && <div className="text-red-500 font-semibold mt-2">{error}</div>}
        </form>
        {/* 답변 영역 */}
        <div className="flex-1 flex flex-col gap-4 overflow-x-auto min-w-[260px]">
          <h2 className="text-xl font-bold mb-2 text-pink-500">AI 답변</h2>
          <div className="flex flex-col gap-6">
            {loading && (
              <Card className="border-pink-200 bg-pink-50/80">
                <CardHeader>
                  <CardTitle className="text-pink-500">답변 생성 중...</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-400">AI가 답변을 생성하고 있습니다.</div>
                </CardContent>
              </Card>
            )}
            {!loading && !result && (
              <Card className="border-pink-200 bg-pink-50/80">
                <CardHeader>
                  <CardTitle className="text-pink-400">아직 답변이 없습니다</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-400">입력 후 전송하면 AI 답변이 여기에 표시됩니다.</div>
                </CardContent>
              </Card>
            )}
            {!loading && result && answerSets.map((set: { memorable: string[]; reflection: string[]; plan: string[] }, idx: number) => (
              <Card key={idx} className="border-pink-300 bg-white/90 shadow-pink-200 shadow-md w-full">
                <CardHeader>
                  <CardTitle className="text-pink-600">답변 {idx + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="font-bold text-sm mb-1 text-pink-500">기억에 남는 문장</div>
                      <ul className="list-disc list-inside text-sm ml-4">
                        {set.memorable.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1 text-pink-500">나의 매니지먼트 활동 성찰</div>
                      <ul className="list-disc list-inside text-sm ml-4">
                        {set.reflection.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1 text-pink-500">나의 향후 매니지먼트 계획</div>
                      <ul className="list-disc list-inside text-sm ml-4">
                        {set.plan.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* 하단 응원 문구 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-xl sm:text-2xl font-semibold text-pink-500 drop-shadow animate-pulse">
        항상 응원하는거 알지! 🌸
      </div>
    </div>
  );
}
