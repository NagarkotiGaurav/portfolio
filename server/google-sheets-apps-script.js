/**
 * Paste into Google Sheets → Extensions → Apps Script, then Deploy → Web app.
 * Execute as: Me | Who has access: Anyone
 *
 * Optional: Script property WEBHOOK_SECRET = GOOGLE_SHEETS_WEBHOOK_SECRET
 *
 * Columns:
 * Lead ID | Timestamp | Name | Email | Phone | Company | Industry | Project |
 * Budget | Timeline | Message | Source | Status
 */
function doPost(e) {
  try {
    const secret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET')
    const raw = e.postData && e.postData.contents ? e.postData.contents : '{}'
    const data = JSON.parse(raw)

    if (secret && data.secret !== secret) {
      return json_({ ok: false, error: 'Unauthorized' })
    }

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads') ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads')

    ensureHeader_(sheet)

    sheet.appendRow([
      data.id || '',
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.industry || '',
      data.projectType || '',
      data.budget || '',
      data.timeline || '',
      data.message || '',
      data.source || 'website',
      data.status || 'New',
    ])

    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function doGet() {
  return json_({ ok: true, service: 'portfolio-leads' })
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return
  sheet.appendRow([
    'Lead ID',
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Company',
    'Industry',
    'Project',
    'Budget',
    'Timeline',
    'Message',
    'Source',
    'Status',
  ])
  sheet.getRange(1, 1, 1, 13).setFontWeight('bold')
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
