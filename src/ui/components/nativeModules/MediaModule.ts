/**
* This exposes the native CalendarModule module as a JS module. This has a
* function 'createCalendarEvent' which takes the following parameters:

* 1. String name: A string representing the name of the event
* 2. String location: A string representing the location of the event
*/

import {NativeModules} from 'react-native';
const {MediaModule} = NativeModules;
interface MediaInterface {
  playSound(uri: string): void;
  pauseSound(): void;
  seekTo(position: number): void;
}

export default MediaModule as MediaInterface;
