import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI from environment variable
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
} catch (err) {
  console.warn('GoogleGenAI initialization warning:', err);
}

// System instruction for disaster preparedness bot
const ASSISTANT_SYSTEM_INSTRUCTION = `
Sen "Afet Öncesi 60 Saniye" oyununun uzman afet hazırlık asistanısın (Kurtaran Asistan).
Adın: Kurtaran Bot.
Görevin: Kullanıcılara, öğrencilere ve ailelere DEPREM VE AFET ÖNCESİ HAZIRLIK, tehlike avı, afet çantası, aile buluşma planı ve sarsıntı anında doğru davranışlar (Çök-Kapan-Tutun) hakkında kısa, net, güvenilir, AFAD ve uluslararası afet yönetimi ilkelerine uygun Türkçe bilgi vermek.

ÖNEMLİ KURALLAR:
1. Deprem anında kesinlikle "merdivenlere koşun, asansöre binin, balkondan atlayın" gibi yanlış davranışları tavsiye etme! Sarsıntı anında sağlam bir nesnenin yanında veya altında ÇÖK-KAPAN-TUTUN yapılır.
2. Sarsıntı BİTTİKTEN sonra elektrik şalteri, su ve doğalgaz vanaları kapatılarak hazırlanan afet çantasıyla önceden belirlenen açık toplanma alanına tahliye olunur.
3. Yanıtların Türkçe, samimi, özendirici ve 2-4 kısa paragrafı geçmeyecek şekilde net ve maddeli olsun.
`;

// API: Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Geçersiz mesaj içeriği.' });
  }

  // If AI client is configured, call Gemini with safety timeout
  if (ai) {
    try {
      const response = await Promise.race([
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `Kullanıcı Sorusu: ${message}` }],
            },
          ],
          config: {
            systemInstruction: ASSISTANT_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI_TIMEOUT')), 5000)),
      ]) as any;

      const reply = response?.text?.trim();
      if (reply) {
        return res.json({ reply });
      }
    } catch (error: any) {
      console.warn('Gemini Chat call note:', error?.message || error);
    }
  }

  // Graceful smart fallback when offline or api limits reached
  const lower = message.toLowerCase();
  let fallbackReply = 'Deprem öncesinde evinizdeki dolapları L-demir ile sabitlemek, 72 saatlik afet çantası hazırlamak ve ailenizle açık bir toplanma alanı belirlemek hayat kurtarır!';
  if (lower.includes('toplanma') || lower.includes('nerede') || lower.includes('öğrenirim') || lower.includes('buluşma')) {
    fallbackReply = 'Afet toplanma alanınızı e-Devlet kapısı üzerinden AFAD "Acil Toplanma Alanı Sorgulama" hizmetiyle kolayca öğrenebilirsiniz. İkametgahınıza en yakın geniş park ve okul bahçeleri belirlenmiştir.';
  } else if (lower.includes('çanta') || lower.includes('canta')) {
    fallbackReply = 'Afet çantanızda ilk 72 saat için kişi başı günlük en az 1.5 litre su, düdük, pilli fener ve yedek piller, ilk yardım seti, dayanıklı konserve, önemli evrak fotokopileri ve reçeteli ilaçlar mutlaka bulunmalıdır. Mum ve çakmak gibi açık alevli eşyalardan gaz kaçağı riski nedeniyle kaçınılmalıdır.';
  } else if (lower.includes('sabitle') || lower.includes('tehlike') || lower.includes('dolap')) {
    fallbackReply = 'Depremlerde yaralanmaların %50\'den fazlası devrilen eşyalardan kaynaklanır. Kitaplıkları, gardıropları ve televizyonları L-braket ve dübellerle duvara sabitlemeli; yatak başlarındaki ağır tabloları kaldırmalı ve çıkış kapısının önünü daima açık tutmalıyız.';
  } else if (lower.includes('anında') || lower.includes('sırasında') || lower.includes('deprem anı')) {
    fallbackReply = 'Deprem sarsıntısı anında panikle koşulmaz, merdivenlere ve asansörlere gidilmez! Sağlam bir masa veya koltuk yanında ÇÖK-KAPAN-TUTUN pozisyonu alınır. Sarsıntı tamamen durduktan sonra gaz/elektrik vanaları kapatılıp güvenle bina terk edilir.';
  } else if (lower.includes('hayvan') || lower.includes('kedi') || lower.includes('köpek')) {
    fallbackReply = 'Evcil hayvanlarınız için afet çantasına en az 3-5 günlük kuru mama, taşınabilir su kabı, aşı kartı, tasma ve güvenli bir taşıma çantası/kutusu koymayı unutmayınız.';
  }

  return res.json({ reply: fallbackReply });
});

