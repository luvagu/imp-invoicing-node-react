const date = new Date()
const docDate = date.toLocaleString('es-EC')

// export const initialProduct = {
//   description: '',
//   quantity: '',
//   price: '',
//   discount: '',
//   total: ''
// }

export const paymentTerms = [
  'Efectivo',
  'Efectivo y Retencion',
  'Cheque',
  'Cheque y Retencion',
  'Tarjeta',
  'Transferencia',
  'Transferencia y Retencion',
  'Deposito',
  'Deposito y Retencion',
  'Credito',
  'Credito y Retencion',
  'Nota Credito'
]

export const initialDocInfo = {
  companyID: 'RUC: 1792673844001',
  companyName: 'IMPORPERNOS S.C.C.',
  companyAddress: 'Av. De La Prensa N44-72',
  companyAddress2: 'Quito - Ecuador',
  companyTelephone: 'Telf: 02-2430-658',
  companyEmail: 'Email: ventas@imporpernos.com',

  currency: '$',

  docType: 'Factura', // @todo set it from the component title
  docDateLabel: 'Fecha Emision',
  docNumLabel: 'Factura No.',
  docDate: docDate,
  docNum: '', // @Todo get it from backend at runtime or set it on doc save
  docSubtotal: 0,
  docDiscount: 0,
  docTax: 0,
  docTotal: 0,
  
  clientDetailsLabel: 'Datos Cliente:',
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

  products: [{ code: '45445343', description: 'dsfsdf dsfs df dsfsd', quantity: 2000, price: 1.2255, discount: 10, total: 325.14 }, { code: '45445343', description: 'dsfsdf dsfs df dsfsd', quantity: 2000, price: 1.2255, discount: 10, total: 325.14 }, { code: '45445343', description: 'dsfsdf dsfs df dsfsd', quantity: 2000, price: 1.2255, discount: 10, total: 325.14 }],

  subTotalLabel: 'Subtotal',
  discountLabel: 'Descuento',
  taxLabel: 'IVA (12%)',
  totalLabel: 'Valor Total',
  notesLabel: 'Notas',
  paymentTermsLabel: 'Forma de pago',

  notes: '',
  paymentTerms: ''
}