# Multiplecountdowns 

Technology used for building this website

- client
  - React (Typescript)
  - styled component
  - Notification API
  - Web Workers

--- 

The general idea behind this app is to create multiple countdown timer with a high precision. Using Web Workers allows to push the script onto the separate threat to achieve that precision. Using `useInterval` in UI thread is not precise, running multiple timers makes it even more visible. Plus it causes problem to achieve precision when refreshing website and running timers offline.

Website uses Notification API for browsers that have that support.

The biggest challenge was to be able to run timers separately with precision up to 1ms while communicating with Web Workers that use `useInterval`, save everything into local Storage while using React ecosystem.

--- 
### Future plans

- [ ] add device linking (using generated number or string to be able to use timers from one device to another without logging and be able to export timers for other people)
- [ ] add server to linking support 
- [ ] add timer renaming 
- [ ] add information about how much time have passed since the timer's been up for both offline and online timers
- [ ] consider adding different kind of timers 