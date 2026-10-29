import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'banner-generator' });
}

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildProceduralSvg16x3(
  prompt: string,
  accentColor: string,
  secondaryColor: string
): string {
  const p = prompt.toLowerCase();
  const isCyber =
    p.includes('ai') || p.includes('hệ thống') || p.includes('5g') || p.includes('mạng') || p.includes('số');
  const isWarm =
    p.includes('thương mại') || p.includes('sale') || p.includes('vàng') || p.includes('cam') || p.includes('kim');

  const c1 = accentColor || (isWarm ? '#f59e0b' : '#06b6d4');
  const c2 = secondaryColor || (isCyber ? '#6366f1' : '#10b981');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 360" width="1920" height="360">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#060b16" />
        <stop offset="48%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#17153b" />
      </linearGradient>
      <radialGradient id="orbLeft" cx="22%" cy="35%" r="48%">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.52" />
        <stop offset="55%" stop-color="${c1}" stop-opacity="0.14" />
        <stop offset="100%" stop-color="${c1}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="orbRight" cx="82%" cy="62%" r="45%">
        <stop offset="0%" stop-color="${c2}" stop-opacity="0.48" />
        <stop offset="60%" stop-color="${c2}" stop-opacity="0.12" />
        <stop offset="100%" stop-color="${c2}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="waveLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0" />
        <stop offset="30%" stop-color="${c1}" stop-opacity="0.75" />
        <stop offset="70%" stop-color="${c2}" stop-opacity="0.85" />
        <stop offset="100%" stop-color="${c2}" stop-opacity="0" />
      </linearGradient>
      <pattern id="techGrid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-width="0.7" stroke-opacity="0.06" />
      </pattern>
    </defs>
    <rect width="1920" height="360" fill="url(#bgGrad)" />
    <rect width="1920" height="360" fill="url(#orbLeft)" />
    <rect width="1920" height="360" fill="url(#orbRight)" />
    <rect width="1920" height="360" fill="url(#techGrid)" />
    <path d="M0,260 C380,140 680,340 1120,190 C1450,80 1690,260 1920,150 L1920,360 L0,360 Z" fill="${c1}" fill-opacity="0.09" />
    <path d="M0,290 C420,190 790,330 1210,210 C1520,120 1740,270 1920,190" fill="none" stroke="url(#waveLine)" stroke-width="3" />
    <path d="M0,220 C360,310 820,90 1280,240 C1580,330 1760,140 1920,220" fill="none" stroke="url(#waveLine)" stroke-width="1.5" stroke-dasharray="8 8" />
    <circle cx="1420" cy="120" r="110" fill="none" stroke="${c1}" stroke-opacity="0.24" stroke-width="1.5" />
    <circle cx="1420" cy="120" r="155" fill="none" stroke="${c2}" stroke-opacity="0.16" stroke-width="1" stroke-dasharray="6 10" />
    <circle cx="480" cy="80" r="4" fill="${c1}" fill-opacity="0.8" />
    <circle cx="960" cy="240" r="5" fill="${c2}" fill-opacity="0.8" />
    <circle cx="1420" cy="120" r="6" fill="#ffffff" fill-opacity="0.9" />
    <circle cx="1660" cy="210" r="4" fill="${c1}" fill-opacity="0.8" />
  </svg>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt: string = (body?.prompt || '').trim();
    const pageTitle: string = body?.pageTitle || 'Hồ Sơ Chuyên Gia';
    const currentAccent: string = body?.accentColor || '#0284c7';
    const keepOriginalText: boolean = Boolean(body?.keepOriginalText ?? true);

    if (!prompt) {
      return NextResponse.json(
        { error: 'Vui lòng nhập mô tả ý tưởng Banner 16:3.' },
        { status: 400 }
      );
    }

    const ai = getAiClient();
    if (!ai) {
      const fallbackSvg = buildProceduralSvg16x3(prompt, currentAccent, '#6366f1');
      return NextResponse.json({
        svgMarkup: fallbackSvg,
        accentColor: currentAccent,
        secondaryColor: '#6366f1',
        suggestedKicker: `AI STUDIO 16:3 · ${pageTitle.toUpperCase()}`,
        suggestedTitle: '',
        suggestedSubtitle: '',
        mode: 'procedural-fallback',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Thiết kế nền đồ họa SVG chuẩn tỷ lệ siêu rộng 16:3 (viewBox="0 0 1920 360") cho trang "${pageTitle}" trong Website Portfolio của Trưởng phòng Dịch vụ Khách hàng Nguyễn Hùng Thái.
Mô tả yêu cầu từ người dùng: "${prompt}".
Hãy trả về JSON gồm:
1. svgMarkup: Mã <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 360" width="1920" height="360">...</svg> hoàn chỉnh, giàu tính nghệ thuật, sử dụng linearGradient, radialGradient, các dải sóng ánh sáng, lưới công nghệ tinh tế, vòng tròn năng lượng hoặc hình khối 3D trừu tượng, tuyệt đối không chứa thẻ <script> hay chữ đè rối mắt ở bên trái (để dành vùng bên trái hiển thị tiêu đề Banner).
2. accentColor: Mã màu HEX sáng nổi bật phù hợp với mô tả.
3. secondaryColor: Mã màu HEX phụ phối hợp hài hòa.
4. suggestedKicker: Nhãn ngắn phía trên tiêu đề bằng tiếng Việt (tối đa 6 từ, viết hoa).
5. suggestedTitle: Tiêu đề gợi ý bằng tiếng Việt trang trọng (nếu người dùng muốn tham khảo).
6. suggestedSubtitle: Phụ đề ngắn gọn 1 câu bằng tiếng Việt.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            svgMarkup: {
              type: Type.STRING,
              description: 'Complete valid SVG markup with viewBox="0 0 1920 360"',
            },
            accentColor: {
              type: Type.STRING,
              description: 'Primary accent hex color like #38bdf8',
            },
            secondaryColor: {
              type: Type.STRING,
              description: 'Secondary hex color like #818cf8',
            },
            suggestedKicker: {
              type: Type.STRING,
              description: 'Short uppercase Vietnamese kicker label',
            },
            suggestedTitle: {
              type: Type.STRING,
              description: 'Executive Vietnamese banner headline',
            },
            suggestedSubtitle: {
              type: Type.STRING,
              description: 'Executive Vietnamese banner subtitle',
            },
          },
          required: ['svgMarkup', 'accentColor', 'secondaryColor'],
        },
      },
    });

    const rawText = (response.text ?? '{}').trim();
    const parsed = JSON.parse(rawText);
    const validSvg =
      typeof parsed.svgMarkup === 'string' && parsed.svgMarkup.includes('<svg')
        ? parsed.svgMarkup
        : buildProceduralSvg16x3(prompt, parsed.accentColor || currentAccent, parsed.secondaryColor || '#6366f1');

    return NextResponse.json({
      svgMarkup: validSvg,
      accentColor: parsed.accentColor || currentAccent,
      secondaryColor: parsed.secondaryColor || '#6366f1',
      suggestedKicker: keepOriginalText ? '' : parsed.suggestedKicker || '',
      suggestedTitle: keepOriginalText ? '' : parsed.suggestedTitle || '',
      suggestedSubtitle: keepOriginalText ? '' : parsed.suggestedSubtitle || '',
      mode: 'gemini-ai',
    });
  } catch (error) {
    const fallbackSvg = buildProceduralSvg16x3('executive banner 16:3', '#06b6d4', '#6366f1');
    return NextResponse.json({
      svgMarkup: fallbackSvg,
      accentColor: '#06b6d4',
      secondaryColor: '#6366f1',
      mode: 'resilient-fallback',
      warning: error instanceof Error ? error.message : 'Fallback activated',
    });
  }
}
