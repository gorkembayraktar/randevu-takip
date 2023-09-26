export const gunluk_randevu_saatleri = {
    0: [

    ],// pazar
    1:[
        {title: 'Randevu al',hour: '05:00'},
        {title: 'Randevu al',hour: '10:00', isFull: true, info: {name: 'Görkem', phone: '0855555'}},
        {title: 'Randevu al',hour: '11:00'},
        {title: 'Randevu al',hour: '16:00', isFull: true, info: {name: 'Görkem', phone: '0855555'}},
        {title: 'Randevu al',hour: '18:00'}
    ],
    2:[
        {title: 'Randevu al',hour: '05:00', notAvailable: true },
        {title: 'Randevu al',hour: '10:00'},
        {title: 'Randevu al',hour: '11:00', notAvailable: true},
        {title: 'Randevu al',hour: '16:00'},
        {title: 'Randevu al',hour: '18:00'} 
    ],
    3:[{title: 'Randevu alımı Kapalı', hour: '00:00', isClosed: true, end: '23:59'}],
    5:[
        {title: 'Randevu al',hour: '05:00'},
        {title: 'Randevu al',hour: '10:00'},
        {title: 'Randevu al',hour: '11:00'},
        {title: 'Randevu al',hour: '16:00'},
        {title: 'Randevu al',hour: '18:00'} 
    ],
    6:[
        {title: 'Randevu al',hour: '10:00'},
        {title: 'Randevu al',hour: '11:00'},
        {title: 'Randevu al',hour: '16:00'},
        {title: 'Randevu al',hour: '18:00'} 
    ]
}


export const ozel_gunler = [
    {
        title: 'Yılbaşı',
        start: new Date(2024,1,1,0,0),
        end: new Date(2023,1,1,23,59),
    },{
        title: 'Ulusal Egemenlik ve Çocuk Bayramı',
        start: new Date(2023,4,23),
        end: new Date(2023,4,23,23,59)
    },
    {
        title: 'Emek ve Dayanışma Günü',
        start: new Date(2023,5,1),
        end: new Date(2023,5,1,23,59)
    },{
        title: "Atatürk' ü Anma Gençlik ve Spor Bayramı",
        start: new Date(2023,5,19),
        end: new Date(2023,5,19,23,59)
    },{
        title: "Ramazan Bayramı",
        start: new Date(2024,4,10),
        end: new Date(2024,4,12,23,59)
    },{
        title: "Demokrasi ve Milli Birlik Günü",
        start: new Date(2024,5,15),
        end: new Date(2024,5,15,23,59)
    },{
        title: "Zafer Bayramı",
        start: new Date(2024,8,30),
        end: new Date(2024,8,30,23,59)
    },{
        title: "Kurban Bayramı",
        start: new Date(2024,6,16),
        end: new Date(2024,6,19,23,59)
    },{
        title: "Cumhuriyet Bayramı",
        start: new Date(2024,10,29),
        end: new Date(2024,10,29,23,59)
    },
]