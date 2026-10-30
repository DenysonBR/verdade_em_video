/*
 * Verdade em Vídeo — análise preliminar, e SOMENTE para URLs públicas do YouTube.
 * Esta integração usa o SDK oficial Firebase AI Logic e App Check:
 * https://firebase.google.com/docs/ai-logic/get-started
 * https://firebase.google.com/docs/ai-logic/analyze-video
 * Nunca coloque uma API KEY secreta do Gemini neste repositório.
 */
const $ = (selector) => document.querySelector(selector);
const form = $('#link-form');
const box = $('#ai-real-result');
const title = $('#ai-real-title');
const status = $('#ai-real-status');
const output = $('#ai-real-output');
const firebaseConf = window.VERDADE_FIREBASE || {};
const siteKey = window.VERDADE_RECAPTCHA_SITE_KEY || '';
const configured = firebaseConf.apiKey && firebaseConf.projectId && firebaseConf.appId &&
  !Object.values(firebaseConf).some(v => typeof v === 'string' && v.includes('COLE_AQUI')) &&
  siteKey && !siteKey.includes('COLE_AQUI');

function parseYouTubeLink(raw) {
  let u;
  try {u = new URL(raw)} catch {return null}
  if (u.protocol !== 'https:' || u.username || u.password) return null;
  const host = u.hostname.toLowerCase();
  let id = null;
  if (host === 'youtu.be' || host === 'www.youtu.be') {
    id = u.pathname.slice(1).split('/')[0];
  } else if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
    if (u.pathname === '/watch') id = u.searchParams.get('v');
    else if (/^\/(shorts|live|embed)\//.test(u.pathname)) id = u.pathname.split('/')[2];
  }
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
  return `https://www.youtube.com/watch?v=${id}`;
}
function show(message, text = '') {
  box.style.display = 'block';
  status.textContent = message;
  output.textContent = text;
}
function promptForVideo(claim) {
  return `Você é um assistente de educação midiática. Avalie o VÍDEO efetivamente fornecido com esta mensagem, incluindo áudio e imagens, e escreva em português brasileiro simples.
  ${claim ? `A afirmação do compartilhamento é: ${claim.slice(0, 600)}. Trate-a como alegação NÃO confirmada.` : 'Nenhuma alegação específica foi fornecida.'}
  REGRAS: 1) Não invente cenas, áudio, timestamps, fontes ou pesquisas externas. Se não conseguiu ler o vídeo, diga claramente que não foi possível. 2) Separe o que foi OBSERVADO no vídeo daquilo que é suposição. 3) Sinais visuais ou sonoros não bastam para provar deepfake; artefatos podem ser compressão. 4) Não afirme 'verdadeiro' apenas porque o vídeo parece natural; nem 'falso' apenas porque é estranho. 5) Não declare ter consultado notícias ou fontes externas se não consultou. 6) Só dê exemplos de timestamps se tiver acesso real aos quadros correspondentes.
  FORMATO:
  O QUE O VÍDEO MOSTRA: [resumo factual daquilo que foi observado]
  SINAIS OBSERVADOS: [indícios de edição ou falta de indícios claros, sem certeza excessiva]
  AVALIAÇÃO PRELIMINAR: [Escolha uma: 'Há sinais que merecem investigação' / 'Não observei sinais claros de manipulação' / 'Análise inconclusiva'. Justifique.]
  SOBRE A ALEGAÇÃO: [indique se há evidências suficientes para confirmar data, local, autoria e narrativa; normalmente a resposta será não sem fontes externas]
  COMO CONFERIR: [2 a 4 medidas práticas]
  LIMITAÇÕES: [diga claramente o que não foi possível verificar].
  Limite de 250 palavras. Não atribua porcentagens de autenticidade.`;
}
let modelPromise;
async function getModel() {
  if (modelPromise) return modelPromise;
  modelPromise = (async () => {
    const [appMod, checkMod, aiMod] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app-check.js'),
      import('https://www.gstatic.com/firebasejs/12.4.0/firebase-ai.js')
    ]);
    const app = appMod.initializeApp(firebaseConf);
    checkMod.initializeAppCheck(app, {
      provider: new checkMod.ReCaptchaEnterpriseProvider(siteKey),
      isTokenAutoRefreshEnabled: true
    });
    const ai = aiMod.getAI(app, { backend: new aiMod.GoogleAIBackend() });
    return aiMod.getGenerativeModel(ai, { model: 'gemini-3.5-flash-lite' });
  })();
  return modelPromise;
}
let sequence = 0;
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const current = ++sequence;
  const raw = $('#video-link').value.trim();
  const youtube = parseYouTubeLink(raw);
  if (!youtube) {
    show('Análise automática indisponível para esse endereço.', 'A análise real por IA nesta versão está disponível somente para vídeos públicos do YouTube e YouTube Shorts. Para outras plataformas, use as instruções de verificação que aparecem abaixo.');
    return;
  }
  if (!configured) {
    show('A análise por IA ainda não foi ativada pelo responsável pelo projeto.', 'O site consegue verificar o formato do link, mas não pode examinar o vídeo enquanto o Firebase AI Logic e o App Check não forem configurados. Leia o arquivo ATIVAR_IA_GRATIS.txt incluído no pacote. Nenhum resultado foi inventado.');
    return;
  }
  title.textContent = 'Analisando conteúdo do YouTube com Gemini';
  show('Solicitando análise de imagens e áudio…');
  try {
    const model = await getModel();
    const claim = $('#video-claim').value.trim();
    const response = await model.generateContent([
      { fileData: { fileUri: youtube, mimeType: 'video/mp4' } },
      { text: promptForVideo(claim) }
    ]);
    if (current !== sequence) return;
    const text = response?.response?.text?.() || '';
    if (!text.trim()) throw Error('A IA não retornou conteúdo analisável.');
    show('Análise preliminar concluída — não é prova de autenticidade.', text);
  } catch (err) {
    if (current !== sequence) return;
    const msg = String(err?.message || err);
    let guidance = 'Confira a configuração do Firebase AI Logic e do App Check e tente outro vídeo público do YouTube.';
    if (/quota|429|resource.exhausted/i.test(msg)) guidance = 'O limite gratuito foi atingido ou houve excesso de solicitações. Tente novamente em outra ocasião.';
    else if (/403|permission|app.check|recaptcha|unauthenticat/i.test(msg)) guidance = 'Confirme a configuração do App Check, a chave pública do reCAPTCHA Enterprise e o domínio do GitHub Pages.';
    else if (/404|not found|no access|unsupported|video/i.test(msg)) guidance = 'O vídeo pode não estar disponível para processamento. Confirme se é público e acessível.';
    show('Não foi possível analisar este vídeo.', guidance + '\n\nDetalhe técnico: ' + msg.slice(0, 380));
  }
});
form.addEventListener('reset', () => {sequence++;box.style.display='none';output.textContent='';});
