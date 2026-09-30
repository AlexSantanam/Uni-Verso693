// Local check for api/audit.ts: `npx tsx --env-file=.env scripts/try-audit.ts <url>`
// Calls Claude for real (costs a few cents); sends no email.
import { runAudit, AuditError } from '../api/audit';

const blocked = ['http://localhost:4890', 'http://127.0.0.1', 'http://192.168.1.1', 'file:///etc/passwd', 'http://metadata.google.internal'];
for (const u of blocked) {
  try {
    await runAudit(u);
    console.log('NOT BLOCKED (bug):', u);
  } catch (e) {
    console.log('blocked ok:', u, '->', e instanceof AuditError ? e.message : String(e));
  }
}

const target = process.argv[2];
if (target) {
  const t0 = Date.now();
  const { url, report } = await runAudit(target);
  console.log(`\n${url} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(JSON.stringify(report, null, 2));
}
