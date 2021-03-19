const date = new Date()
const docDate = date.toLocaleString('es-EC')

export const initialProductLine = {
  description: '',
  quantity: '1',
  rate: '0.00'
}

export const initialDocInfo = {
  docTypeTitle: '', // @todo set it from the component title
  docDateLabel: 'Fecha Emision',
  docNumLabel: 'Factura No.',
  docDate: docDate,
  docNum: '', // @Todo get it from backend at runtime or set it on doc save
  companyID: 'RUC: 1792673844001',
  companyName: 'IMPORPERNOS S.C.C.',
  companyAddress: 'Av. De La Prensa N44-72',
  companyAddress2: 'Quito - Ecuador',
  companyTelephone: 'Telf: 02-2430-658',
  companyEmail: 'Email: ventas@imporpernos.com',
  billTo: 'Datos Cliente:',
  clientName: '',
  clientAddress: '',
  clientId: '',
  clientEmail: '',
  clientPhone: '',
  productDescriptionLabel: 'Descripcion',
  productQuantityLabel: 'Cantidad',
  productPriceLabel: 'P.Unit',
  productDiscounyLabel: 'Dcto. %',
  productTotalAmountLabel: 'P.Total',
  products: [],
  subTotalLabel: 'Subtotal',
  discountLabel: 'Descuento',
  taxLabel: 'IVA (12%)',
  totalLabel: 'Valor Total',
  currency: '$',
  notesLabel: 'Notas',
  notes: '',
  termLabel: 'Forma de pago',
  term: ''
}