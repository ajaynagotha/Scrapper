var config = require('./Gconfig')
const SHEET_ID = '1OkPqIN5lDv0-kLcWss1kiTStsNK1f5bYtuavC320fbE'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(config.SHEET_ID);

const GSheet = async (req, res) => {
  console.log("hello");
  await doc.useServiceAccountAuth({
    client_email: config.CLIENT_EMAIL,
    private_key: config.PRIVATE_KEY
  })
    .then((res) => {
      console.log("res", res)
    })
    .catch((err) => {
      console.log({ message: "Google Authentication failed" })
    });
  await doc.loadInfo();
  const Sheet = await doc.sheetsByIndex[0];
  const rename = await doc.updateProperties({ title: "Freelancer.com" })
  const firstRow = await Sheet.setHeaderRow(['TimeStamp', 'Job_Title', 'Job_Description', 'Budget', 'Skills', 'Job_link'])
  var d = new Date()
  var date = d.toLocaleString()
  console.log(req.body.data[0])
  const rows = await Sheet.addRows(req.body.data)
  const brow = await Sheet.addRow({ TimeStamp: '--------' })
  const row = await Sheet.getRows()
  res.json({ success: true })
}
module.exports = GSheet
