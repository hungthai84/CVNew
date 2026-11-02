import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export type PuckSpeakingStyle = 'friendly' | 'professional' | 'narration';
export type PuckPitchPreset = 'low' | 'natural' | 'warm';

interface TtsRequestBody {
  text?: string;
  speakingStyle?: PuckSpeakingStyle;
  speakingRate?: number;
  pitch?: PuckPitchPreset;
  accent?: string;
}

/**
 * Chuẩn hóa văn bản tiếng Việt trước khi đưa vào Google Gemini TTS (Voice: PUCK)
 * - Giữ nguyên 100% nội dung gốc và dấu thanh tiếng Việt
 * - Mở rộng các từ viết tắt phổ biến trong hồ sơ / CSKH để tránh đọc đánh vần tiếng Anh sai quy tắc
 * - Chuẩn hóa ngày tháng, phần trăm, số điện thoại và dấu ngắt nghỉ tự nhiên
 */
export function preprocessVietnameseTtsText(rawText: string): string {
  if (!rawText) return '';

  let text = rawText
    // Loại bỏ ký hiệu markdown thừa nhưng giữ nguyên dấu câu
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[•●▪▸►\-*]\s*/gm, '')
    .replace(/\r\n/g, '\n');

  // Xử lý ngày tháng định dạng dd/mm/yyyy -> ngày dd tháng mm năm yyyy
  text = text.replace(
    /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g,
    'ngày $1 tháng $2 năm $3'
  );

  // Xử lý giai đoạn năm 2003 - 2026+ -> từ năm 2003 đến năm 2026
  text = text.replace(/\b(19\d{2}|20\d{2})\s*[-–—]\s*(19\d{2}|20\d{2})\+?/g, 'từ năm $1 đến năm $2');
  text = text.replace(/\b(20\d{2})\+/g, 'năm $1 trở đi');

  // Xử lý số phần trăm: 98% -> 98 phần trăm
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*%/g, '$1 phần trăm');

  // Xử lý thời gian: < 15p hoặc < 15 phút -> dưới 15 phút
  text = text.replace(/<\s*(\d+)\s*(phút|p|giây|s|giờ|h)\b/gi, (_, num, unit) => {
    const u = unit.toLowerCase();
    const unitWord = u === 'p' || u === 'phút' ? 'phút' : u === 's' || u === 'giây' ? 'giây' : 'giờ';
    return `dưới ${num} ${unitWord}`;
  });

  // Từ điển viết tắt tiếng Việt & thuật ngữ quản trị phổ biến (đọc đúng ngữ cảnh tiếng Việt)
  const abbreviations: Array<[RegExp, string]> = [
    [/\bTP\.\s*HCM\b/gi, 'Thành phố Hồ Chí Minh'],
    [/\bTPHCM\b/gi, 'Thành phố Hồ Chí Minh'],
    [/\bTP\.\s*Hồ Chí Minh\b/gi, 'Thành phố Hồ Chí Minh'],
    [/\bHN\b/g, 'Hà Nội'],
    [/\bĐBSCL\b/gi, 'Đồng bằng sông Cửu Long'],
    [/\bCSKH\b/gi, 'chăm sóc khách hàng'],
    [/\bDVKH\b/gi, 'dịch vụ khách hàng'],
    [/\bSĐT\b/gi, 'số điện thoại'],
    [/\bVNĐ\b/gi, 'Việt Nam đồng'],
    [/\bVND\b/gi, 'Việt Nam đồng'],
    [/\bTNHH\b/gi, 'Trách nhiệm hữu hạn'],
    [/\bCNTT\b/gi, 'Công nghệ thông tin'],
    [/\bQTKD\b/gi, 'Quản trị kinh doanh'],
    [/\b24\/7\b/g, 'hai mươi bốn trên bảy'],
    [/\b360°\b/g, 'ba trăm sáu mươi độ'],
  ];

  for (const [pattern, replacement] of abbreviations) {
    text = text.replace(pattern, replacement);
  }

  // Đảm bảo ngắt nghỉ tự nhiên theo dòng mới và dấu câu
  text = text
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return text;
}

/**
 * Xây dựng chỉ dẫn phong cách phát âm cho giọng PUCK (Miền Tây Nam Bộ - vi-VN)
 */
