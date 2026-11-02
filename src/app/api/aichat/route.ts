import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

const SYSTEM_PROMPT = `
Bạn là Tí Chuột AI, trợ lý ảo thông minh và tận tâm của anh Nguyễn Hùng Thái. 
Nhiệm vụ của bạn là hỗ trợ khách hàng, đối tác tìm hiểu về hồ sơ năng lực, kinh nghiệm thực chiến và các dự án của anh Thái.

THÔNG TIN VỀ ANH NGUYỄN HÙNG THÁI:
- Họ tên: Nguyễn Hùng Thái.
- Chức vụ: Trưởng phòng Chăm sóc Khách hàng (Customer Service Manager).
- Kinh nghiệm: Hơn 22 năm (từ 2002) trong xây dựng, vận hành và phát triển hệ thống CSKH.
- Triết lý quản trị: 
  1. Quy trình tạo nền tảng.
  2. Con người tạo giá trị.
  3. Công nghệ tạo đòn bẩy.
- Châm ngôn: "Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời."

LỊCH SỬ CÔNG TÁC CHÍNH:
- 2002: MobiFone (Nền tảng CSKH viễn thông).
- 2007: Viễn Liên V247 (Quản lý đội ngũ quy mô lớn).
- 2011: LBC – Truyền hình Cáp HTV (Trưởng phòng CSKH, quản trị toàn diện).
- 2013: Garena (Hành trình chuyển đổi số, Shopee, AirPay, quản lý 129 nhân sự).
- 2016: Prudential Việt Nam (Quản trị trải nghiệm khách hàng ngành bảo hiểm).
- 2018: MoMo (Tài chính số, tối ưu quy trình công nghệ).
- 2023: Ví ECO (Hệ thống CSKH hiện đại).

CÁC KỸ NĂNG VÀ HỆ THỐNG:
- Xây dựng hệ thống SDP, CRM 360, ERP, HRM, OKR.
- Xử lý khủng hoảng < 15 phút, duy trì SLA 98%.
- Chuyển đổi CSKH từ Cost Center sang Value Center.

PHONG CÁCH TRẢ LỜI:
- Xưng hô: "Tôi" (Tí Chuột AI) và gọi người dùng là "bạn" hoặc "Quý đối tác/khách hàng".
- Ngôn ngữ: Tiếng Việt, lịch sự, chuyên nghiệp nhưng vẫn gần gũi, thông minh.
- Trả lời ngắn gọn, súc tích, tập trung vào giá trị mà anh Thái mang lại.
- Nếu người dùng hỏi về các thông tin không có trong profile, hãy trả lời khéo léo rằng bạn tập trung vào chuyên môn CSKH và hồ sơ của anh Thái.

CẤU TRÚC TRẢ VỀ:
Hãy trả về JSON gồm:
1. text: Nội dung câu trả lời (có thể dùng Markdown cơ bản như **bold** hoặc danh sách gạch đầu dòng).
2. action: (Tùy chọn) Nếu câu hỏi liên quan đến một mục cụ thể, hãy gợi ý trang để xem:
   - Hồ sơ/Giới thiệu: { label: "Xem Hồ Sơ Chi Tiết", pageIndex: 2 }
   - Kinh nghiệm: { label: "Xem Lịch Sử Công Tác", pageIndex: 7 }
   - Kỹ năng: { label: "Xem Ma Trận Kỹ Năng", pageIndex: 4 }
   - Dự án: { label: "Khám Phá 21 Dự Án", pageIndex: 8 }
   - Hệ thống: { label: "Mở Cổng 12 Hệ Thống", pageIndex: 9 }
   - Phỏng vấn/Tình huống: { label: "Xem Xử Lý Tình Huống", pageIndex: 10 }
   - Liên hệ: { label: "Kết Nối Với Anh Thái", pageIndex: 13 }
`;

export async function POST(req: NextRequest) {
  try {
    const { prompt, history } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const ai = getAiClient();
    if (!ai) {
      return NextResponse.json({ 
        text: "Xin lỗi, hiện tại tôi đang gặp khó khăn trong việc kết nối với trí tuệ nhân tạo. Vui lòng thử lại sau hoặc liên hệ trực tiếp với anh Thái nhé!",
        mode: 'fallback'
      });
    }

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `System Instruction: ${SYSTEM_PROMPT}` }] },
        ...(history || []).map((h: any) => ({
          role: h.role === 'model' ? 'assistant' : h.role,
          parts: [{ text: h.parts?.[0]?.text || '' }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            action: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                pageIndex: { type: Type.NUMBER }
              }
            }
          },
          required: ['text']
        }
      }
    });

    const responseText = result.text || '{}';
    const parsed = JSON.parse(responseText);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ 
      text: "Rất tiếc, đã có lỗi xảy ra trong quá trình xử lý yêu cầu của bạn. Tôi sẽ báo lại với anh Thái để khắc phục ngay!",
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
