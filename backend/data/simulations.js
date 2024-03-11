const simulations = [
  {
    createdBy: '65c0319f96b1701e3135755f', // Remplacez cela par l'ID de l'utilisateur réel
    // refference: 'Ref123',

    raccordReseau: true,
    pro: false,
    typeAbonnement: 'Haute tension',
    typeInstallation: {
      raccordement: 'tri',
      puissance: 15,
      amperage: 30,
    },
    consoN: {
      janv: 100,
      fev: 150,
      mars: 120,
      avril: 200,
      mai: 180,
      juin: 250,
      juillet: 300,
      aout: 280,
      sept: 150,
      oct: 200,
      nov: 180,
      dec: 220,
    },
    consoN1: {
      janv: 90,
      fev: 140,
      mars: 110,
      avril: 190,
      mai: 170,
      juin: 240,
      juillet: 290,
      aout: 270,
      sept: 140,
      oct: 190,
      nov: 170,
      dec: 210,
    },
    status: 'En Service',
    demandeur: '3211',
    benneficiaire: '3211',
    concessionaire: 'EEC',
    numCompteurEnercal: '987654',
    numClientEnercal: '321098',
    address: '456 Main Street',
    demandeEEC: {
      status: 'Accepté',
    },
    demandeEnercal: {
      status: 'En Demande',
    },
    demandeDimenc: {
      status: 'Refusé',
    },
    conformite: {
      status: 'Non Commencé',
    },
    datePrevisionelPose: new Date('2024-05-01'),
    datePose: new Date('2024-05-15'),
    datePrevisionelMiseEnService: new Date('2024-06-01'),
    dateMiseEnService: new Date('2024-06-15'),
    puissanceSouscrite: 20,
    stockage: true,
    typeBaterrie: 'Plomb',
    capaciteBatterie: 150,
    batteries: [
      {
        ref: '1435',
        quantity: 3,
        multiprices: {
          pro: 120,
          part: 180,
        },
      },
    ],
    modulesPV: [
      {
        ref: '1403',
        quantity: 12,
        multiprices: {
          pro: 70,
          part: 90,
        },
      },
    ],
    onduleurs: [
      {
        ref: '1412',
        quantity: 2,
        multiprices: {
          pro: 150,
          part: 200,
        },
      },
    ],
    prestations: [
      {
        ref: '1395',
        quantity: 1,
        multiprices: {
          pro: 90,
          part: 120,
        },
      },
    ],
    suppervision: [
      {
        ref: '1398',
        quantity: 2,
        multiprices: {
          pro: 40,
          part: 60,
        },
      },
    ],
    supportage: [
      {
        ref: '1405',
        quantity: 5,
        multiprices: {
          pro: 30,
          part: 45,
        },
      },
    ],
  },
]

export default simulations
