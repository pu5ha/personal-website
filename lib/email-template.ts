import { BlogPost } from './blog';

function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.+)$/gm, '<h3 style="color:#ffffff;font-size:18px;margin:24px 0 12px;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#ffffff;font-size:22px;margin:28px 0 14px;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="color:#ffffff;font-size:26px;margin:32px 0 16px;">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#ffffff;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#00ff96;text-decoration:underline;">$1</a>')
    // Line breaks into paragraphs
    .replace(/\n\n/g, '</p><p style="color:#e0e0e0;line-height:1.8;margin:0 0 16px;">')
    .replace(/\n/g, '<br/>');
}

export function renderPostToEmailHtml(post: BlogPost, postUrl: string): string {
  const preview = post.content.slice(0, 2000);
  const previewHtml = markdownToHtml(preview);
  const isTruncated = post.content.length > 2000;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px;border-bottom:2px solid #00ff96;">
              <a href="${postUrl}" style="color:#ffffff;font-size:14px;font-family:'Courier New',monospace;text-decoration:none;">
                Jason Chaskin
              </a>
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td style="padding:32px 0 8px;">
              <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0;font-family:'Courier New',monospace;">
                ${post.title}
              </h1>
            </td>
          </tr>
          <!-- Date -->
          <tr>
            <td style="padding:0 0 32px;">
              <span style="color:#888888;font-size:14px;font-family:'Courier New',monospace;">
                ${post.date}
              </span>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:0 0 32px;">
              <p style="color:#e0e0e0;line-height:1.8;margin:0 0 16px;">
                ${previewHtml}${isTruncated ? '...' : ''}
              </p>
            </td>
          </tr>
          <!-- CTA Button -->
          <tr>
            <td style="padding:16px 0 48px;" align="center">
              <a href="${postUrl}" style="display:inline-block;padding:14px 32px;background:transparent;color:#00ff96;border:2px solid #00ff96;border-radius:6px;font-size:16px;font-weight:600;text-decoration:none;font-family:'Courier New',monospace;">
                Read the full post
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;border-top:1px solid #222222;">
              <p style="color:#666666;font-size:12px;line-height:1.6;margin:0;">
                You received this because you subscribed to Jason Chaskin's blog.<br/>
                <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#888888;text-decoration:underline;">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
