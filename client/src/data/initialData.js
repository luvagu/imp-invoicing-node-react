export const initialDocInfo = {
	companyID: 'RUC: 1792673844001',
	companyName: 'IMPORPERNOS S.C.C.',
	companyAddress: 'Av. De La Prensa N44-72',
	companyAddress2: 'Quito - Ecuador',
	companyTelephone: 'Telf: 02-2430-658',
	companyEmail: 'Email: ventas@imporpernos.com',

	currencySymbol: '$',

	docType: '',
	docNum: '',
	docDate: '',
	docPaymentMethod: '',
	docSubtotal: '0.00',
	docDiscount: '0.00',
	docTaxRate: '12',
	docTaxAmount: '0.00',
	docTotal: '0.00',
	docNotes: '',

	clientData: {
		id: '',
		name: '',
		address: '',
		phone: '',
		email: '',
	},

	productsList: [],

	clientDetailsLabel: 'Datos Cliente:',
	clientIdLabel: 'CI / RUC:',
	clientNameIdLabel: 'Nombre:',
	clientAddressLabel: 'Dir:',
	clientPhoneLabel: 'Tel:',
	clientEmailLabel: 'Correo:',

	docDateLabel: 'Fecha de Emision',
	paymentMethodLabel: 'Forma de Pago',

	productDescriptionLabel: 'Descripcion',
	productQuantityLabel: 'Cantidad',
	productPriceLabel: 'P.Unit',
	productDiscounyRateLabel: 'Dcto. %',
	productTotalAmountLabel: 'P.Total',

	subTotalLabel: 'Subtotal',
	discountLabel: 'Descuento',
	taxLabel: 'IVA (12%)',
	totalLabel: 'Valor Total',
	notesLabel: 'Notas',
}

export const paymentMethods = [
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
	'Otra',
]
