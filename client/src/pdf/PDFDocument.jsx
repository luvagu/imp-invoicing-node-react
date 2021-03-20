import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer'
import compose from './styles/compose'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxPKTU1Kg.ttf' },
	{ src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlvAx0_IsE.ttf', fontWeight: 700 }
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

						<Image style={compose('logo right mb-10')} src="/logo.jpg" />

						<View style={compose('view flex mb-5')}>
							<View style={compose('view w-40')}>
								<Text style={compose('span bold')}>{data.docType} No.</Text>
							</View>

							<View style={compose('view w-60')}>
								<Text style={compose('span')}>{data.docNum}</Text>
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

				<View style={compose('view flex mt-30')}>

					<View style={compose('view w-100')}>
						<Text style={compose('span bold dark mb-5')}>{data.clientDetailsLabel}</Text>

						<View style={compose('view flex')}>
							<View style={compose('view w-30')}><Text style={compose('span')}>RUC / CI: {data.clientId}</Text></View>
							<View style={compose('view w-30')}><Text style={compose('span')}>{data.clientName}</Text></View>
							<View style={compose('view w-30')}><Text style={compose('span')}>{data.clientAddress}</Text></View>
						</View>

						<Text style={compose('span')}>{data.clientPhone}</Text>
						<Text style={compose('span')}>{data.clientEmail}</Text>
					</View>

        		</View>

				<View style={compose('view mt-30 bg-dark flex')}>

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
							style={compose('span white bold right')}>{data.productDiscounyLabel}</Text>
					</View>

          			<View style={compose('view w-15 p-4-8')}>
						<Text
							style={compose('span white bold right')}>{data.productTotalAmountLabel}</Text>
					</View>

				</View>

				{data.products?.map((product, i) => (
					product.code === '' ? (<Text key={i}></Text>) : (
						<View key={i} style={compose('view row flex align-enter')}>

							<View style={compose('view w-40 p-4-8 pb-10')}>
                				<Text style={compose('span bold fs-9')}>{product.code}</Text>
                				<Text style={compose('span dark fs-10')}>{product.description}</Text>
							</View>

							<View style={compose('view w-15 p-4-8 pb-10')}>
								<Text style={compose('span dark right')}>{product.quantity}</Text>
							</View>

							<View style={compose('view w-15 p-4-8 pb-10')}>
								<Text
									style={compose('span dark right')}>{product.price}</Text>
							</View>

              				<View style={compose('view w-15 p-4-8 pb-10')}>
								<Text style={compose('span dark right')}>{product.discount}</Text>
							</View>
              
							<View style={compose('view w-15 p-4-8 pb-10')}>
								<Text style={compose('span dark right')}>{product.total}</Text>
							</View>

						</View>
					)))}

				<View style={compose('view flex')}>

					<View style={compose('view w-50 mt-20')}>
						<Text style={compose('span bold')}>{data.paymentTermsLabel}</Text>
						<Text style={compose('span uppercase')}>{data.paymentTerms}</Text>
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
									{data.docTax}
								</Text>
							</View>

						</View>

						<View style={compose('view flex bg-gray p-5')}>

							<View style={compose('view w-50 p-5')}>
								<Text style={compose('span bold')}>{data.totalLabel}</Text>
							</View>

							<View style={compose('view w-50 p-5 flex')}>
								<Text style={compose('span dark bold right ml-30')}>{data.currency}</Text>
								<Text style={compose('span right bold dark w-auto')}>
									{data.docTotal}
								</Text>
							</View>

						</View>

					</View>

				</View>

				{/* <View style={compose('view mt-20')}>
					<Text style={compose('span bold w-100')}>{data.notesLabel}</Text>
					<Text style={compose('span w-100')}>{data.notes}</Text>
				</View> */}

			</Page>

		</Document>
	)
}