function buildMekongDeltaStyleDirective(
  speakingStyle: PuckSpeakingStyle,
  speakingRate: number,
  pitch: PuckPitchPreset
): string {
  const styleDesc =
    speakingStyle === 'professional'
      ? 'Professional narration, executive presentation, articulate, trustworthy, warm and respectful'
      : speakingStyle === 'narration'
      ? 'Expressive storytelling narration, soulful, smooth, warm, clear sentence intonation and natural pauses'
      : 'Natural conversation, friendly, warm, approachable, sincere and open-hearted';

  const rateDesc =
    speakingRate < 0.96
      ? 'Slightly relaxed, calm speaking pace (around 0.95x)'
      : speakingRate > 1.03
      ? 'Slightly brisk, energetic yet clear speaking pace (around 1.05x)'
      : 'Balanced, natural conversational speaking rate (1.0x)';

  const pitchDesc =
    pitch === 'low'
      ? 'Mature male baritone, warm low-mid pitch, steady and grounded'
      : pitch === 'warm'
      ? 'Warm, gentle, resonant male mid-range pitch'
      : 'Natural mature male mid-low pitch (nam trung trầm tự nhiên)';

  return [
    'Language: Vietnamese (vi-VN).',
    'Regional Accent: Southern Vietnamese – Mekong Delta (giọng nam Miền Tây Nam Bộ tự nhiên, ấm áp, thân thiện, gần gũi, chân thành).',
    'Pronunciation Rules: Pronounce every Vietnamese word and tone mark clearly without swallowing words (không nuốt chữ). Soft, melodic Southern Vietnamese intonation (ngữ điệu mềm mại đặc trưng Nam Bộ, không dùng giọng Bắc, không dùng giọng Trung, không cường điệu phương ngữ quá mức để người nghe cả ba miền đều hiểu rõ).',
    `Speaking Style: ${styleDesc}.`,
    `Pace & Intonation: ${rateDesc}. ${pitchDesc}. Pause naturally at commas and periods, emphasize key meaningful words, never sound robotic or monotone.`,
  ].join(' ');
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra khóa API trong phần Settings > Secrets.',
        },
        { status: 500 }
      );
    }

    const body = (await req.json()) as TtsRequestBody;
    const rawText = (body.text || '').trim();

    if (!rawText) {
      return NextResponse.json(
        { error: 'Vui lòng nhập nội dung văn bản tiếng Việt cần tạo giọng đọc.' },
        { status: 400 }
      );
    }

    if (rawText.length > 4000) {
      return NextResponse.json(
        { error: 'Văn bản quá dài (tối đa 4.000 ký tự mỗi lần tạo giọng đọc).' },
        { status: 400 }
      );
    }

    const speakingStyle: PuckSpeakingStyle = body.speakingStyle || 'friendly';
    const speakingRate = Math.min(1.15, Math.max(0.85, Number(body.speakingRate) || 1.0));
    const pitch: PuckPitchPreset = body.pitch || 'natural';

    const processedText = preprocessVietnameseTtsText(rawText);
    const styleDirective = buildMekongDeltaStyleDirective(speakingStyle, speakingRate, pitch);

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Luôn sử dụng cố định giọng PUCK trên Google Gemini TTS (không thay thế bằng giọng khác)
    const VOICE_NAME = 'Puck';
    const modelsToTry = ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts'];
    let base64Audio: string | undefined;
    let mimeType = 'audio/wav';
    let usedModel = modelsToTry[0];
    let lastError: unknown = null;

    for (const modelName of modelsToTry) {
      try {
        usedModel = modelName;
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: processedText,
                  speechMetadata: {
                    style: styleDirective,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: VOICE_NAME,
                },
              },
            },
          },
        });

        const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (inlineData?.data) {
          base64Audio = inlineData.data;
          if (inlineData.mimeType) {
            mimeType = inlineData.mimeType;
          }
          break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!base64Audio) {
      const errMsg =
        lastError instanceof Error
          ? lastError.message
          : 'Không nhận được dữ liệu âm thanh từ Google Gemini TTS.';
      return NextResponse.json(
        {
          error: `Không thể tạo giọng đọc PUCK từ Google Gemini TTS: ${errMsg}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      audioBase64: base64Audio,
      mimeType: mimeType.includes('wav') ? 'audio/wav' : mimeType,
      voiceName: 'PUCK',
      model: usedModel,
      language: 'vi-VN',
      accent: 'Southern Vietnamese – Mekong Delta (Miền Tây Nam Bộ)',
      speakingStyle,
      speakingRate,
      pitch,
      processedText,
      accentLimitationNote:
        'PUCK là giọng tổng hợp có sẵn của Google Gemini TTS. Hệ thống giữ nguyên giọng PUCK gốc kết hợp chỉ dẫn phát âm tiếng Việt Nam Bộ (ưu tiên âm sắc Miền Tây Nam Bộ ấm áp, gần gũi) thông qua speechMetadata; API không có mã vùng phương ngữ Miền Tây độc lập.',
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Lỗi máy chủ khi xử lý yêu cầu Text-to-Speech.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
