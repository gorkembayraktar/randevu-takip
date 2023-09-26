import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import trLocale from '@fullcalendar/core/locales/tr';

import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin,{ Draggable } from '@fullcalendar/interaction'; // for selectable

import { createRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';



export default function Meeting({calendarEvents,setCalendarEvents, showDialogDelete}) {

  const calendarRef = createRef();

  const [title, setTitle] = useState("");



  // load external events
  useEffect(() => {
    setTitle( calendarRef.current.calendar.currentData.viewTitle );
  },[calendarRef]);


  const handleDateClick = (info) => {
    // Etkinliğe tıklanınca bu işlev çağrılır
    if(info.view.type == 'timeGridDay') return;
    if( info.view.type != 'timeGridWeek' ){
        calendarRef.current
        .getApi()
        .changeView('timeGridWeek', info.date)
        return;
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
       calendarRef.current.getApi().refetchEvents();
    }
  
  },[calendarEvents])
 //

    

    const handleEventClick = (info) => {
      if(info.event.extendedProps.notAvailable) return;
      if(info.event.extendedProps.isFull) return;
      if(info.event.extendedProps.isClosed) return;
      if(info.event.start < new Date()) return;

      const clickedEvent = info.event;
      const updatedEvents = calendarEvents.map((event) => {
        if (event.id == clickedEvent.id) {
          return { ...event, isFull: true };
        }
        return event;
      });
    setCalendarEvents( updatedEvents );
  };

  const handleDataTransform  = (info) => {
    if(info.isFull){
      info.title= !info.info ? 'DOLU' : `${info.info.name} - ${info.info.phone}`
      info.backgroundColor= 'red'
    }else if(info.isClosed){
      info.backgroundColor= 'red'
      info.title = info.title ?? 'Randevu alımı bu süre boyunca kapatıldı'
    }else if(info.start < new Date()){
      info.title='Süresi geçti alınamaz'
      info.backgroundColor= 'gray'
    }else if(info.notAvailable){
      info.backgroundColor= '#ccc'
      info.title = 'Randevu alımı bu saat için kapatıldı.'
    }else{
      info.backgroundColor= '#3788d8'
      info.title = 'Randevu al'
    }
  }

  const deleteEvent = (info) =>{
    showDialogDelete({
      ...info.event.extendedProps,
      id: info.event.id
    });
  }

  const randevu_ekle = (info) => {
    /*if(!date) return alert('gün seçiniz');
    if(new Date(date) < new Date()) return alert('Lütfen geçmiş tarih girmeyiniz.')
    setCalendarEvents(
      [...calendarEvents,
      {
        start: new Date(date),
        id: Date.now(),
        isFull: true,
        info:{
          name, phone
        }
      }
      ]
    )
    */
  }
  // a custom render function
function renderEventContent(eventInfo) {
   
  return (
    <>
    {
      eventInfo.view.type != 'listWeek' &&
      <div className="fc-daygrid-event-dot" style={{borderColor: eventInfo.event.backgroundColor}}></div>
    }
  
    <div className="fc-event-time">{eventInfo.timeText}</div>
    <div className="fc-event-title">
      {eventInfo.event.title }
     
    </div>
    { eventInfo.event.extendedProps.isFull &&
        <>
        <button className="event-delete" onClick={ () => deleteEvent(eventInfo) }>İptal</button>
        </>
      }
    </>
  )
}

 // handle event receive
 const handleEventReceive = (eventInfo) => {
  const ntt = {
    id: Date.now(),
    title: eventInfo.draggedEl.getAttribute("title"),
    color: eventInfo.draggedEl.getAttribute("data-color"),
    start: eventInfo.event.start,
    end: eventInfo.event.end,
    custom: eventInfo.draggedEl.getAttribute("data-custom")
  };

  if( eventInfo.event.start > new Date() ){
  }else{
    setCalendarEvents((state) => [...state,{...ntt}]);
  }

};


  return (
    <>
    <Box sx={{ display:{ xs: 'block', sm: 'none'}}}>{ title }</Box>
      <FullCalendar
        dayMaxEventRows= {3}
        initialView='listWeek'
        moreLinkClick={'day'}
        locale={trLocale}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
        events={calendarEvents}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek' // user can switch between the two
        }}
        selectable={true}
        dateClick={ handleDateClick}
        ref={calendarRef}
        eventClick={handleEventClick}
        eventDataTransform ={handleDataTransform}
        eventContent={renderEventContent}
        droppable={true}
        selectMirror={true}
        eventReceive={handleEventReceive}
       
        
      />
    </>
  )
}


