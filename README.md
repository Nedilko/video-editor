# Video Editor with subtitles

## Develop mode run instructions
To run the application in development mode, you need to have Node.js installed. Then, you can run the following commands:

```bash
npm install
npm run dev
```

## About the application 
#### *(Tested only in Chrome browser)*
Development is done using **Reactjs**, **Shadcn**, **Tailwindcss**, **Redux Toolkit**, **ffmpeg** (for video transcoding). \
This application includes adding only one single video from your computer and adding subtitles to it. \
General usage of the application is as follows:
- Upload a video
- Upload subtitles

Adding media files can be done by clicking "**Add Media**" button located at the very bottom. \
Some events are followed by popup messages, which are shown at the bottom of the screen. \
Application supports light and dark themes. \
**Export** functionality os not implemented yet! 

### UI consists of following sections:
- Video player
- Playback controls
- Properties bar
- Timeline bar
- Transcript sidebar

Sidebar and video player sections size can be adjusted by dragging the separator between them. \
Position is persisted between page reloads. \
Sidebar can be hidden by clicking button on the top of section, which can be shown by hovering over sidebar or main section.

### Video player
The video player is the main part of the application. It is used to play the video and see the subtitles when they're turned on. \
The video player has the following features:
- Play/pause playback (by clicking on the video player, or via context menu item)
- Toggle showing subtitles (via context menu item)
- Remove all timelines (via context menu item)

### Playback controls
The playback controls are used to control the video playback. They include the following features:
- Play/pause playback
- Go to start
- Go to end
- Auto crop (not implemented yet)
- Start and end timing 

### Properties bar
The properties bar is used to show the properties of the video. It includes the following features:
- Toggling subtitles
- Adding intro video (not implemented yet)
- Adding outro video (not implemented yet)
- Adding logo to the video with positioning dropdown** (not implemented yet)

### Timeline bar
The timeline bar is used to show the current playback position, ability to trim playback (via dragging edges or the whole zone), and navigate through playback (via mouse scroll action). \
Clicking the timeline bar will move the playback position to the clicked position. \
Playback is stopped when timeline clicked. \
The timeline can be removed via context menu item.

### Transcript sidebar
The transcript sidebar is used to show the transcript of the video. \
It includes the following features:
- Searching appropriate subtitle item
- Navigating video to appropriate subtitle item
- Muting video when appropriate substitles item is reached during playback (via context menu item)
- Auto navigating to the next subtitle item when playback reached appropriate timestamp