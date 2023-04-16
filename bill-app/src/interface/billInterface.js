import prestationsInterface from './prestationsInterface.js'

const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
})

export default {
    id: -1,
    billnum: 0,
    description: '',
    date: date,
    client: {},
    prestations: [{ ...prestationsInterface }],
    discount: 0.00,
    paid: 0.00,
    totalHT: 0,
    tva: 20,
    totalTTC: 0
}