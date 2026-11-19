# Noor Sky Visa Experts — Cloudflare Pages package

## Files
- `index.html` — responsive website, country cards, enquiry form, checklist, passport services and AI chat interface.
- `assets/noorsky-logo.jpeg` — your supplied Noor Sky logo, used in the header and footer.
- `functions/api/chat.js` — server-side AI endpoint at `/api/chat`. Keeps the API key out of browser code.

## Deploy on Cloudflare Pages
1. Upload/push the contents of this folder to the GitHub repository connected to your Cloudflare Pages project. Keep the `functions` folder at the project root (same level as `index.html`).
2. In Cloudflare Dashboard, open **Workers & Pages → your Pages project → Settings → Variables and Secrets**.
3. Add a secret named `OPENAI_API_KEY` and paste your OpenAI API key. Never put this key in `index.html`.
4. Optional: add a variable `OPENAI_MODEL` with a model available to your OpenAI account. The default in the function is `gpt-4o-mini`.
5. Trigger a new deployment. Cloudflare Pages Functions are deployed with the Pages project; do not upload only the HTML file.
6. Test `https://your-domain/api/chat` by opening the website chat and sending a message. If the function is not deployed, check that `functions/api/chat.js` is in the root `functions/api/` folder and the project is deployed through Pages with Functions support.

## Important
- OpenAI API usage is billed separately from ChatGPT subscriptions. Add billing/usage limits in your API account before enabling public access.
- The AI is general guidance, not official immigration advice. Country checklists on the page are explicitly preliminary and must be verified with the relevant official authority.
- Enquiry buttons open WhatsApp or the visitor's email application. WhatsApp still requires the visitor to press Send; `mailto:` requires an email app configured on their device.
- Your supplied Noor Sky logo is included at `assets/noorsky-logo.jpeg` and displayed in the website header and footer.
- Confirm all listed service fees and terms before publishing.
