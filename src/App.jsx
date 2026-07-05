import { useState } from 'react'
import './App.scss'
import Experience from './Experience/Experience';
import Modal from './components/Modal/Modal';
import AudioToggleButton from './components/AudioToggleButton/AudioToggleButton';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

function App() {
  return (
    <>
      <LoadingScreen />
      <AudioToggleButton />
      <Modal />
      <Experience />
    </>
  );
}

export default App
