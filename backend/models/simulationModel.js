import mongoose from 'mongoose'
import UserSchema from './userModel.js'
const simulationSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    refference: {
      type: String,
    },

    idPropal: {
      type: String,
      default: null,
    },

    // si True type abonement
    raccordReseau: {
      type: Boolean,
    },

    pro: {
      type: Boolean,
    },

    typeAbonnement: {
      type: String,
      enum: ['Basse tension', 'Haute tension', 'non defini'],
      default: 'non defini',
    },

    // Informations générales
    typeInstallation: {
      raccordement: {
        type: String,
        enum: ['mono', 'tri', 'non defini'],
        default: 'non defini',
      },
      puissance: {
        type: Number,
        default: 0,
      },
      amperage: {
        type: Number,
        default: 0,
      },
    },

    consoN: {
      janv: {
        type: Number,
        default: 0,
      },
      fev: {
        type: Number,
        default: 0,
      },
      mars: {
        type: Number,
        default: 0,
      },
      avril: {
        type: Number,
        default: 0,
      },
      mai: {
        type: Number,
        default: 0,
      },
      juin: {
        type: Number,
        default: 0,
      },
      juillet: {
        type: Number,
        default: 0,
      },
      aout: {
        type: Number,
        default: 0,
      },
      sept: {
        type: Number,
        default: 0,
      },
      oct: {
        type: Number,
        default: 0,
      },
      nov: {
        type: Number,
        default: 0,
      },
      dec: {
        type: Number,
        default: 0,
      },
    },
    consoN1: {
      janv: {
        type: Number,
        default: 0,
      },
      fev: {
        type: Number,
        default: 0,
      },
      mars: {
        type: Number,
        default: 0,
      },
      avril: {
        type: Number,
        default: 0,
      },
      mai: {
        type: Number,
        default: 0,
      },
      juin: {
        type: Number,
        default: 0,
      },
      juillet: {
        type: Number,
        default: 0,
      },
      aout: {
        type: Number,
        default: 0,
      },
      sept: {
        type: Number,
        default: 0,
      },
      oct: {
        type: Number,
        default: 0,
      },
      nov: {
        type: Number,
        default: 0,
      },
      dec: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ['Simulation', 'Etude', 'En Service', 'Projet', 'Sans Suite'],
      default: 'Simulation',
    },

    demandeur: {
      type: String,
      default: 'non renseigné',
    },

    benneficiaire: {
      type: String,
      default: 'non renseigné',
    },

    concessionaire: {
      type: String,
      enum: ['EEC', 'Enercal', 'non renseigné'],
      default: 'non renseigné',
    },
    numCompteurEnercal: {
      type: String,
      default: 'non renseigné',
    },

    numClientEnercal: {
      type: String,
      default: 'non renseigné',
    },

    address: {
      type: String,
      default: 'Aucune adresse renseignée',
    },

    // Informations sur la demande EEC
    demandeEEC: {
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
    },
    // Informations sur la demande Enercal
    demandeEnercal: {
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
    },
    // Informations sur la demande Dimenc
    demandeDimenc: {
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
    },
    // Informations sur la conformité
    conformite: {
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
    },

    datePrevisionelPose: {
      type: Date,
    },

    datePose: {
      type: Date,
    },
    datePrevisionelMiseEnService: {
      type: Date,
    },
    dateMiseEnService: {
      type: Date,
    },

    // Informations techniques
    puissanceSouscrite: {
      type: Number,
      default: 0,
    },

    // si stockage true
    stockage: {
      type: Boolean,
      default: false,
    },

    typeBaterrie: {
      type: String,
      enum: ['Lithium Ion', 'Plomb', 'Autre'],
    },

    capaciteBatterie: {
      type: Number,
      default: 0,
    },
    batteries: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],

    modulesPV: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    onduleurs: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],

    prestations: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    suppervision: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    supportage: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// // Reverse populate avec des virtuals
// installationSchema.virtual('interventions', {
//   ref: 'Intervention',
//   localField: '_id',
//   foreignField: 'installationId',
//   justOne: false,
// })

// installationSchema.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate()

//   console.log('Update Object:', update)
//   console.log('New Warranty Duration:', update['garantie.duree'])

//   if (update.dateMiseEnService || update['garantie.duree']) {
//     const MS_PER_SECOND = 1000
//     const SECONDS_PER_MINUTE = 60
//     const MINUTES_PER_HOUR = 60
//     const HOURS_PER_DAY = 24
//     const DAYS_PER_YEAR = 365.25

//     const dureeGarantie = update['garantie.duree'] || 1 // Utilisez la nouvelle durée de la garantie si elle est fournie

//     const dureeEnMsGarantie =
//       dureeGarantie *
//       DAYS_PER_YEAR *
//       HOURS_PER_DAY *
//       MINUTES_PER_HOUR *
//       SECONDS_PER_MINUTE *
//       MS_PER_SECOND
//     const dateFin = new Date(
//       new Date(update.dateMiseEnService).getTime() + dureeEnMsGarantie,
//     )

//     update['garantie.dateFin'] = dateFin
//     update['garantie.isActive'] = true
//   }
//   next()
// })

simulationSchema.pre('save', async function (next) {
  console.log('Pre-save hook triggered')

  // Génération du champ refference
  if (!this.refference) {
    const currentYear = new Date().getFullYear()
    const count = await Simulation.countDocuments({
      refference: new RegExp(`^${currentYear}-`, 'i'),
    })
    console.log('Reference count:', count)
    this.refference = `${currentYear}-${count + 1}`
  }
  next()
})

// installationSchema.post('find', function (docs) {
//   for (let doc of docs) {
//     if (doc.garantie.dateFin) {
//       if (new Date() > new Date(doc.garantie.dateFin)) {
//         doc.garantie.isActive = false
//       }
//     } else {
//       doc.garantie.isActive = false
//     }
//   }
// })

// installationSchema.post('findOne', function (doc) {
//   if (doc) {
//     if (doc.garantie.dateFin) {
//       if (new Date() > new Date(doc.garantie.dateFin)) {
//         doc.garantie.isActive = false
//       }
//     } else {
//       doc.garantie.isActive = false
//     }
//   }
// })

const Simulation = mongoose.model('Simulation', simulationSchema)

export default Simulation
