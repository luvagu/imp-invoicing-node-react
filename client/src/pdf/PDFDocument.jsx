import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer'
import compose from './styles/compose'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
	{ src: '/fonts/Roboto-Bold.ttf', fontWeight: 700 }
  ],
})

export default function PDFDocument({ data }) {
	return (
		<Document>

			<Page size="A4" style={compose('page')}>

				<View style={compose('view flex')}>

					<View style={compose('view w-50')}>
						<Text style={compose('span fs-16 bold')}>{data.companyName}</Text>
						<Text style={compose('span')}>{data.companyID}</Text>
						<Text style={compose('span')}>{data.companyAddress}</Text>
						<Text style={compose('span')}>{data.companyAddress2}</Text>
						<Text style={compose('span')}>{data.companyTelephone}</Text>
						<Text style={compose('span')}>{data.companyEmail}</Text>
					</View>

					<View style={compose('view w-50')}>

						<Image style={compose('logo right mb-10')} src="/img/imp_pdf_logo.jpg" />

						<View style={compose('view flex mb-5')}>
							<View style={compose('view w-40')}>
								<Text style={compose('span bold')}>{data.docType} No.</Text>
							</View>

							<View style={compose('view w-60')}>
								<Text style={compose('span')}>{data.docNum || 'Autogenerado'}</Text>
							</View>
						</View>

            			<View style={compose('view flex mb-5')}>
							<View style={compose('view w-40')}>
								<Text style={compose('span bold')}>{data.docDateLabel}</Text>
							</View>

							<View style={compose('view w-60')}>
								<Text style={compose('span')}>{data.docDate}</Text>
							</View>
						</View>

					</View>

				</View>

				<View style={compose('view flex mt-20')}>

					<View style={compose('view w-100')}>
						<View style={compose('view flex')}>
							<View style={compose('view w-20')}>
								<Text style={compose('span bold')}>{data.clientIdLabel}</Text>
							</View>
							<View style={compose('view w-80')}>
								<Text style={compose('span')}>{data.clientData.id}</Text>
							</View>
						</View>

						<View style={compose('view flex')}>
							<View style={compose('view w-20')}>
								<Text style={compose('span bold')}>{data.clientNameIdLabel}</Text>
							</View>
							<View style={compose('view w-80')}>
								<Text style={compose('span')}>{data.clientData.name}</Text>
							</View>
						</View>

						<View style={compose('view flex')}>
							<View style={compose('view w-20')}>
								<Text style={compose('span bold')}>{data.clientAddressLabel}</Text>
							</View>
							<View style={compose('view w-80')}>
								<Text style={compose('span')}>{data.clientData.address}</Text>
							</View>
						</View>

						<View style={compose('view flex')}>
							<View style={compose('view w-20')}>
								<Text style={compose('span bold')}>{data.clientEmailLabel}</Text>
							</View>
							<View style={compose('view w-80')}>
								<Text style={compose('span')}>{data.clientData.email}</Text>
							</View>
						</View>

						<View style={compose('view flex')}>
							<View style={compose('view w-20')}>
								<Text style={compose('span bold')}>{data.clientPhoneLabel}</Text>
							</View>
							<View style={compose('view w-80')}>
								<Text style={compose('span')}>{data.clientData.phone}</Text>
							</View>
						</View>
					</View>

        		</View>

				<View style={compose('view mt-20 bg-dark flex')}>

					<View style={compose('view w-40 p-4-8')}>
						<Text style={compose('span white bold')}>{data.productDescriptionLabel}</Text>
					</View>

					<View style={compose('view w-15 p-4-8')}>
						<Text
							style={compose('span white bold right')}>{data.productQuantityLabel}</Text>
					</View>

					<View style={compose('view w-15 p-4-8')}>
						<Text style={compose('span white bold right')}>{data.productPriceLabel}</Text>
					</View>

					<View style={compose('view w-15 p-4-8')}>
						<Text
							style={compose('span white bold right')}>{data.productDiscounyRateLabel}</Text>
					</View>

          			<View style={compose('view w-15 p-4-8')}>
						<Text
							style={compose('span white bold right')}>{data.productTotalAmountLabel}</Text>
					</View>

				</View>

				{data.productsList?.map((product, i) => (
					<View key={i} style={compose('view row flex align-enter')}>
						<View style={compose('view w-40 p-4-8 pb-10')}>
							<Text style={compose('span bold fs-9')}>{product.id}</Text>
							<Text style={compose('span dark fs-10')}>{product.name}</Text>
						</View>

						<View style={compose('view w-15 p-4-8 pb-10')}>
							<Text style={compose('span dark right')}>{product.quantity}</Text>
						</View>

						<View style={compose('view w-15 p-4-8 pb-10')}>
							<Text
								style={compose('span dark right')}>{product.price}</Text>
						</View>

						<View style={compose('view w-15 p-4-8 pb-10')}>
							<Text style={compose('span dark right')}>{product.discountRate}</Text>
						</View>
			
						<View style={compose('view w-15 p-4-8 pb-10')}>
							<Text style={compose('span dark right')}>{product.total}</Text>
						</View>

					</View>
				))}

				<View style={compose('view flex')}>

					<View style={compose('view w-50 mt-20')}>
						<Text style={compose('span bold')}>{data.paymentMethodLabel}</Text>
						<Text style={compose('span uppercase')}>{data.docPaymentMethod}</Text>
					</View>

					<View style={compose('view w-50 mt-20')}>

						<View style={compose('view flex')}>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span')}>{data.subTotalLabel}</Text>
							</View>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span right bold dark')}>
									{data.docSubtotal}
								</Text>
							</View>

						</View>

						<View style={compose('view flex')}>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span')}>{data.discountLabel}</Text>
							</View>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span right bold dark')}>
									{data.docDiscount}
								</Text>
							</View>

						</View>

						<View style={compose('view flex')}>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span')}>{data.taxLabel}</Text>
							</View>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span right bold dark')}>
									{data.docTaxAmount}
								</Text>
							</View>

						</View>

						<View style={compose('view flex bg-gray p-5')}>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span bold')}>{data.totalLabel}</Text>
							</View>

							<View style={compose('view w-50 p-5 flex')}>
								<Text style={compose('span dark bold right ml-30')}>{data.currencySymbol}</Text>
								<Text style={compose('span right bold dark w-auto')}>
									{data.docTotal}
								</Text>
							</View>

						</View>

					</View>

				</View>

				{data.docNotes === '' ? (<Text></Text>) : (
					<View style={compose('view mt-20')}>
						<Text style={compose('span bold w-100')}>{data.notesLabel}</Text>
						<Text style={compose('span w-100')}>{data.docNotes}</Text>
					</View>
				)}

			</Page>

		</Document>
	)
}
