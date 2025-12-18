<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class QuizController extends Controller
{
    /**
     * API sinh quiz từ OpenAI
     */
    public function generateQuiz(Request $request)
    {
        // 1. Validate dữ liệu từ frontend
        $request->validate([
            'questionCount' => 'required|integer|min:1|max:20',
            'topic' => 'required|string',
            'subTopic' => 'nullable|string',
            'level' => 'required|string',
        ]);

        $questionCount = $request->input('questionCount');
        $topic = $request->input('topic');
        $subTopic = $request->input('subTopic', '');
        $level = $request->input('level');

        // 2. Tạo prompt
        $prompt = "
Bạn là một hệ thống tạo câu hỏi trắc nghiệm.

Hãy tạo chính xác {$questionCount} câu hỏi trắc nghiệm bằng tiếng Việt
về chủ đề {$topic} / {$subTopic}, phù hợp với trình độ {$level}.

YÊU CẦU BẮT BUỘC:
- Chỉ trả về JSON thuần (plain JSON)
- KHÔNG thêm giải thích, markdown, hoặc văn bản ngoài JSON
- KHÔNG dùng ```json
- Mỗi câu hỏi có đúng 4 đáp án
- Trường \"answer\" phải trùng khớp CHÍNH XÁC với 1 giá trị trong \"options\"
- Nếu JSON chưa hợp lệ, hãy tự sửa và chỉ trả lại JSON hợp lệ

Cấu trúc JSON phải đúng như sau:
{
  \"quizMeta\": {
    \"topic\": \"{$topic}\",
    \"subTopic\": \"{$subTopic}\",
    \"level\": \"{$level}\",
    \"questionCount\": {$questionCount}
  },
  \"questions\": [
    {
      \"id\": 1,
      \"questionText\": \"Câu hỏi...\",
      \"options\": [\"A\", \"B\", \"C\", \"D\"],
      \"answer\": \"A\",
      \"explanation\": \"Giải thích ngắn gọn\"
    }
  ]
}
";

        Log::info('OpenAI Prompt', ['prompt' => $prompt]);

        // 3. Gọi OpenAI API
        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->timeout(60)
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'system', 'content' => 'Bạn là một AI tạo câu hỏi trắc nghiệm.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'temperature' => 0.5,
            ]);

        if (!$response->successful()) {
            Log::error('OpenAI API error', ['response' => $response->body()]);

            return response()->json([
                'error' => 'Không gọi được OpenAI API'
            ], 500);
        }

        // 4. Lấy raw content từ OpenAI
        $content = $response->json('choices.0.message.content');
        Log::info('OpenAI raw response', ['content' => $content]);

        // 5. Extract JSON an toàn
        $quizData = $this->extractJson($content);

        // 6. Fallback nếu JSON lỗi
        if (!$quizData || !isset($quizData['questions'])) {
            return response()->json([
                'quizMeta' => [
                    'topic' => $topic,
                    'subTopic' => $subTopic,
                    'level' => $level,
                    'questionCount' => $questionCount,
                ],
                'questions' => [],
                'error' => 'AI không trả về JSON hợp lệ',
            ], 500);
        }

        // 7. Validate số câu hỏi
        if (count($quizData['questions']) !== $questionCount) {
            Log::warning('Số câu hỏi không đúng', [
                'expected' => $questionCount,
                'actual' => count($quizData['questions'])
            ]);
        }

        return response()->json($quizData);
    }

    /**
     * Hàm extract JSON từ text (FIX lỗi questions rỗng)
     */
    private function extractJson(string $text): ?array
    {
        $start = strpos($text, '{');
        $end = strrpos($text, '}');

        if ($start === false || $end === false) {
            return null;
        }

        $json = substr($text, $start, $end - $start + 1);
        $decoded = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('JSON decode error', [
                'error' => json_last_error_msg(),
                'json' => $json
            ]);
            return null;
        }

        return $decoded;
    }
}
