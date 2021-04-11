import { Subject, interval, Observable } from 'rxjs';

//it('works', () => {
    /*
    const aSource = new Subject<number>();
    //const aSource = interval(500);
    let i = 0;
    setInterval(() => {
        aSource.next(i);
        i++;
    },2000)
    aSource.subscribe(val => console.log('Subject 1',val))
    */
    //setTimeout(() => {
    //    aSource.subscribe(val => console.log('Subject 2',val))
    //}, 1000);
/*
    console.log("Next value 1");
    aSource.next(55);
    setTimeout(() => {
        console.log("Next value 2");
        aSource.next(44);
    }, 1000);
    setTimeout(() => {
        console.log("Next value 3");
        aSource.next(1);
     }, 5000);
    aSource.next(55);
*/

     const producer = Observable.create(consumer => {
         consumer.next(100)
         consumer.next(200)
         consumer.next(300)
     });

     producer.subscribe(val => console.log('From consumer 1',val))
     producer.subscribe(val => console.log('From consumer 2',val))
//})