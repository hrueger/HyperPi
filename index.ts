import { HyperdeckServer } from "hyperdeck-server-connection";
import { SlotStatus, TransportStatus, VideoFormat } from "hyperdeck-server-connection/dist/types";
import * as fs from "fs";

const server = new HyperdeckServer();
let status;
var videoFormat = VideoFormat.PAL;
const clips = []
var speed = 100;
var slotID = 1;
var clipID = 1;
const clipFolder = "clips";
var timecode ="0:27:00:02";
var displayTimecode = "0:27:00:02";
var loop = 'false';
loadClips();

/* server.onDeviceInfo = (cmd) => {
    console.log(cmd);

    return new Promise((resolve) => {
        resolve({
            "protocol version": "1.6",
            "slot count": "20",
            model: "HyperDeck Pro"
        });
    });
} */
server.onPlay = (cmd) => {
    console.log('playing', cmd);
    status = TransportStatus.PLAY;
    return Promise.resolve();
}
server.onStop = (cmd) => {
    console.log('stopped', cmd);
    status = TransportStatus.STOPPED;
    return Promise.resolve();
}
server.onClipsAdd = cmd => {
    console.log('CLIP ADD', cmd)
    return Promise.resolve();
};
server.onClipsClear = cmd => {
    console.log('CLIP CLEAR', cmd)
    return Promise.resolve();
};
server.onStop = (cmd) => {
    

    return new Promise((resolve) => {
        resolve();
    });

}
server.onJog = (cmd) => {
    

    return new Promise((resolve) => {
        resolve();
    });

}
server.onDiskList = (cmd) => {
    let i = 1;
    console.log('DSK LIST',cmd);
    var res = {'slot id': `1`};
    clips.forEach(clip =>{
        res[i] = clip.name +"  QuickTimeUncompressed " + videoFormat +" 24:00:02:00";
        i = i+1;
    })
    
    return Promise.resolve(res);

}
server.onClipsCount = (cmd) => {
    console.log('CLIP COUNT',cmd);
    return Promise.resolve({'clip count': `${clips.length}`});
};

server.onClipsGet = (cmd) => {
    var result = {}
    let i = 1;
    clips.forEach(
      clip => {result[i] = " " + clip.name +" 00:00:00:00 00:24:02:00";
      i = i + 1;
    });
    return Promise.resolve(result as any);
}

    

server.onTransportInfo = cmd => {
    let res = {
        'status': status,
        'speed' : `${speed}`,
        'slot id': `${1}`,
        'display timecode': displayTimecode,
        'timecode': timecode,
        'single clip': "true",
        'clip id' : `${clipID}`,
        'video format': videoFormat,
        'loop' : "false" as any,
    };
    updateTC();
    return Promise.resolve(res)
};
    
server.onRemote = (cmd) => {
    

    return new Promise((resolve) => {
        resolve({
            enabled: true,
            override: true
        });
    }) as any;
}
server.onClipsCount = (cmd) => {
    return new Promise((resolve) => {
        resolve({
            "clip count": `${clips.length}`
        });
    });

}

server.onSlotInfo = cmd => {
    // console.log('INFO', cmd)
    return Promise.resolve({
    'slot id': `${1}`,
    'status': SlotStatus.MOUNTED,
    'volume name': "Playout Bee",
    'recording time': `${0}`,
    'video format': VideoFormat.PAL,
    })
}

server.onSlotSelect = cmd => {
    console.log('Slotselct',cmd);
    return Promise.resolve();};
    

function loadClips(){
    let i = 0;
    fs.readdirSync(clipFolder).forEach(file =>{
        console.log("read file :",file);
        let single = {'name':file};
        clips.push(single);
        i = i +1;
    })
    console.log("result ",clips);
}

function updateTC(){
    // console.log("update tc");
}