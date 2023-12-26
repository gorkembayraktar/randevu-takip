import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import trLocale from '@fullcalendar/core/locales/tr';

import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin,{ Draggable } from '@fullcalendar/interaction'; // for selectable

import { createRef, useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';

import { dispatch } from '../../store';
import dayjs from 'dayjs';
import { AppointmentStatus } from '../../data/constant';
import { createAppointmentModal } from '../../store/dispatch';
import { useAlert } from '../../hooks/useAlert';



export default function Meeting({calendarEvents, showDialogDelete}) {

  const calendarRef = createRef();

  const [title, setTitle] = useState("");

  const {success, error} = useAlert();

  console.log("meeting", calendarEvents)


  // load external events
  /*
  useEffect(() => {
    setTitle( calendarRef.current.calendar.currentData.viewTitle );
  },[calendarRef]);

  */

  const handleDateClick = (info) => {
    // Etkinliğe tıklanınca bu işlev çağrılır
    if(info.view.type == 'timeGridDay') return;
    if( info.view.type != 'timeGridWeek' ){
      console.log(info.view.type, info)
      /*
        calendarRef.current
        .getApi()
        .changeView('timeGridWeek', info.date)
        return;

        */
    }
  };
  /*
  useEffect(() => {
    if (calendarRef.current) {
       calendarRef.current.getApi().refetchEvents();
    }
  
  },[calendarEvents])
  */
 //

    

    const handleEventClick = (info) => {
      const props  = info.event.extendedProps;

      if(props.status === AppointmentStatus.isNotAvailable){
         error("Bu tarih kullanılamaz") 
         console.log('not availabe');
         return;
      }

      if(props.status === AppointmentStatus.isClosed){
          error("Bu tarih kapatıldı.") 
          return console.log('isClosed');
      }
      const clickedEvent = info.event;
   
      const selectDate = clickedEvent.start;

      if(  
        props.status == AppointmentStatus.isFull ||
        props.status == AppointmentStatus.isCompleted
        ){
        dispatch.editAppointmentModal({open: true, appointmentId: clickedEvent.id});
        return;
      }

     
      if(info.event.start < new Date()) {
        error("başlangıç tarihi şuanki tarihten küçük") 
        return console.log('başlangıç tarihi şuanki tarihten küçük');
      }
          
     
      if(  props.status == AppointmentStatus.isAvailable  ){
        const p = {
          show: true,
          date: dayjs(selectDate.toString()).toString(),
          hour: dayjs(selectDate.toString()).format('HH:mm').toString(),
          appointmentId: clickedEvent.id
        };
        
    
        dispatch.createAppointmentModal(p)
        
        return;
      }
     
 

    
      
     
      
      /*
      const updatedEvents = calendarEvents.map((event) => {
        if (event.id == clickedEvent.id) {
          return { ...event, isFull: true };
        }
        return event;
      });
      setCalendarEvents( updatedEvents );
      */
  };

  const handleDataTransform  = (info) => {
   
   
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
   console.log(eventInfo)
  return (
    <>
    {
      eventInfo.view.type != 'listWeek' &&
      <div className="fc-daygrid-event-dot" style={{borderColor: eventInfo.event.backgroundColor}}></div>
    }
  
    <div className="fc-event-time">
      {eventInfo.timeText}
      
      </div>
    <div className="fc-event-title" >
      {eventInfo.event.title }
      { ['listWeek', 'timeGridWeek'].includes(eventInfo.view.type ) && eventInfo.event.extendedProps.isFull &&
       
        <IconButton size="small" IconButton className="" onClick={ () => deleteEvent(eventInfo) }> <GridDeleteIcon /></IconButton>
        
      }
      
    </div>

    
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
    //setCalendarEvents((state) => [...state,{...ntt}]);
  }

};




  return (
    <>
    <Box sx={{ display:{ xs: 'block', sm: 'none'}}}>{ title }</Box>
      <FullCalendar
        dayMaxEventRows= {3}
        initialView='dayGridMonth'
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
        eventContent={renderEventContent}
        droppable={true}
        selectMirror={true}
        eventReceive={handleEventReceive}      
      />
    </>
  )
}


