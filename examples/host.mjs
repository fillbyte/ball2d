import { createRoom } from 'ball2d/node';

const apiKey = process.env.BALL2D_API_KEY;
if (!apiKey) throw Error('Set BALL2D_API_KEY from your Ball2D account.');
const room = await createRoom({
  apiKey,
  roomName: 'Developer room',
  noPlayer: true,
});
room.onPlayerJoin = (player) => room.setPlayerTeam(player.id, 1);
await room.startGame();
console.log(room.roomLink);
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => room.close());
await room.closed;