// API: Creative Studio Endpoint (Şiir, Aile Kartı, Senaryo, Slogan)
app.post('/api/creative', async (req, res) => {
  const { type, prompt } = req.body;

  let taskPrompt = '';
  if (type === 'poem') {
    taskPrompt = `Afet hazırlığı, deprem bilinci, eşyaları sabitleme ve afet çantası üzerine çocukların ve gençlerin kolayca ezberleyebileceği, umut aşılayan, eğitici 3-4 kıtalık harika bir Türkçe şiir yaz. Konu detayı: ${prompt || 'Afet Öncesi Hazırlık'}`;
  } else if (type === 'card') {
    taskPrompt = `Bir aile veya öğrenci için uygulanabilir, net bir "Aile Acil Durum & Afet Öncesi Plan Kartı" metni hazırla. İçinde: Aile İletişim Numaraları, Şehir Dışı İrtibat Kişisi, Buluşma Noktası (Mahalle Parkı), Afet Çantası Konumu ve Ev İçi Güvenli Çök-Kapan-Tutun Noktası bölümleri olsun. Detaylar: ${prompt || 'Örnek Aile Planı'}`;
  } else if (type === 'scenario') {
    taskPrompt = `Öğrenciler veya aileler için etkileşimli kısa bir afet öncesi hazırlık tatbikat senaryosu yaz. Durum: "${prompt || 'Akşam evde ailenizle otururken'}". Kullanıcıya ne yapması gerektiğini 3 adımda test ettir ve doğru hazırlık adımlarını açıkla.`;
  } else {
    taskPrompt = `Afet bilinci, deprem öncesi sabitleme ve afet çantası hakkında okullarda veya sosyal medyada paylaşılabilecek 5 adet vurucu, akılda kalıcı Türkçe slogan yaz. Detay: ${prompt || 'Afet Öncesi 60 Saniye'}`;
  }

  if (ai) {
    try {
      const response = await Promise.race([
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ text: taskPrompt }],
          config: {
            systemInstruction: 'Sen yaratıcı, ilham verici ve pedagojik standartlara tam uygun bir afet eğitmeni ve yazarsın.',
            temperature: 0.8,
          },
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI_TIMEOUT')), 5000)),
      ]) as any;

      const result = response?.text?.trim();
      if (result) {
        return res.json({ result });
      }
    } catch (err: any) {
      console.warn('Gemini Creative call note:', err?.message || err);
    }
  }

  // Fallback creative generation
  let fallbackContent = '';
  if (type === 'poem') {
    fallbackContent = `Deprem gelmeden önce,\nTedbirini al evde.\nDolapları duvara,\nSağlamca sabitle.\n\nÇantada su ve fener,\nDüdük sesini iletir.\nHazırlıklı bir yürek,\nKorkuyu bilgiyle yener!`;
  } else if (type === 'card') {
    fallbackContent = `📋 AİLE ACİL DURUM VE AFET PLANI\n--------------------------------\n• Ev İçi Güvenli Alan: Yatak odası ve salondaki sağlam baza/koltuk yanı (Çök-Kapan-Tutun)\n• Çıkış Güzergahı: Koridor ve kapı önü daima engelsiz\n• Afet Çantası Yeri: Giriş kapısına yakın, kolay erişilebilir dolap\n• Mahalle Buluşma Noktası: Barış Parkı Açık Alanı (Binalardan ve elektrik tellerinden uzak)\n• Şehir Dışı İletişim Kişisi: Ankara'daki Teyze (Yalnızca acil SMS ile)`;
  } else if (type === 'scenario') {
    fallbackContent = `🚨 SENARYO: Akşam evde otururken deprem sarsıntısı başladı!\n1. Adım: Panikle kapıya koşmayın, asansöre yönelmeyin.\n2. Adım: Sağlam bir masa veya koltuk yanında başınızı koruyarak ÇÖK-KAPAN-TUTUN yapın.\n3. Adım: Sarsıntı bittiğinde gaz vanasını ve şalteri kapatın, afet çantanızı alarak açık alana çıkın.`;
  } else {
    fallbackContent = `1. "Afet gelmeden 60 saniye, hayat boyu emniyet!"\n2. "Dolabı sabitle duvara, güvenle bak yarına!"\n3. "Çantan hazır olsun, aklın huzurla dolsun!"\n4. "Sarsıntıda Çök-Kapan-Tutun, panikten değil bilgiden güç bul!"\n5. "Önce tedbir, sonra huzur: Afet bilinci gelecektir!"`;
  }

  return res.json({ result: fallbackContent });
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
