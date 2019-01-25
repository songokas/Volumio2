//@flow

const { task, Task } = require('folktale/concurrency/task');
const { readFile } = require('fs');

const future = futurize(Task);

const read = future(readFile);
const write = future(writeFile);

class PlaylistItem
{
    url: string;
    title: string;
}

function addToPlaylist(playListName: string,  item: PlaylistItem): Task
{
    return getPlaylist(playListName)
        .map(List<PlaylistItem> list => list.push(item))
        .chain(savePlaylist(playListName));
}

function getPlaylist(playListName: string): Task
{
    return readJsonFile(playListName);
}

function savePlaylist(playListName: string, items: ?List<PlaylistItem> ): Task
{
    return curry(function() {
        return write(playlistName, items.toJSON());
    })(playListName, items);
}