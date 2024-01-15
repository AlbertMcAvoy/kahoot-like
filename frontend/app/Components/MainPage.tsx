'use client';

import {useState} from "react";
import {Socket} from "socket.io-client";

type TProps = {
    socket: Socket;
    state: string;
}

const MainPage = ({ socket, state }: TProps) => {

    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState('');

    const handleJoin = (event: any) => {
        event.preventDefault();
        const action = event.nativeEvent.submitter.name;

        if (username === '') {
            alert('You need a username to play');
            return;
        }

        if (action === 'create') {
            socket.emit('server-kahoot-create', {
                username
            });
        } else { // join action
            if (gameId === '') {
                alert('You have to specify a game Id to join a game')
                return;
            }

            socket.emit('server-kahoot-join', {
                username,
                gameId
            });

            setGameId('');
        }
    }

    const isHidden = () => {
        return state !== 'home' ? 'hidden' : '';
    }

    return (
        <form className={ 'm-20 ' + isHidden()} onSubmit={(event) => handleJoin(event)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="username"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Username </label>
                    <input type="text" id="username"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={username}
                           onChange={e => setUsername(e.currentTarget.value)}
                           placeholder="John" required />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Game Id <span className="text-xs">(optional if you want to join a game)</span> </label>
                    <input type="text" id="last_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={e => setGameId(e.currentTarget.value)}
                           value={gameId}
                           placeholder="dafez-789-4dzadz-48987" />
                </div>
            </div>
            <div className="flex items-center justify-around p-12">
                <button className="border bg-slate-300 border-slate-300 hover:border-slate-500 p-2 rounded text-secondary"
                        name="create"
                        type="submit"> Créer </button>
                <button className="border bg-slate-300 border-slate-300 hover:border-slate-500 p-2 rounded text-secondary"
                        name="join"
                        type="submit"> Rejoindre </button>
            </div>
        </form>
    )
}

export default MainPage;