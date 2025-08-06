import { NextRequest, NextResponse } from "next/server";
import { EXAMPLE } from "./example";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, example } = await req.json();

    // 프롬프트 구성: 예시 + 사용자의 입력
    const prompt = `다음은 예시입니다. 말투와 형식을 참고해서 답변해 주세요.\n\n[예시]\n원문: ${EXAMPLE.original}\n기억에 남는 문장: ${EXAMPLE.memorable}\n나의 매니지먼트 활동 성찰: ${EXAMPLE.reflection}\n나의 향후 매니지먼트 계획: ${EXAMPLE.plan}\n\n[입력]\n원문: ${message}\n\n아래와 같은 형식으로 3가지 버전의 답변을 만들어 주세요.\n각 버전마다 기억에 남는 문장 3개, 성찰 3개, 계획 3개씩 작성해 주세요.\n\n[출력 예시]\n1. 기억에 남는 문장: ...\n   나의 매니지먼트 활동 성찰: ...\n   나의 향후 매니지먼트 계획: ...\n2. 기억에 남는 문장: ...\n   ...\n3. 기억에 남는 문장: ...\n   ...`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "너는 따뜻하고 긍정적인 매니지먼트 코치야. 예시의 말투와 형식을 따라줘." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 800
    });

    const aiText = completion.choices[0]?.message?.content || "";

    // 결과 파싱: 1,2,3번 묶음별로 분리
    const sets = aiText
      .split(/\n\d+\. /)
      .filter(Boolean)
      .map((block) => {
        const memorable = (block.match(/기억에 남는 문장:([^\n]*)/g) || []).map(line => line.replace(/기억에 남는 문장:/, '').trim()).filter(Boolean);
        const reflection = (block.match(/나의 매니지먼트 활동 성찰:([^\n]*)/g) || []).map(line => line.replace(/나의 매니지먼트 활동 성찰:/, '').trim()).filter(Boolean);
        const plan = (block.match(/나의 향후 매니지먼트 계획:([^\n]*)/g) || []).map(line => line.replace(/나의 향후 매니지먼트 계획:/, '').trim()).filter(Boolean);
        return { memorable, reflection, plan };
      });

    return NextResponse.json({ sets });
  } catch (error) {
    return NextResponse.json({ error: "AI 응답 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}