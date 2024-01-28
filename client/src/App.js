import { Chat } from './Chat';
import Player from './video/Player'


function App() {
  return (
    <>
      <h1>Socket.io App</h1>
      <Player url="https://www.youtube.com/embed/SoRCmTQxzEk?controls=0"/>
      <Chat />
    </>
  )
}

export default App;
