export const DAYS = {
    1: "Monday", // Pazartesi
    2: "Tuesday", // Salı
    3: "Wednesday", // Çarşamba
    4: "Thursday", // Perşembe
    5: "Friday", // Cuma
    6: "Saturday", // Cumartesi
    0: "Sunday" // Pazar
};
export const DAY_KEYS = [1,2,3,4,5,6,0];


export const randevu_saatleri = [
    {id:1, day:1, hour: '05:00', notAvailable: false },
    {id:2, day:1, hour: '07:00', notAvailable: true },
    {id:3, day:2, hour: '05:00', notAvailable: false },
    {id:4, day:2, hour: '07:00', notAvailable: false },
    {id:5, day:3, hour: '05:00', notAvailable: true },
    {id:6, day:4, hour: '07:00', notAvailable: false },
    {id:7, day:5, hour: '05:00', notAvailable: false },
    {id:8, day:6, hour: '07:00', notAvailable: false },
]

export const AppointmentStatus = {
    isAvailable: 0,
    isFull: 1,
    isNotAvailable: 2,
    isClosed: 3,
    isCompleted: 4,
    isCanceled: 5
}

export const randevular = [
    {
        id: 1,
        date: '12.25.2023',
        time: '23:00',
        name: 'Görkem',
        phone: '055555',
        note: 'Mesaj',
        created_at:null,
        updated_at: null,
        status: AppointmentStatus.isFull
    },
    {
        id: 2,
        date: '12.28.2023',
        message: 'Randevu al',
        time: '22:00',
        status: AppointmentStatus.isAvailable
    }
]




export const gunluk_randevu_saatleri = {
    0: [

    ],// pazar
    1:[
        {title: 'Randevu al',hour: '05:00'},
        {title: 'Randevu al',hour: '10:00', status:'isFull', message: 'Bu randevu dolu', user: {name: 'Görkem', phone: '0855555'}},
        {title: 'Randevu al',hour: '11:00'},
        {title: 'Randevu al',hour: '16:00', status:'isFull', info: {name: 'Görkem', phone: '0855555'}},
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
        {title: 'Randevu al',hour: '10:00'},
        {title: 'Randevu al',hour: '10:00'},
        {title: 'Randevu al',hour: '11:00'},
        {title: 'Randevu al',hour: '16:00'},
        {title: 'Randevu al',hour: '18:00'} 
    ],
    6:[
        {title: 'Randevu al',hour: '10:00'},
        {title: 'Randevu al',hour: '11:00'},
        {title: 'Randevu al',hour: '16:00'},
        {title: 'Randevu al',hour: '18:00'},
        {title: 'Randevu al',hour: '23:00'}
    ]
}


export const ozel_gunler = [
    {
        title: 'Yılbaşı',
        start: new Date(2024,0,1,0,0),
        end: new Date(2024,0,1,23,59),
    },{
        title: 'Ulusal Egemenlik ve Çocuk Bayramı',
        start: new Date(2024,3,23),
        end: new Date(2024,3,23,23,59)
    },
    {
        title: 'Emek ve Dayanışma Günü',
        start: new Date(2024,4,1),
        end: new Date(2024,4,1,23,59)
    },{
        title: "Atatürk' ü Anma Gençlik ve Spor Bayramı",
        start: new Date(2024,4,19),
        end: new Date(2024,4,19,23,59)
    },{
        title: "Ramazan Bayramı",
        start: new Date(2024,3,10),
        end: new Date(2024,3,12,23,59)
    },{
        title: "Demokrasi ve Milli Birlik Günü",
        start: new Date(2024,4,15),
        end: new Date(2024,4,15,23,59)
    },{
        title: "Zafer Bayramı",
        start: new Date(2024,7,30),
        end: new Date(2024,7,30,23,59)
    },{
        title: "Kurban Bayramı",
        start: new Date(2024,5,16),
        end: new Date(2024,5,19,23,59)
    },{
        title: "Cumhuriyet Bayramı",
        start: new Date(2024,9,29),
        end: new Date(2024,9,29,23,59)
    },
]


