const data = {
	login      : {
		data: {
			access_token: "asdaldnawidjalwdj5464"
		}
	},
	getUserData: {
		data: {
			data: {
				uuid         : "1515",
				name         : "Pablo Neres",
				email        : "pablo@clickweb.com.br",
				avatar       : {
					uri: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
				},
				avatar_sizes : {},
				document_type: "CPF",
				document     : "123.123.123-12",
				gender       : null,
				birth        : null,
				phone        : "(11) 95852-8808",
				city         : {
					label     : "Guarulhos-SP",
					valueLabel: "Guarulhos-SP"
				},
				balance      : 0,
				is_completed : 1,
				custom_data  : null,
				plan         : "Plano premium"
			}
		}
	},
	register   : {
		data: {
			access_token: "asdaldnawidjalwdj5464"
		}
	},
	credit_card: {
		data: {
			data: [
				{
					uuid       : "214",
					placeholder: "Visa *7788",
					brand_file : "https://logodownload.org/wp-content/uploads/2016/10/visa-logo-1.png"
				}
			]
		}
	},
	anamnese   : {
		data: {
			data: [
				{
					title: "Patologias",
					list : [
						{
							title  : "Hipertensão",
							checked: false
						},
						{
							title  : "Diabetes",
							checked: false
						},
						{
							title  : "Renal",
							checked: false
						},
						{
							title  : "Cardíaco",
							checked: false
						},
						{
							title  : "Cancer",
							checked: false
						},
					]
				},
				{
					title: "Sofre de",
					list : [
						{
							title  : "Ansiedade",
							checked: false
						},
						{
							title  : "Depressão",
							checked: false
						},
						{
							title  : "Irritabilidade",
							checked: false
						},
					]
				},
				{
					title: "Apetite",
					list : [
						{
							title  : "Normal",
							checked: false
						},
						{
							title  : "Abaixo do Normal",
							checked: false
						},
						{
							title  : "Acima do Normal",
							checked: false
						},
					]
				}
			]
		}
	},
	alerts     : {
		data: {
			data: [
				{
					id       : "1",
					title    : "Olhos ouvidos Audiometria",
					frequency: "Mensal"
				},
				{
					id       : "2",
					title    : "Coração Eletrocardiograma",
					frequency: "2 em 2 anos"
				},
				{
					id       : "3",
					title    : "Hemograma",
					frequency: "3 em 3 mesees"
				}
			]
		}
	},
	all        : {
		data: {
			data: [
				{
					title   : "Ultrassonografia",
					subTitle: "Cadastrado em 18, Out de 2021, às 17:03"
				},
				{
					title   : "Raio-X",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03"
				},
				{
					title   : "Exame de sange",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03"
				},
			]
		}
	},
	dental     : {
		data: {
			data: [
				{
					title   : "Radiografia periapical",
					subTitle: "Cadastrado em 18, Out de 2021, às 17:03"
				},
				{
					title   : "Radiografia panorâmica",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03"
				},
				{
					title   : "Radiografia oclusal",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03"
				},
			]
		}
	},
	image      : {
		data: {
			data: [
				{
					title   : "Ultrassonografia",
					subTitle: "Cadastrado em 18, Out de 2021, às 17:03"
				},
				{
					title   : "Raio-X",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03"
				},
			]
		}
	},
	labs       : {
		data: {
			data: [
				{
					title   : "Exame de sange",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03"
				},
			]
		}
	},
	vaccine    : {
		data: {
			data: [
				{
					title   : "Covid-19",
					subTitle: "Cadastrado em 18, Out de 2021, às 17:03",
					image   : "https://images.squarespace-cdn.com/content/v1/6007325d28b75f4d78b5eef0/1619121170768-PK4JRVNI3UH90Z8POY6Q/celia+accorsi+-+carteira+vacina%C3%A7%C3%A3o.jpeg"
				},
				{
					title   : "Hepatite B",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03",
					image   : "https://images.squarespace-cdn.com/content/v1/6007325d28b75f4d78b5eef0/1619121170768-PK4JRVNI3UH90Z8POY6Q/celia+accorsi+-+carteira+vacina%C3%A7%C3%A3o.jpeg"
				},
				{
					title   : "BCG",
					subTitle: "Atualizado em 18, Out de 2021, às 17:03",
					image   : "https://images.squarespace-cdn.com/content/v1/6007325d28b75f4d78b5eef0/1619121170768-PK4JRVNI3UH90Z8POY6Q/celia+accorsi+-+carteira+vacina%C3%A7%C3%A3o.jpeg"
				},
			]
		}
	}
}

export default (success = true, type, dados = null, time = 1000) => {
	const returnSuccess = () => {
		return data[type]
	}

	if( type )
	{
		if( type === "return" )
		{
			return new Promise((resolve, reject) => setTimeout(() => {
				success ? resolve({data: {data: dados}}) : reject
			}, time))
		}

		return new Promise((resolve, reject) => setTimeout(() => {
			success ? resolve(returnSuccess()) : reject
		}, time))
	}

	return new Promise((resolve, reject) => setTimeout(success ? resolve : reject, time))
}