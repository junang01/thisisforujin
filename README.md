# 요구사항

## 프로젝트 목표

사용자가 넘겨준 원문을 읽고 기억의 남는 문장, 나의 매니지먼트 활동 성찰, 나의 향후 매니지먼트 계획을 생성해서 응답한다.

### 사용하는 기술 스택

- UI라이브러리
  - TailwindCSS: https://tailwindcss.com
  - shadcn/ui : https://ui.shadcn.com
- AI SDK
  - AI SDK: https://ai-sdk.dev/docs/introduction

## 구현 단계

1. 프로젝트 초기 설치 및 라이브러리 셋팅
   Next.js 프로젝트를 생성하고 TypeScript를 적용한다.
   TailwindCSS와 shadcn/ui를 설치 및 초기 설정한다.
   ai-sdk를 설치하고, 환경 변수 파일(.env)을 생성하여 API 키 등 민감 정보를 관리한다.
   프로젝트 구조(폴더 및 파일)를 설계한다.

2. App Router 및 API Router 핸들러 구현
   Next.js의 App Router 기능을 사용하여 라우팅 구조를 설정한다.
   /api/chat 등 API 엔드포인트를 생성한다.
   API 핸들러에서 ai-dk를 이용해 사용자의 메시지를 AI로 전달하고, AI의 응답을 받아 반환하는 로직을 작성한다.
   에러 처리 및 예외 상황(예: API 키 누락, AI 응답 실패 등)에 대한 핸들링을 구현한다.

3. 프론트엔드와 API 연동
   원문 입력, 요약 및 성찰 주제, 전송버튼 등 기본 UI 컴포넌트를 구현한다.
   사용자가 메시지를 입력하고 전송하면, 프론트엔드에서 API 엔드포인트로 메시지를 전송한다.
   사용자가 입력한 정보와 예시 데이터를 같이 AI에게 넘겨준다.
   AI는 기억의 남는 문장, 나의 현재 메니지먼트 활동 성찰, 나의 향후 메니지먼트 계획에 대해 각각 3개씩 응답한다.
   API로부터 받은 AI의 응답을 화면에 표시한다. ##같은 특수 문자 없이 텍스트로 깔끔하게 응답한다.
   메시지 전송 중 로딩 상태를 UI에 표시한다.
   에러 발생 시 사용자에게 안내 메시지를 표시한다.

4. UI 컴포넌트 고도화 및 UX 개선
   AI 답변 부분을 보다 시각적으로 좋게 정렬하고 공백으로 뒀다가 응답이 올시 채워준다.
   반응형 디자인을 적용하여 다양한 기기에서 사용 가능하도록 한다.
   shadcn/ui 컴포넌트를 활용해 UI를 개선한다.
   UI Reference: https://images.tenorshare.kr/products/pdf-converter/temp/hix-ai.png?w=1529&h=831

5. Vercel 배포
   환경 변수 및 배포 설정을 점검한다.
   Vercel에 프로젝트를 배포한다.
   배포 후 실제 서비스에서 정상 동작하는지 테스트한다.
