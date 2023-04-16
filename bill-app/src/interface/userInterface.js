const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
})

export default {
    id: -1,
    firstName: 'John',
    lastName: 'Doe',
    fonction: 'Directeur',
    telephone: '03 87 45 20 13',
    email: 'john@doe.fr',
    enterprise: 'Doe Corp',
    mainAddress: '2 rue de la poupée qui dort',
    scdAddress: '-',
    zipcode: '57000',
    country: 'FRANCE',
    city: 'Metz',
    regDate: date
}