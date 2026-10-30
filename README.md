# Verdade em Vídeo — Site educativo com IA opcional

Site gratuito para GitHub Pages com cartilha, quiz educativo, diário de extensão e análise preliminar por Gemini de vídeos públicos do YouTube **após configurar o Firebase AI Logic**.

## Publicar
Extraia os arquivos do ZIP e envie os arquivos (não o ZIP) para a raiz do repositório público no GitHub. Em Settings > Pages selecione Deploy from a branch, `main`, `/(root)`.

## Ligar a IA
Leia **ATIVAR_IA_GRATIS.txt** e preencha **firebase-config.js** com a configuração pública de seu aplicativo Firebase e a chave pública do App Check reCAPTCHA Enterprise. Não inclua nenhuma chave secreta no GitHub.

Sem essa ativação, a página continua sendo um material educativo; **não analisa o conteúdo dos vídeos**. Para plataformas que não são YouTube, há apenas checagem de endereço e orientação externa. Os resultados da IA são hipóteses, não uma certificação de verdade/falsidade.

## Conteúdo
- `index.html`: site estático e quiz.
- `ai-video.js`: integração Firebase AI Logic com Gemini e mensagens de erro.
- `firebase-config.js`: campos públicos a preencher.
- `Kit_Oficina_Verdade_em_Video.pdf`: material educativo.
- `QRCode_Google_Lens.png`: QR Code para ferramenta externa.
- `ATIVAR_IA_GRATIS.txt`: configuração e limites.