export const get_daily_data = ( ) => {
    const date = new Date();
    date.setHours()
    return [
        ...randevular.map(k => ({
                ...k, 
                start: setHours(new Date(k.date), k.time),
                end: setHours(new Date(k.date), k.time)
            })
        ).map(info => {
           
            if(info.status == AppointmentStatus.isFull){
                info.title= `${info?.name} - ${info?.phone}`
                info.backgroundColor= 'red'
            }else if(info.status == AppointmentStatus.isClosed){
                info.backgroundColor= 'red'
                info.title = info?.title ?? 'Randevu alımı bu süre boyunca kapatıldı'
            }else if(info.status == AppointmentStatus.isNotAvailable){
                info.backgroundColor= '#ccc'
                info.title = 'Randevu alımı bu saat için kapatıldı.'
            }else if(info.start < new Date()){
                info.title='Süresi geçti alınamaz'
                info.backgroundColor= 'gray'
            }else if(info.status == AppointmentStatus.isAvailable){
                info.backgroundColor= '#3788d8'
                info.title = info.message
            }
            return info
        })   
    ]
}


export const get_fake_appointment = (form) => {
    const info = {
        id: Date.now(),
        date: form.date,
        time: form.time,
        name: form.name,
        phone: form.phone,
        note: form.note,
        created_at:null,
        updated_at: null,
        status: AppointmentStatus.isFull
    };

    info.start = setHours(new Date(info.date),info.time);
    info.end =  setHours(new Date(info.date), info.time);

    if(info.status == AppointmentStatus.isFull){
        info.title= `${info?.name} - ${info?.phone}`
        info.backgroundColor= 'red'
    }else if(info.status == AppointmentStatus.isClosed){
        info.backgroundColor= 'red'
        info.title = info?.title ?? 'Randevu alımı bu süre boyunca kapatıldı'
    }else if(info.status == AppointmentStatus.isNotAvailable){
        info.backgroundColor= '#ccc'
        info.title = 'Randevu alımı bu saat için kapatıldı.'
    }else if(info.start < new Date()){
        info.title='Süresi geçti alınamaz'
        info.backgroundColor= 'gray'
    }else if(info.status == AppointmentStatus.isAvailable){
        info.backgroundColor= '#3788d8'
        info.title = info.message
    }

    return info;
}

export const setHours = (date, stringhours) => {
    const split = stringhours.split(':');
    date.setHours(parseInt(split[0]), parseInt(split[1]));
    return date;
}



export const get_daily_data2 = ( maxDay = 7 ) =>{

    const data = [];

    let indis = 1;
    for (let day = 0; day < maxDay; day++) {
        const currentDate = new Date(); // Bugünün tarihini alın
        currentDate.setDate(currentDate.getDate() + day); // Güne göre tarihi ayarlayın
        const currentDayOfWeek = currentDate.getDay(); // Haftanın gününü alın

        // Güne ait etkinlikleri ekleyin
        let dailyEvents = !gunluk_randevu_saatleri[currentDayOfWeek] ? [] : gunluk_randevu_saatleri[currentDayOfWeek].map((event, i) => {
        
                let start = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                event.hour.split(':')[0], // Saat
                event.hour.split(':')[1] // Dakika
                );
                let end = event.end ? new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                event.end.split(':')[0], // Saat
                event.end.split(':')[1] // Dakika
                ) : event.start;
                
                return {
                    ...event,
                    id:indis++,
                    start:start,
                    end: event.isClosed ? end : start
                }
            
        });

        // etkinlikleri özel günlere göre filtrele
        dailyEvents = dailyEvents.filter(d => {
        // Eğer isFull ise filtreme yapma
    
        if (d.isFull == true) {
            return true; // Etkinlik isFull ise filtreleme yapma, etkinliği koru
        }
    
        // Eğer etkinlik tarihi özel gün tarihi aralığındaysa filtreleme yapma
        let e = ozel_gunler.find(o => new Date(o.start).setHours(0,0,0,0) == new Date(d.start).setHours(0,0,0,0));

        if(e){
            return false;
        }
        return true;
    });
    // console.log(dailyEvents)
    data.push(...dailyEvents);

    }
    return data;
}

