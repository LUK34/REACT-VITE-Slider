import React, { useEffect } from 'react';
import {shortList,list,longList} from './data';
import {FaQuoteRight} from 'react-icons/fa';
import { useState } from 'react';
import {FiChevronLeft,FiChevronRight} from 'react-icons/fi';
const Carousel = () => 
{
    const [people,setPeople] = useState(longList);
    const[currentPerson,setCurrentPerson] = useState(0);
    const prevSlide =()=>
    {
        setCurrentPerson((old)=>
        {
            const result=(old - 1 + people.length) % people.length;
            //0-1+3%4=2%4=
            return result;
        });
    };
    const nextSlide =()=>
    {
        setCurrentPerson((old)=>
        {
            const result=(old + 1)%people.length;
            //3+1%4=0
            return result;
        });
    };

    //Auto slider logic is implemented below:
    useEffect(()=>
    {
        let sliderId= setInterval(()=>
        {
            nextSlide();
        },2000);

        return ()=>
        {
            clearInterval(sliderId);
        };

    },[currentPerson]);
  return (
    <section className='slider-container'>
    {
        people.map((person,personIndex)=>{
            const{id,image,name,title,quote}=person;
            return(
                <article className='slide' 
                         style={{
                            transform:`translateX(${100 * (personIndex-currentPerson)}%)`,
                            opacity: personIndex === currentPerson ? 1 : 0,
                            visibility: personIndex === currentPerson ? 'visible': 'hidden'
                            }} key={id}>
                    <img src={image} alt={name} className='person-img' />
                    <h5 className='name'>{name}</h5>
                    <p className='title'>{title}</p>
                    <p className='text'>{quote}</p>
                    <FaQuoteRight className='icon' />
                </article>
            )
        })
    }
    <button type='btn' className='prev' onClick={prevSlide}><FiChevronLeft /></button>
    <button type='btn' className='next' onClick={nextSlide}><FiChevronRight /></button>
    </section>
  )
}

export default Carousel
